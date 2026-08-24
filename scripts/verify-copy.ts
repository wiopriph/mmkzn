/**
 * verify-copy.ts — автоматическая приёмка копии.
 *
 *   pnpm dlx tsx scripts/verify-copy.ts                       # против http://localhost:3000
 *   pnpm dlx tsx scripts/verify-copy.ts https://stage.example  # против стенда
 *
 * Проверяет:
 *   1. каждый путь из url-map.json отвечает 200
 *   2. <title> и meta[description] совпадают с seo-map.json
 *   3. на странице нет ссылок и картинок, ведущих на mirumirkzn.ru
 *   4. h1 присутствует и ровно один
 *
 * Ненулевой exit code = приёмка не пройдена.
 */

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import * as cheerio from 'cheerio'

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const DATA = join(process.cwd(), 'data/extracted')

interface Seo { title: string; description: string }

const norm = (s: string) => s.replace(/\s+/g, ' ').trim()

let failures = 0
const fail = (path: string, msg: string) => { failures++; console.error(`  ✗ ${path}: ${msg}`) }

const paths: string[] = JSON.parse(await readFile(join(DATA, 'url-map.json'), 'utf8'))
const seoMap: Record<string, Seo> = JSON.parse(await readFile(join(DATA, 'seo-map.json'), 'utf8'))

console.log(`Приёмка копии: ${BASE}  (${paths.length} путей)\n`)

for (const path of paths) {
  const url = BASE + path
  let res: Response
  try { res = await fetch(url, { redirect: 'manual' }) }
  catch (e) { fail(path, `запрос упал: ${(e as Error).message}`); continue }

  if (res.status !== 200) { fail(path, `ожидался 200, получен ${res.status}`); continue }

  const $ = cheerio.load(await res.text())
  const expected = seoMap[path]

  if (expected) {
    const title = norm($('title').text())
    if (title !== norm(expected.title)) {
      fail(path, `title\n      ожидалось: ${expected.title}\n      получено:  ${title}`)
    }
    const desc = norm($('meta[name="description"]').attr('content') ?? '')
    if (expected.description && desc !== norm(expected.description)) {
      fail(path, `description\n      ожидалось: ${expected.description}\n      получено:  ${desc}`)
    }
  } else {
    console.warn(`  ? ${path}: нет записи в seo-map.json`)
  }

  const h1 = $('h1').length
  if (h1 !== 1) fail(path, `h1 должен быть ровно один, найдено ${h1}`)

  const external: string[] = []
  $('img[src], a[href], source[srcset]').each((_, el) => {
    const v = $(el).attr('src') ?? $(el).attr('href') ?? $(el).attr('srcset') ?? ''
    if (v.includes('mirumirkzn.ru')) external.push(v)
  })
  if (external.length) fail(path, `ссылки на старый сайт: ${external.slice(0, 3).join(', ')}`)

  if (!failures) console.log(`  ✓ ${path}`)
}

console.log(failures === 0
  ? '\nПриёмка пройдена.'
  : `\nПриёмка НЕ пройдена: ${failures} проблем.`)

process.exit(failures === 0 ? 0 : 1)
