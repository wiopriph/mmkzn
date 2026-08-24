import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  ssr: true,

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  // OG-картинки — Этап 8 (SEO-финиш); рендерер takumi не ставим до тех пор
  ogImage: { enabled: false },

  site: {
    url: 'https://mirumirkzn.ru',
    name: 'МируМир',
    defaultLocale: 'ru',
  },

  nitro: {
    preset: 'node-server',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/robots.txt'],
      failOnError: true,
    },
    compressPublicAssets: { brotli: true, gzip: true },
  },

  routeRules: {
    '/**': { prerender: true },
    '/api/**': { prerender: false, robots: false },
  },
})
