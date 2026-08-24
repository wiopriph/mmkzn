<script setup lang="ts">
const { data: page } = await useAsyncData('page-nasha-produkcziya', () =>
  queryCollection('pages').where('stem', 'LIKE', '%nasha-produkcziya').first())

if (!page.value) throw createError({ statusCode: 404 })

useSeoMeta({
  title: page.value.seo.title,
  description: page.value.seo.description || undefined,
})
</script>

<template>
  <main v-if="page">
    <div class="container-page py-10">
      <h1 class="text-h1">{{ page.title }}</h1>
    </div>
    <MaterialCategories />
    <SectionPriceTable />
  </main>
</template>
