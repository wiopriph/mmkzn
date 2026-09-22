<script setup lang="ts">
// Каталог продукции в стилистике главной: заголовок, сетка карточек
// материалов, прайс, CTA-диалог. SEO-мета — прежняя (Yoast, copy-first).
definePageMeta({ headerTheme: 'solid' })

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
      <h1 v-reveal class="title">{{ page.title }}</h1>
    </div>
    <SectionMaterialGrid />
    <SectionPriceTable />
    <SectionDialog />
  </main>
</template>

<style scoped lang="scss">
.head {
  padding-top: calc(var(--spacing) * 10);

  @include from-md {
    padding-top: calc(var(--spacing) * 15);
  }
}

.title {
  @include text-h3;
  overflow-wrap: anywhere;

  @include from-md {
    @include text-h1;
  }
}
</style>
