# МируМир — mirumirkzn.ru

Сайт компании «МируМир» (нерудные материалы, Казань): Nuxt 4 + @nuxt/content,
статическая генерация. ТЗ и этапы — в [PROMPT.md](PROMPT.md), журнал решений —
в [DECISIONS.md](DECISIONS.md).

## Команды

Нужен Node ≥ 22.12 (см. `.nvmrc`).

```bash
npm install        # зависимости
npm run dev        # дев-сервер на :3000
npm run build      # прод-сборка (.output)
npm run generate   # статика для деплоя (dist)
npm run tokens     # пересобрать SCSS-переменные из data/design/tokens.json
```

## Как устроено

- **Контент** — `content/`: материалы (`materials/*.md`, цены и характеристики
  во frontmatter), статьи блога (`articles/`), услуги, страницы и общие данные
  (`_data/*.yml`: контакты, главная, CTA-диалог).
- **Дизайн-токены** — `data/design/tokens.json` → `npm run tokens` →
  `app/assets/scss/variables.scss` (+ миксины в `_mixins.scss`). В стилях —
  только `var(--…)` и миксины.
- **Страницы** — `app/pages/`; карточки материалов живут на старых URL
  (`/opgs/` и т.д.) через `[slug].vue` и `legacyPath` во frontmatter.
- **SEO** — @nuxtjs/seo; мета страниц-копий сохранена из старого сайта.
  Весь сайт закрыт от индексации (`site.indexable: false` в `nuxt.config.ts`)
  до боевого запуска — снять на Этапе 8!
- **Форма заявки** — `server/api/lead.post.ts`, до Этапа 1 отвечает 501,
  форма показывает телефонный фолбэк.

## Деплой-превью

Render Static Site: `npm ci && npm run generate`, publish `dist`,
`NODE_VERSION=22.23.2`. Прод по ТЗ — Beget (Этап 1).
