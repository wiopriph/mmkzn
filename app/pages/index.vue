<script setup lang="ts">
interface Home {
  seo: { title: string; description: string }
  hero: { title: string; image: { src: string; alt: string } }
  about: { title: string; text: string }
  services: { title: string; intro: string; items: { title: string; text: string; icon: string; link: string }[] }
  advantages: { title: string; items: string[] }
  gallery: { images: { src: string; alt: string }[] }
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
    <SectionHomeHero :title="home.hero.title" :image="home.hero.image" />
    <SectionHomeAbout v-bind="home.about" />
    <SectionHomeServices v-bind="home.services" />
    <MaterialCategories />
    <SectionHomeAdvantages v-bind="home.advantages" />
    <SectionHomeGallery :images="home.gallery.images" />
    <SectionPriceTable />
  </main>
</template>
