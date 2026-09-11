<script setup lang="ts">
// Синий баннер «Продукция» + карточки материалов.
// Цены приходят только из карточек материалов (usePrices) — макетные цифры не используются.
const props = defineProps<{
  title: string
  intro: string
  cta: string
  photos: Record<string, string>
}>()

const { data: prices } = usePrices()

// показываем те же 4 карточки, что в макете: материалы с ценой и фото
const cards = computed(() =>
  (prices.value ?? [])
    .map(p => ({
      ...p,
      photo: props.photos[p.legacyPath.replaceAll('/', '')] ?? null,
    }))
    .filter(p => p.cashless !== null && p.photo)
    .slice(0, 4))
</script>

<template>
  <section id="products">
    <div class="bg-section-gradient relative overflow-hidden text-paper">
      <img
        src="/design/pattern-dialog.svg" alt="" aria-hidden="true"
        class="absolute -right-16 top-1/2 h-[150%] -translate-y-1/2 opacity-90"
      >
      <div class="container-page relative py-16 md:py-20">
        <h2 class="text-h2 md:text-display">{{ title }}</h2>
        <p class="mt-6 max-w-md text-body-sm">{{ intro }}</p>
      </div>
    </div>

    <div class="container-page py-14">
      <ul class="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        <li v-for="c in cards" :key="c.legacyPath">
          <NuxtLink :to="c.legacyPath" class="group block">
            <div class="aspect-[3/4.2] overflow-hidden bg-stone">
              <NuxtImg
                v-if="c.photo" :src="c.photo" :alt="c.title" width="640" height="900"
                sizes="50vw lg:320px" loading="lazy"
                class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p class="mt-5 flex items-center justify-between gap-2 text-card uppercase">
              {{ c.shortTitle }}
              <svg width="27" height="21" viewBox="0 0 27 21" fill="none" aria-hidden="true" class="shrink-0 text-ink-muted transition-transform duration-200 group-hover:translate-x-1">
                <path d="M16.5 1.5L25.5 10.5L16.5 19.5M25.5 10.5H0.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </p>
            <p class="mt-2 text-body-sm text-ink-muted">{{ c.cashless }} руб. / {{ c.unit }}.</p>
          </NuxtLink>
        </li>
      </ul>

      <p class="mt-12 text-center">
        <UiButton variant="outline-dark" to="/nasha-produkcziya/">{{ cta }}</UiButton>
      </p>
    </div>
  </section>
</template>
