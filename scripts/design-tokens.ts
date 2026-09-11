/**
 * design-tokens.ts — генерирует app/assets/css/tokens.css из data/design/tokens.json.
 *
 *   pnpm exec tsx scripts/design-tokens.ts
 *
 * data/design/tokens.json — единственный источник правды по дизайн-токенам,
 * снятый с макета Figma «NY 90 / Нерудные материалы МируМир».
 * tokens.css руками не правится (см. PROMPT.md, раздел 4.3).
 * Когда у команды появится Figma Enterprise (Variables API) — этот скрипт
 * заменяется выгрузкой напрямую из Figma, формат tokens.css не меняется.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

interface TextToken {
  size: string
  lineHeight: string
  weight: number
  letterSpacing?: string
  transform?: string
}

interface Tokens {
  spacing: string
  breakpoints: Record<string, string>
  colors: Record<string, string>
  gradients: Record<string, string>
  font: Record<string, string>
  text: Record<string, TextToken>
  radius: Record<string, string>
  container: Record<string, string>
}

const root = process.cwd()
const t: Tokens = JSON.parse(await readFile(join(root, 'data/design/tokens.json'), 'utf8'))

const lines: string[] = []
lines.push('/* app/assets/css/tokens.css — ГЕНЕРИРУЕТСЯ скриптом scripts/design-tokens.ts')
lines.push('   из data/design/tokens.json. НЕ РЕДАКТИРОВАТЬ РУКАМИ. */')
lines.push('@theme {')
lines.push('  --*: initial;                /* дефолтной темы Tailwind не существует */')
lines.push('')
lines.push(`  --spacing: ${t.spacing};`)
lines.push('')
for (const [k, v] of Object.entries(t.breakpoints)) lines.push(`  --breakpoint-${k}: ${v};`)
lines.push('')
for (const [k, v] of Object.entries(t.colors)) lines.push(`  --color-${k}: ${v};`)
lines.push('')
for (const [k, v] of Object.entries(t.font)) lines.push(`  --font-${k}: ${v};`)
lines.push('')
for (const [k, v] of Object.entries(t.text)) {
  lines.push(`  --text-${k}: ${v.size};`)
  lines.push(`  --text-${k}--line-height: ${v.lineHeight};`)
  lines.push(`  --text-${k}--font-weight: ${v.weight};`)
  if (v.letterSpacing) lines.push(`  --text-${k}--letter-spacing: ${v.letterSpacing};`)
}
lines.push('')
for (const [k, v] of Object.entries(t.radius)) lines.push(`  --radius-${k}: ${v};`)
lines.push('}')
lines.push('')
lines.push('/* градиенты и контейнер — обычные переменные, вне шкалы @theme */')
lines.push(':root {')
for (const [k, v] of Object.entries(t.gradients)) lines.push(`  --gradient-${k}: ${v};`)
for (const [k, v] of Object.entries(t.container)) lines.push(`  --container-${k}: ${v};`)
lines.push('}')
lines.push('')

await writeFile(join(root, 'app/assets/css/tokens.css'), lines.join('\n'))
console.log('✓ app/assets/css/tokens.css сгенерирован из data/design/tokens.json')
