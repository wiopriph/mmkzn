<script setup lang="ts">
// Блок «Наша продукция» — четыре категории, как на старом сайте (копийные страницы).
const { data: materials } = useAsyncData('materials-list', () =>
  queryCollection('materials').order('order', 'ASC').all())

const groups = computed(() => {
  const all = materials.value ?? []
  const by = (test: (t: string) => boolean) => all.filter(m => test(m.title))
  return [
    { title: 'ОПГС', items: by(t => t.startsWith('ОПГС')) },
    { title: 'Песок', items: by(t => t.startsWith('Песок')) },
    { title: 'Гравий', items: by(t => t.startsWith('Гравий')) },
    { title: 'Щебень', items: by(t => t.startsWith('Щебень')) },
  ]
})
</script>

<template>
  <section id="products" class="categories">
    <div class="container inner">
      <h2 class="title">Наша продукция</h2>
      <p class="intro">Нерудные строительные материалы от ООО "МИРУМИР"</p>
      <div class="grid">
        <div v-for="g in groups" :key="g.title" class="card">
          <h3 class="card-title">{{ g.title }}</h3>
          <ul class="list">
            <li v-for="m in g.items" :key="m.legacyPath">
              <NuxtLink :to="m.legacyPath" class="link">{{ m.title }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.categories {
  background: var(--color-stone);
}

.inner {
  padding-block: calc(var(--spacing) * 14);
}

.title {
  margin-bottom: calc(var(--spacing) * 2);
  @include text-h3;
  text-align: center;
}

.intro {
  margin-bottom: calc(var(--spacing) * 10);
  color: var(--color-ink-muted);
  text-align: center;
}

.grid {
  display: grid;
  gap: calc(var(--spacing) * 6);

  @include from-sm {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  padding: calc(var(--spacing) * 6);
  border-radius: var(--radius-card);
  background: var(--color-paper);
}

.card-title {
  margin-bottom: calc(var(--spacing) * 4);
  @include text-h3;
}

.list {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}

.link {
  text-decoration: underline;

  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }
}
</style>
