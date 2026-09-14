<script setup lang="ts">
// Черновой каркас страницы услуг — полная вёрстка по макету придёт на Этапе 5.
// Тексты услуг — со старого сайта (content/services), не выдуманы.
definePageMeta({ layout: 'redesign', headerTheme: 'solid' })

const { data: services } = await useAsyncData('services-list', () =>
  queryCollection('services').order('order', 'ASC').all())

useSeoMeta({
  title: 'Услуги — МируМир',
  description: 'Транспортная обработка грузов, хранение и складирование, оптовая и розничная торговля нерудными материалами.',
})
</script>

<template>
  <main class="container page">
    <h1 class="title">Услуги</h1>
    <ul v-if="services?.length" class="list">
      <li v-for="s in services" :key="s.path" class="card">
        <h2 class="card-title">{{ s.title }}</h2>
        <p class="summary">{{ s.summary }}</p>
      </li>
    </ul>
    <div class="cta">
      <UiButton variant="gradient" size="lg" href="/#dialog">Обсудить задачу</UiButton>
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  padding-block: calc(var(--spacing) * 10) calc(var(--spacing) * 15);
}

.title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;

  @include from-md {
    @include text-h1;
  }
}

.list {
  display: grid;
  gap: calc(var(--spacing) * 4);

  @include from-md {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 3);
  min-height: calc(var(--spacing) * 50);
  padding: calc(var(--spacing) * 5);
  border: 1px solid var(--color-line);
}

.card-title {
  @include text-card;
}

.summary {
  @include text-body-sm;
  color: var(--color-ink-muted);
}

.cta {
  margin-top: calc(var(--spacing) * 10);
}
</style>
