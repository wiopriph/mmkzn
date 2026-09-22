<script setup lang="ts">
// Карточка материала в стилистике главной. Живёт под старыми адресами
// первого уровня (/opgs/, /pesok-rechnoj/ и т.д.) — ЧПУ и 301 на Этапе 4.
// SEO-мета — прежняя (Yoast, copy-first), h1 = title.
definePageMeta({ headerTheme: 'solid' })

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
        <div>
          <h1 v-reveal class="title">{{ material.title }}</h1>
          <p v-if="material.price.cashless" v-reveal="{ delay: 100 }" class="price">
            {{ material.price.cashless }} руб. / {{ material.price.unit }}. {{ material.price.vatNote }}
          </p>
          <div v-reveal="{ delay: 150 }" class="content body">
            <ContentRenderer :value="material" />
          </div>
        </div>
        <NuxtImg
          v-if="material.images[0]" v-reveal="{ delay: 200 }" format="webp"
          :src="material.images[0].src" :alt="material.images[0].alt"
          :width="material.images[0].width" :height="material.images[0].height"
          sizes="100vw lg:400px" class="photo"
        />
      </div>

      <section v-if="material.specs.length" v-reveal class="specs">
        <h2 class="specs-title">Характеристики</h2>
        <MaterialSpecTable :specs="material.specs" :gost-ref="material.gostRef" />
      </section>
    </div>

    <SectionMaterialGrid title="Другая продукция" :exclude="material.legacyPath" />
    <SectionDialog />
  </main>
</template>

<style scoped lang="scss">
.inner {
  padding-block: calc(var(--spacing) * 10) 0;

  @include from-md {
    padding-top: calc(var(--spacing) * 15);
  }
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
  @include text-h3;
  overflow-wrap: anywhere;

  @include from-md {
    @include text-h1;
  }
}

.price {
  margin-top: calc(var(--spacing) * 4);
  @include text-card;
}

.content {
  margin-top: calc(var(--spacing) * 6);
}

.photo {
  width: 100%;
  height: auto;
}

.specs {
  margin-top: calc(var(--spacing) * 12);
}

.specs-title {
  margin-bottom: calc(var(--spacing) * 6);
  @include text-h3;
}
</style>
