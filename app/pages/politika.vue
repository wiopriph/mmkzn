<script setup lang="ts">
const { data: page } = await useAsyncData('page-politika', () =>
  queryCollection('pages').where('stem', 'LIKE', '%politika').first())

if (!page.value) throw createError({ statusCode: 404 })

useSeoMeta({
  title: page.value.seo.title,
  description: page.value.seo.description || undefined,
  robots: 'noindex, follow',
})
</script>

<template>
  <main v-if="page" class="container-page py-10">
    <h1 class="text-h1 mb-8">{{ page.title }}</h1>
    <div class="prose max-w-3xl">
      <ContentRenderer :value="page" />
    </div>
  </main>
</template>
