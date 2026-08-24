<script setup lang="ts">
// Блок «Наша продукция» — четыре категории, как на старом сайте.
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
  <section id="products" class="bg-stone">
    <div class="container-page py-14">
      <h2 class="text-h2 mb-2 text-center">Наша продукция</h2>
      <p class="mb-10 text-center text-ink-muted">Нерудные строительные материалы от ООО "МИРУМИР"</p>
      <div class="grid gap-6 sm:grid-cols-2">
        <div v-for="g in groups" :key="g.title" class="rounded-card bg-paper p-6 shadow-card">
          <h3 class="text-h2 mb-4">{{ g.title }}</h3>
          <ul class="flex flex-col gap-2">
            <li v-for="m in g.items" :key="m.legacyPath">
              <NuxtLink :to="m.legacyPath" class="underline text-ink hocus:text-brand">{{ m.title }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
