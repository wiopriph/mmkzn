<script setup lang="ts">
interface ServiceItem { title: string; text: string; icon: string; link: string }
defineProps<{ title: string; intro: string; items: ServiceItem[] }>()
</script>

<template>
  <section id="uslugi" class="bg-stone">
    <div class="container-page py-14">
      <h2 class="text-h2 mb-2 text-center">{{ title }}</h2>
      <p class="mb-10 text-center text-ink-muted">{{ intro }}</p>
      <div class="grid gap-6 md:grid-cols-3">
        <article v-for="item in items" :key="item.title" class="flex flex-col items-center rounded-card bg-paper p-8 text-center">
          <NuxtImg :src="item.icon" alt="" aria-hidden="true" width="64" height="64" loading="lazy" class="mb-4 h-16 w-16" />
          <h3 class="text-h2 mb-3">{{ item.title }}</h3>
          <p class="mb-4 flex-1 text-ink-muted">{{ item.text }}</p>
          <a :href="item.link" class="font-semibold text-brand underline hocus:text-brand-deep">Подробнее</a>
        </article>
      </div>
    </div>
  </section>
</template>
