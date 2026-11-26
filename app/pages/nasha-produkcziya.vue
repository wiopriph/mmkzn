<script setup lang="ts">
// Каталог по макету Figma "NY 90" (раздел "КАТАЛОГ"). SEO-мета прежняя
// (Yoast, content/pages), тексты секций - content/_data/catalog.yml.
// Блок с draft: true в catalog.yml ("Подобрать под задачу", FAQ) виден только в dev.
definePageMeta({ headerTheme: 'overlay' });

interface Draftable { draft?: boolean }

interface Catalog {
  hero: {
    title: string
    text: string
    cta: { label: string; to: string }
    image: { src: string; alt: string }
    video?: string
    videoMobile?: string
  }
  products: { photos: Record<string, string> }
  selector?: Draftable & {
    title: string
    text: string
    priceNote: string
    labels: { with: string; alt: string; not: string }
    pageLabel: string
    calcLabel: string
    tasks: { name: string; hint: string; material?: string; why?: string; with?: string; alt?: string; not?: string }[]
    fallback: { title: string; text: string; cta: string }
  }
  video: { image: { src: string; alt: string }; video: string; videoMobile?: string }
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
    materials: Record<string, string[]>
  }
  faq?: Draftable & {
    title: string
    text: string
    items: { question: string; answer: string[] }[]
  }
}

// черновик виден только в dev: в прод не попадает ни в разметку, ни в payload
function publishedOnly<Block extends Draftable>(block?: Block) {
  if (!block) {
    return undefined;
  }

  const { draft: isDraft, ...published } = block;

  return isDraft && !import.meta.dev ? undefined : published;
}

const { data: page } = await useAsyncData('page-nasha-produkcziya', () =>
  queryCollection('pages').where('stem', 'LIKE', '%nasha-produkcziya')
    .first());

const { data: catalog } = await useAsyncData('catalog', async () => {
  const doc = await queryCollection('data').where('stem', 'LIKE', '%catalog')
    .first();

  const content = unwrapDataDoc<Catalog>(doc);

  return content && {
    ...content,
    selector: publishedOnly(content.selector),
    faq: publishedOnly(content.faq),
  };
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

const { selector, faq } = catalog.value;

// кнопка hero ведет к подборщику, а если он скрыт - на форму
const hero = selector ?
  { ...catalog.value.hero, cta: { ...catalog.value.hero.cta, to: '#selector' } } :
  catalog.value.hero;

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Главная', item: '/' }, { name: 'Наша продукция' }],
  }),
  ...(faq ?
    [
      defineWebPage({ '@type': ['WebPage', 'FAQPage'] }),
      ...faq.items.map(item => defineQuestion({
        name: item.question.replace(/\s+/g, ' '),
        acceptedAnswer: item.answer.join(' '),
      })),
    ] :
    []),
]);
</script>

<template>
  <main v-if="page && catalog">
    <SectionPageHero v-bind="hero" />

    <SectionMaterialGrid :photos="catalog.products.photos" />

    <CatalogSelector
      v-if="selector"
      v-bind="selector"
    />

    <SectionVideoBand
      :image="catalog.video.image"
      :video="catalog.video.video"
      :videoMobile="catalog.video.videoMobile"
      class="video-band"
    />

    <CatalogSteps v-bind="catalog.steps" />

    <CatalogPassport v-bind="catalog.passport" />

    <SectionFaq
      v-if="faq"
      v-bind="faq"
    />

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
