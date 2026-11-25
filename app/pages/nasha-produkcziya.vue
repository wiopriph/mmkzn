<script setup lang="ts">
// Каталог по макету Figma "NY 90" (раздел "КАТАЛОГ"). SEO-мета прежняя
// (Yoast, content/pages), тексты секций - content/_data/catalog.yml.
// Блоки макета "Подобрать под задачу" и FAQ ждут контента от клиента.
definePageMeta({ headerTheme: 'overlay' });

interface Catalog {
  hero: { title: string; text: string; cta: { label: string; to: string }; image?: string }
  products: { photos: Record<string, string> }
  video: { image: { src: string; alt: string }; video: string }
  steps: {
    title: string
    note: string
    cta: { label: string; href: string }
    items: { title: string; caption: string }[]
  }
  passport: {
    title: string
    text: string
    heading: string
    normLabel: string
    moreLabel: string
    materials: string[]
    params: string[]
  }
}

const { data: page } = await useAsyncData('page-nasha-produkcziya', () =>
  queryCollection('pages').where('stem', 'LIKE', '%nasha-produkcziya')
    .first());

const { data: catalog } = await useAsyncData('catalog', async () => {
  const doc = await queryCollection('data').where('stem', 'LIKE', '%catalog')
    .first();

  return unwrapDataDoc<Catalog>(doc);
});

if (!page.value || !catalog.value) {
  throw createError({ statusCode: 404 });
}

useSeoMeta({
  title: page.value.seo.title,
  description: page.value.seo.description || undefined,
});

useOgMeta({
  title: page.value.seo.title,
  description: page.value.seo.description || undefined,
});

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Главная', item: '/' }, { name: 'Наша продукция' }],
  }),
]);
</script>

<template>
  <main v-if="page && catalog">
    <SectionPageHero v-bind="catalog.hero" />

    <SectionMaterialGrid :photos="catalog.products.photos" />

    <SectionVideoBand
      :image="catalog.video.image"
      :video="catalog.video.video"
      class="video-band"
    />

    <CatalogSteps v-bind="catalog.steps" />

    <CatalogPassport v-bind="catalog.passport" />

    <SectionDialog />
  </main>
</template>

<style scoped lang="scss">
// моб. фрейм видеоблока 12783:5247 - 800px, десктопный 12746:4607 - 700px
.video-band {
  @include below-md {
    --band-min-height: 50rem;
  }
}
</style>
