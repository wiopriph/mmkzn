<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  cta: string
  image: { src: string; alt: string }
}>()
</script>

<template>
  <section class="relative min-h-[43.75rem] overflow-hidden text-paper">
    <NuxtImg
      :src="image.src" :alt="image.alt" width="2560" height="1398"
      sizes="100vw xl:1440px" fetchpriority="high" preload
      class="absolute inset-0 size-full object-cover"
    />
    <div aria-hidden="true" class="absolute inset-0 bg-ink-strong/20" />
    <div aria-hidden="true" class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink-strong/70 to-transparent" />

    <div class="container-page relative flex min-h-[43.75rem] flex-col justify-end pb-14 pt-32">
      <h1 class="max-w-4xl text-h1 md:text-display">
        {{ title }}
        <span class="mt-4 block text-body md:text-lead">{{ subtitle }}</span>
      </h1>
      <div class="mt-10 flex items-center gap-4 md:absolute md:bottom-14 md:right-10 md:mt-0">
        <UiButton variant="glass" size="lg" to="/#products">{{ cta }}</UiButton>
      </div>
    </div>
  </section>
</template>
