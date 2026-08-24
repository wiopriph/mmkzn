/**
 * extract-wp.ts — выгрузка mirumirkzn.ru (WordPress) в структурированный контент.
 *
 *   pnpm add -D tsx cheerio yaml turndown @types/turndown
 *   pnpm dlx tsx scripts/extract-wp.ts --all
 *   pnpm dlx tsx scripts/extract-wp.ts --shots     # + скриншоты старого сайта (нужен playwright)
 *
 * Кладёт на диск:
 *   content/materials/<slug>.md        карточки материалов: frontmatter + specs[] + текст
 *   content/pages/<slug>.md            остальные страницы
 *   data/extracted/pages.raw.json      сырой REST-ответ, источник правды, не редактировать
 *   data/extracted/seo-map.json        path -> title/description/canonical  (эталон приёмки)
 *   data/extracted/url-map.json        все пути старого сайта
 *   data/extracted/html/<slug>.html    отрендеренный HTML — РЕФЕРЕНС вёрстки, не для v-html
 *   data/extracted/shots/<slug>.png    скриншоты старого сайта (--shots)
 *   public/legacy/media/...            все картинки
 *
 * Скрипт ничего не изобретает. Что не распарсилось — лежит рядом в сыром виде.
 * Цифры лаборатории не округляются и не «нормализуются».
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { URL } from 'node:url'
import * as cheerio from 'cheerio'
import YAML from 'yaml'
import TurndownService from 'turndown'

const SITE = 'https://mirumirkzn.ru'
const ROOT = process.cwd()
const UA = 'mirumir-migration/1.0'

const OUT = {
  data: join(ROOT, 'data/extracted'),
  html: join(ROOT, 'data/extracted/html'),
  shots: join(ROOT, 'data/extracted/shots'),
  materials: join(ROOT, 'content/materials'),
  pages: join(ROOT, 'content/pages'),
  media: join(ROOT, 'public/legacy/media'),
}

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' })
td.remove(['script', 'style', 'noscript'])
td.addRule('dropTables', { filter: ['table'], replacement: () => '' }) // таблицы уходят в specs[]

// ------------------------------------------------------------------ utils

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function getJSON<T>(url: string): Promise<T> {
  const r = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`)
  return r.json() as Promise<T>
}

async function getText(url: string): Promise<string> {
  const r = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`)
  return r.text()
}

async function download(url: string, dest: string): Promise<boolean> {
  if (existsSync(dest)) return true
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA } })
    if (!r.ok) return false
    await mkdir(dirname(dest), { recursive: true })
    await writeFile(dest, Buffer.from(await r.arrayBuffer()))
    return true
  } catch { return false }
}

const toPath = (link: string) => {
  const p = new URL(link).pathname
  return p.endsWith('/') ? p : p + '/'
}
const slugOf = (p: string) => {
  const s = p.replace(/^\/|\/$/g, '')
  return s === '' ? 'index' : s.replace(/\//g, '--')
}

// ------------------------------------------------------------------ types

interface WpPage {
  id: number; slug: string; link: string; modified: string
  title: { rendered: string }
  content: { rendered: string }
  yoast_head_json?: {
    title?: string; description?: string; canonical?: string
    robots?: Record<string, string>
  }
}
interface WpMedia {
  source_url: string; alt_text: string
  media_details?: { width?: number; height?: number }
}

async function fetchAll<T>(endpoint: string): Promise<T[]> {
  const out: T[] = []
  for (let page = 1; page <= 20; page++) {
    const url = `${SITE}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`
    let batch: T[]
    try { batch = await getJSON<T[]>(url) } catch { break }
    if (!Array.isArray(batch) || !batch.length) break
    out.push(...batch)
    if (batch.length < 100) break
    await sleep(300)
  }
  return out
}

// ------------------------------------------------------ таблицы характеристик

interface SpecRow { param: string; gost?: string; actual?: string }

function parseSpecs(html: string): { specs: SpecRow[]; rawTables: string[] } {
  const $ = cheerio.load(html)
  const specs: SpecRow[] = []
  const rawTables: string[] = []

  $('table').each((_, t) => {
    const $t = $(t)
    rawTables.push($.html($t))
    $t.find('tr').each((__, tr) => {
      const c = $(tr).find('td, th')
        .map((___, td) => $(td).text().replace(/\s+/g, ' ').trim()).get().filter(Boolean)
      if (c.length < 2) return
      // шапку таблицы пропускаем
      if (/^(наименование|показател|параметр)/i.test(c[0]) && /гост|норм/i.test(c[1] ?? '')) return
      specs.push({
        param: c[0],
        gost: c.length >= 3 ? c[1] : undefined,
        actual: c.length >= 3 ? c[2] : c[1],
      })
    })
  })

  return { specs, rawTables }
}

// ------------------------------------------------------------ медиа в тексте

async function collectImages(html: string) {
  const $ = cheerio.load(html)
  const images: { src: string; alt: string }[] = []
  for (const el of $('img').toArray()) {
    const src = $(el).attr('src') ?? ''
    if (!src || src.startsWith('data:')) continue
    let abs: URL
    try { abs = new URL(src, SITE) } catch { continue }
    if (abs.hostname !== new URL(SITE).hostname) continue
    const name = basename(abs.pathname)
    if (await download(abs.href, join(OUT.media, name))) {
      images.push({ src: `/legacy/media/${name}`, alt: $(el).attr('alt') ?? '' })
    }
  }
  return images
}

function htmlToMarkdown(html: string): string {
  const $ = cheerio.load(html, null, false)
  $('img').remove()          // картинки живут во frontmatter
  $('script, style').remove()
  return td.turndown($.html()).replace(/\n{3,}/g, '\n\n').trim()
}

// --------------------------------------------------------------- REST pass

async function runApi() {
  console.log('\n=== REST ===')
  const all = [...await fetchAll<WpPage>('pages'), ...await fetchAll<WpPage>('posts')]
  console.log(`страниц и записей: ${all.length}`)
  await writeFile(join(OUT.data, 'pages.raw.json'), JSON.stringify(all, null, 2))

  const seoMap: Record<string, unknown> = {}
  const urlMap: string[] = []
  let order = 0

  for (const p of all) {
    const path = toPath(p.link)
    const slug = slugOf(path)
    urlMap.push(path)

    const y = p.yoast_head_json ?? {}
    const seo = {
      title: y.title ?? p.title.rendered,
      description: y.description ?? '',
    }
    seoMap[path] = { ...seo, canonical: y.canonical ?? p.link, slug: p.slug, modified: p.modified }

    const { specs, rawTables } = parseSpecs(p.content.rendered)
    const images = await collectImages(p.content.rendered)
    const body = htmlToMarkdown(p.content.rendered)
    const isMaterial = specs.length >= 3

    const fm: Record<string, unknown> = {
      title: p.title.rendered,
      legacyPath: path,
      seo,
      images,
      sourceHtml: `data/extracted/html/${slug}.html`,
      wpModified: p.modified,
    }

    if (isMaterial) {
      Object.assign(fm, {
        shortTitle: p.title.rendered,
        order: ++order,
        price: { cashless: null, cash: null, unit: 'м3', vatNote: 'с НДС 22%' },
        specs,
        applications: [],
      })
      if (rawTables.length) {
        await writeFile(
          join(OUT.data, `specs-raw-${slug}.html`),
          rawTables.join('\n\n<!-- ---- -->\n\n'),
        )
      }
    }

    const dir = isMaterial ? OUT.materials : OUT.pages
    const file = join(dir, `${isMaterial ? p.slug : slug}.md`)
    await writeFile(file, `---\n${YAML.stringify(fm).trim()}\n---\n\n${body}\n`)

    console.log(`  ✓ ${path.padEnd(52)} ${isMaterial ? 'материал' : 'страница'}  ` +
                `${specs.length} строк ГОСТ, ${images.length} фото`)
    await sleep(200)
  }

  // медиатека целиком — часть фото лежит в галерее, вне контента
  const media = await fetchAll<WpMedia>('media')
  const index: Record<string, unknown> = {}
  for (const m of media) {
    const name = basename(new URL(m.source_url).pathname)
    if (await download(m.source_url, join(OUT.media, name))) {
      index[`/legacy/media/${name}`] = {
        alt: m.alt_text ?? '',
        width: m.media_details?.width,
        height: m.media_details?.height,
      }
    }
  }
  await writeFile(join(OUT.data, 'media-index.json'), JSON.stringify(index, null, 2))
  await writeFile(join(OUT.data, 'seo-map.json'), JSON.stringify(seoMap, null, 2))
  await writeFile(join(OUT.data, 'url-map.json'), JSON.stringify(urlMap.sort(), null, 2))

  console.log(`\nмедиафайлов: ${Object.keys(index).length}, путей: ${urlMap.length}`)
}

// --------------------------------------------------------------- HTML pass

/** Отрендеренный HTML — РЕФЕРЕНС для восстановления вёрстки, не для рендера. */
async function runHtml() {
  console.log('\n=== HTML-референсы ===')
  const paths: string[] = JSON.parse(await readFile(join(OUT.data, 'url-map.json'), 'utf8'))
  if (!paths.includes('/')) paths.unshift('/')

  for (const path of paths) {
    try {
      const raw = await getText(SITE + path)
      const $ = cheerio.load(raw)
      $('script, noscript, link[rel="stylesheet"], style').remove()
      await writeFile(join(OUT.html, `${slugOf(path)}.html`), $.html())
      console.log(`  ✓ ${path}`)
    } catch (e) {
      console.warn(`  ! ${path}: ${(e as Error).message}`)
    }
    await sleep(400)
  }
}

// ------------------------------------------------------------- screenshots

async function runShots() {
  console.log('\n=== скриншоты старого сайта ===')
  let chromium: typeof import('playwright')['chromium']
  try { ({ chromium } = await import('playwright')) }
  catch { console.warn('  playwright не установлен: pnpm add -D playwright && pnpm exec playwright install chromium'); return }

  const paths: string[] = JSON.parse(await readFile(join(OUT.data, 'url-map.json'), 'utf8'))
  if (!paths.includes('/')) paths.unshift('/')

  const browser = await chromium.launch()
  for (const vp of [{ w: 1440, h: 900, tag: 'desktop' }, { w: 390, h: 844, tag: 'mobile' }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } })
    const page = await ctx.newPage()
    for (const path of paths) {
      try {
        await page.goto(SITE + path, { waitUntil: 'networkidle', timeout: 30000 })
        await page.screenshot({ path: join(OUT.shots, `${slugOf(path)}.${vp.tag}.png`), fullPage: true })
        console.log(`  ✓ ${vp.tag} ${path}`)
      } catch (e) { console.warn(`  ! ${path}: ${(e as Error).message}`) }
    }
    await ctx.close()
  }
  await browser.close()
}

// -------------------------------------------------------------------- main

async function main() {
  const a = process.argv.slice(2)
  const all = a.includes('--all') || a.length === 0
  for (const d of Object.values(OUT)) await mkdir(d, { recursive: true })

  if (all || a.includes('--api')) await runApi()
  if (all || a.includes('--html')) await runHtml()
  if (a.includes('--shots')) await runShots()

  console.log(`
Готово. Что проверить своими глазами, прежде чем верстать:
  1. data/extracted/url-map.json — ожидается ровно 10 путей.
  2. content/materials/*.md — 8 файлов, в каждом specs[] сверить построчно
     с живой страницей. Парсер работает по эвристике и может ошибиться;
     сырые таблицы лежат в data/extracted/specs-raw-*.html.
  3. Цены во frontmatter стоят null — заполнить руками с главной страницы.
  4. data/extracted/seo-map.json — эталон приёмки, не редактировать.
`)
}

main().catch(e => { console.error(e); process.exit(1) })
