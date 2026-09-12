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
    // ВЕСЬ САЙТ ЗАКРЫТ ОТ ИНДЕКСАЦИИ (robots.txt Disallow: / + meta robots noindex).
    // Снять перед боевым запуском на Этапе 8 — иначе потеряем позиции!
    indexable: false,
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
    '/**': { prerender: true },
    '/api/**': { prerender: false, robots: false },
    '/_kitchen-sink': { robots: false, sitemap: false },
  },
})
