<script setup lang="ts">
interface Fact { value: string; label: string; highlight?: boolean }
defineProps<{
  title: string
  text: string
  image: { src: string; alt: string }
  facts: Fact[]
}>()
</script>

<template>
  <section class="bg-section-gradient relative overflow-hidden text-paper">
    <NuxtImg
      :src="image.src" :alt="image.alt" width="2048" height="1143"
      sizes="100vw xl:1440px" loading="lazy"
      class="absolute inset-0 size-full object-cover opacity-15 mix-blend-luminosity"
    />
    <div class="container-page relative py-20 md:py-28">
      <div class="grid gap-10 md:grid-cols-2">
        <img
          src="/design/logo-sign-white.svg" alt="" aria-hidden="true"
          width="240" height="190" class="h-32 w-auto md:h-48"
        >
        <div>
          <h2 class="text-h3 md:text-h2">{{ title }}</h2>
          <p class="mt-6 max-w-lg text-body-sm">{{ text }}</p>
        </div>
      </div>

      <ul class="mt-16 grid gap-4 md:ml-auto md:max-w-3xl md:grid-cols-3">
        <li
          v-for="f in facts" :key="f.label"
          class="flex min-h-72 flex-col justify-end gap-3 border p-6"
          :class="f.highlight ? 'border-accent bg-accent' : 'border-paper/70'"
        >
          <template v-if="f.value">
            <p class="text-display">{{ f.value }}</p>
          </template>
          <template v-else>
            <svg width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true" class="mb-auto">
              <circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="2.5" />
              <path d="M22 32.5L29 39.5L42 26" stroke="currentColor" stroke-width="2.5" />
            </svg>
          </template>
          <p class="text-body-sm">{{ f.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
