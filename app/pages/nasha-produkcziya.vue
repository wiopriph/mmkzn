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
    <div class="container head">
      <h1 class="title">{{ page.title }}</h1>
    </div>
    <MaterialCategories />
    <SectionPriceTable />
  </main>
</template>

<style scoped lang="scss">
.head {
  padding-block: calc(var(--spacing) * 10);
}

.title {
  @include text-h3;
  overflow-wrap: anywhere;

  @include from-md {
    @include text-h1;
  }
}
</style>
