<script setup lang="ts">
// Главная в редизайне (Этап 3, макет Figma «NY 90»).
// SEO-мета остаётся прежней (copy-first) до отдельного решения.
definePageMeta({ layout: 'redesign', headerTheme: 'overlay' })

interface Home {
  seo: { title: string; description: string }
  hero: { title: string; subtitle: string; cta: string; image: { src: string; alt: string } }
  infra: { title: string; note: string; stats: { label: string; value: string }[] }
  products: { title: string; intro: string; cta: string; photos: Record<string, string> }
  trust: { title: string; text: string; image: { src: string; alt: string }; facts: { value: string; label: string; highlight?: boolean }[] }
  supply: { title: string; subtitle: string; image: { src: string; alt: string } }
  news: { title: string; intro: string; cta: string }
  dialog: { title: string; text: string; nameLabel: string; phoneLabel: string; submit: string; consent: string }
}

const { data: home } = await useAsyncData('home', async () => {
  const doc = await queryCollection('data').where('stem', 'LIKE', '%home').first()
  return unwrapDataDoc<Home>(doc)
})

if (!home.value) throw createError({ statusCode: 500, statusMessage: 'home.yml not found' })

useSeoMeta({
  title: home.value.seo.title,
  description: home.value.seo.description,
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
    <HomeDialog v-bind="home.dialog" />
  </main>
</template>
