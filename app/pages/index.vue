<script setup lang="ts">
// Главная в редизайне (Этап 3, макет Figma «NY 90»).
// SEO-мета остаётся прежней (copy-first) до отдельного решения.
definePageMeta({ headerTheme: 'overlay' })

interface Home {
  seo: { title: string; description: string; ogImage?: string }
  hero: { title: string; subtitle: string; cta: string; image: { src: string; alt: string } }
  infra: { title: string; note: string; stats: { label: string; value: string }[] }
  products: { title: string; introBefore: string; introLink: string; introLinkTo: string; introAfter: string; cta: string; photos: Record<string, string> }
  trust: { title: string; textBefore: string; textLink: string; textLinkTo: string; textAfter: string; facts: { value: string; label: string }[] }
  supply: { title: string; subtitle: string; image: { src: string; alt: string } }
  news: { title: string; intro: string; cta: string }
}

const { data: home } = await useAsyncData('home', async () => {
  const doc = await queryCollection('data').where('stem', 'LIKE', '%home').first()
  return unwrapDataDoc<Home>(doc)
})

if (!home.value) throw createError({ statusCode: 500, statusMessage: 'home.yml not found' })

const site = useSiteConfig()

useSeoMeta({
  title: home.value.seo.title,
  description: home.value.seo.description,
  ogTitle: home.value.seo.title,
  ogDescription: home.value.seo.description,
  ogType: 'website',
  // соцсетям нужен абсолютный URL картинки
  ogImage: home.value.seo.ogImage ? site.url + home.value.seo.ogImage : undefined,
  ogLocale: 'ru_RU',
  ogSiteName: site.name,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <main v-if="home">
    <HomeHero v-bind="home.hero" />
    <HomeInfra v-bind="home.infra" />
    <HomeProducts v-bind="home.products" />
    <HomeTrust v-bind="home.trust" />
    <HomeSupply v-bind="home.supply" />
    <HomeNews :intro="home.news.intro" :cta="home.news.cta" />
    <SectionDialog />
  </main>
</template>
