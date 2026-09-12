/**
 * design-tokens.ts — генерирует стилевые артефакты из data/design/tokens.json:
 *
 *   app/assets/scss/variables.scss — CSS custom properties (:root)
 *   app/assets/scss/_mixins.scss   — SCSS-миксины брейкпоинтов и текстовых стилей
 *
 *   npm run tokens
 *
 * data/design/tokens.json — единственный источник правды по дизайн-токенам,
 * снятый с макета Figma «NY 90 / Нерудные материалы МируМир».
 * Сгенерированные файлы руками не правятся (см. PROMPT.md, раздел 4.3).
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

const HEADER = (what: string) =>
  `// ${what} — ГЕНЕРИРУЕТСЯ скриптом scripts/design-tokens.ts\n// из data/design/tokens.json. НЕ РЕДАКТИРОВАТЬ РУКАМИ.\n`

// ------------------------------------------------------------ variables.scss

const v: string[] = [HEADER('variables.scss')]
v.push(':root {')
for (const [k, val] of Object.entries(t.colors)) v.push(`  --color-${k}: ${val};`)
v.push('')
for (const [k, val] of Object.entries(t.gradients)) v.push(`  --gradient-${k}: ${val};`)
v.push('')
for (const [k, val] of Object.entries(t.font)) v.push(`  --font-${k}: ${val};`)
v.push('')
for (const [k, val] of Object.entries(t.text)) {
  v.push(`  --text-${k}: ${val.size};`)
  v.push(`  --text-${k}--line-height: ${val.lineHeight};`)
  v.push(`  --text-${k}--font-weight: ${val.weight};`)
  if (val.letterSpacing) v.push(`  --text-${k}--letter-spacing: ${val.letterSpacing};`)
}
v.push('')
for (const [k, val] of Object.entries(t.radius)) v.push(`  --radius-${k}: ${val};`)
for (const [k, val] of Object.entries(t.container)) v.push(`  --container-${k}: ${val};`)
v.push(`  --spacing: ${t.spacing};`)
v.push('}')
v.push('')

await writeFile(join(root, 'app/assets/scss/variables.scss'), v.join('\n'))

// -------------------------------------------------------------- _mixins.scss

const m: string[] = [HEADER('_mixins.scss')]
m.push('// Брейкпоинты (мобайл-ферст): @include from-md { ... } — от 48rem и шире.')
m.push('// Зеркальные ограничители: @include below-md { ... } — уже 48rem.')
for (const [k, val] of Object.entries(t.breakpoints)) {
  m.push('')
  m.push(`@mixin from-${k} {`)
  m.push(`  @media (min-width: ${val}) { @content; }`)
  m.push('}')
  m.push(`@mixin below-${k} {`)
  m.push(`  @media (max-width: calc(${val} - 1px)) { @content; }`)
  m.push('}')
}
m.push('')
m.push('// Текстовые стили макета: @include text-h1; и т.д.')
for (const [k, val] of Object.entries(t.text)) {
  m.push('')
  m.push(`@mixin text-${k} {`)
  m.push(`  font-size: var(--text-${k});`)
  m.push(`  line-height: var(--text-${k}--line-height);`)
  m.push(`  font-weight: var(--text-${k}--font-weight);`)
  if (val.letterSpacing) m.push(`  letter-spacing: var(--text-${k}--letter-spacing);`)
  if (val.transform) m.push(`  text-transform: ${val.transform};`)
  m.push('}')
}
m.push('')

await writeFile(join(root, 'app/assets/scss/_mixins.scss'), m.join('\n'))

console.log('✓ app/assets/scss/variables.scss и _mixins.scss сгенерированы из data/design/tokens.json')
