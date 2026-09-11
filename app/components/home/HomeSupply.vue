<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  image: { src: string; alt: string }
}>()
</script>

<template>
  <section id="supply" class="relative min-h-[43.75rem] overflow-hidden text-paper">
    <NuxtImg
      :src="image.src" :alt="image.alt" width="2560" height="1398"
      sizes="100vw xl:1440px" loading="lazy"
      class="absolute inset-0 size-full object-cover"
    />
    <!-- контурная карта Татарстана поверх фото, как в макете -->
    <img
      src="/design/map-tatarstan.svg" alt="" aria-hidden="true"
      class="absolute inset-0 size-full object-cover opacity-40"
    >
    <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-strong/60 to-transparent" />

    <div class="container-page relative flex min-h-[43.75rem] flex-col justify-end pb-14 pt-24">
      <h2 class="text-h1 md:text-display">
        {{ title }}
        <span class="mt-3 block text-body">{{ subtitle }}</span>
      </h2>
    </div>
  </section>
</template>
