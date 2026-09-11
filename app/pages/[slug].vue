<script setup lang="ts">
import { dimsOf } from '~/utils/mediaDims'
// Карточки материалов живут под старыми адресами первого уровня
// (/opgs/, /pesok-rechnoj/ и т.д.) — ЧПУ и 301 появятся на Этапе 4.
const route = useRoute()
const slug = String(route.params.slug)

const { data: material } = await useAsyncData(`material-${slug}`, () =>
  queryCollection('materials').where('legacyPath', '=', `/${slug}/`).first())

if (!material.value) throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })

useSeoMeta({
  title: material.value.seo.title,
  description: material.value.seo.description || undefined,
})
</script>

<template>
  <main v-if="material">
    <div class="container inner">
      <div class="top">
        <div class="text">
          <h1 class="title">{{ material.title }}</h1>
          <div class="content">
            <ContentRenderer :value="material" />
          </div>
        </div>
        <NuxtImg format="webp"
          v-if="material.images[0]"
          :src="material.images[0].src" :alt="material.images[0].alt"
          v-bind="dimsOf(material.images[0].src)"
          sizes="100vw lg:400px" class="photo"
        />
      </div>

      <section v-if="material.specs.length" class="specs">
        <h2 class="specs-title">Характеристики</h2>
        <MaterialSpecTable :specs="material.specs" :gost-ref="material.gostRef" />
      </section>
      <!-- applications[] заполнены в контенте, но отдельной секции на старом
           сайте нет — блок появится вместе с редизайном карточки (Этап 4) -->
    </div>

    <MaterialCategories />
    <SectionPriceTable />
  </main>
</template>

<style scoped lang="scss">
.inner {
  padding-block: calc(var(--spacing) * 10);
}

.top {
  display: grid;
  gap: calc(var(--spacing) * 10);
  align-items: start;

  @include from-lg {
    grid-template-columns: 2fr 1fr;
  }
}

.title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;
  overflow-wrap: anywhere;

  @include from-md {
    @include text-h1;
  }
}

.photo {
  width: 100%;
  border-radius: var(--radius-card);
}

.specs {
  margin-top: calc(var(--spacing) * 12);
}

.specs-title {
  margin-bottom: calc(var(--spacing) * 6);
  @include text-h3;
}
</style>
