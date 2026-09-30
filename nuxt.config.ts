import { redirects } from './server/utils/redirects'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/seo',
  ],

  // серверные секреты формы заявки; значения приходят из env:
  // NUXT_TELEGRAM_BOT_TOKEN, NUXT_TELEGRAM_CHAT_ID, NUXT_IP_SALT
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    ipSalt: '',
  },

  css: ['~/assets/scss/index.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // миксины брейкпоинтов и текстовых стилей доступны в каждом <style lang="scss">
          additionalData: '@use "~/assets/scss/mixins" as *;',
        },
      },
    },
  },

  // OG-картинки — Этап 8 (SEO-финиш); рендерер takumi не ставим до тех пор
  ogImage: { enabled: false },

  // Clean-param — директива Яндекса: utm-метки не плодят дубли в индексе
  // и не жгут краулинговый бюджет. Действует после снятия indexable: false.
  robots: {
    groups: [
      { userAgent: '*', allow: '/' },
      {
        userAgent: 'Yandex',
        allow: '/',
        cleanParam: ['utm_source&utm_medium&utm_campaign&utm_content&utm_term'],
      },
    ],
  },

  image: {
    quality: 72,
    format: ['webp'],
  },

  site: {
    url: 'https://mirumirkzn.ru',
    name: 'МируМир',
    defaultLocale: 'ru',
    // старые URL живут со слешем на конце — вариант зафиксирован до Этапа 4
    trailingSlash: true,
    // индексация ОТКРЫТА (решение владельца 2026-10: домен переключается
    // на прод, трафик идёт сразу; robots/sitemap боевые)
    indexable: true,
  },

  nitro: {
    preset: 'node-server',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt', '/_kitchen-sink'],
      failOnError: true,
    },
    compressPublicAssets: { brotli: true, gzip: true },
  },

  routeRules: {
    // карта 301 из server/utils/redirects.ts — единственного источника
    ...Object.fromEntries(Object.entries(redirects).map(([from, to]) =>
      [from, { redirect: { to, statusCode: 301 as const } }])),
    '/**': { prerender: true },
    '/api/**': { prerender: false, robots: false },
    '/_kitchen-sink': { robots: false, sitemap: false },
    // noindex-страница (паритет с Yoast) — в карте ей не место
    '/politika/': { sitemap: false },
  },
})
