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
    <div class="container-page py-10">
      <div class="grid items-start gap-10 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <h1 class="text-h1 mb-8">{{ material.title }}</h1>
          <div class="prose max-w-none">
            <ContentRenderer :value="material" />
          </div>
        </div>
        <NuxtImg
          v-if="material.images[0]"
          :src="material.images[0].src" :alt="material.images[0].alt"
          v-bind="dimsOf(material.images[0].src)"
          sizes="100vw lg:400px" class="w-full rounded-card"
        />
      </div>

      <section v-if="material.specs.length" class="mt-12">
        <h2 class="text-h2 mb-6">Характеристики</h2>
        <MaterialSpecTable :specs="material.specs" :gost-ref="material.gostRef" />
      </section>

      <!-- applications[] заполнены в контенте, но отдельной секции на старом
           сайте нет — блок появится вместе с редизайном карточки (Этап 4) -->
    </div>

    <MaterialCategories />
    <SectionPriceTable />
  </main>
</template>
