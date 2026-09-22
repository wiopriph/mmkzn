<script setup lang="ts">
// Политика обработки ПД: текстовая страница на новом лейауте, noindex.
definePageMeta({ headerTheme: 'solid' })

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
  <main v-if="page" class="container page">
    <h1 class="title">{{ page.title }}</h1>
    <div class="content body">
      <ContentRenderer :value="page" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  padding-block: calc(var(--spacing) * 10);
}

.title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;
  overflow-wrap: anywhere;

  @include from-md {
    @include text-h1;
  }
}

.body {
  max-width: 48rem;
}
</style>
