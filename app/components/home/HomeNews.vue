<script setup lang="ts">
// Слайдер событий. Данные — коллекция articles; пока она пуста,
// секция не рендерится вовсе (пустая лента хуже её отсутствия — PROMPT.md 8.4).
defineProps<{
  intro: string
  cta: string
}>()

const { data: articles } = useAsyncData('home-news', () =>
  queryCollection('articles')
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .limit(6)
    .all())

const scroller = ref<HTMLElement>()

function scrollBy(dir: 1 | -1) {
  scroller.value?.scrollBy({ left: dir * 420, behavior: 'smooth' })
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })
}
</script>

<template>
  <section v-if="articles?.length" id="news" class="py-20 md:py-28">
    <div class="container-page flex items-end justify-between gap-8">
      <p class="max-w-xl text-body md:text-lead">{{ intro }}</p>
      <div class="hidden gap-4 md:flex">
        <UiArrowButton label="Назад" direction="left" @click="scrollBy(-1)" />
        <UiArrowButton label="Вперёд" @click="scrollBy(1)" />
      </div>
    </div>

    <div
      ref="scroller"
      class="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:px-10"
    >
      <NuxtLink
        v-for="a in articles" :key="a.path" :to="a.path"
        class="group relative aspect-[390/580] w-72 shrink-0 snap-start overflow-hidden bg-stone md:w-96"
      >
        <NuxtImg
          v-if="a.cover" :src="a.cover.src" :alt="a.cover.alt" width="780" height="1160"
          sizes="288px md:384px" loading="lazy"
          class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-strong/70 to-transparent" />
        <span class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-paper">
          <span class="text-card uppercase leading-tight">{{ a.title }}</span>
          <span class="text-caption">{{ formatDate(a.publishedAt) }}</span>
        </span>
      </NuxtLink>
    </div>

    <p class="container-page mt-10 text-center">
      <UiButton variant="outline-dark" to="/blog/">{{ cta }}</UiButton>
    </p>
  </section>
</template>
