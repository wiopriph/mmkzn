<script setup lang="ts">
import { dimsOf } from '~/utils/mediaDims'
defineProps<{
  title: string
  image: { src: string; alt: string }
}>()
</script>

<template>
  <section class="bg-brand-dark text-paper">
    <div class="container-page flex flex-col items-center gap-8 py-14 text-center">
      <img src="/legacy/media/mirumir-logo-dark.svg" alt="" aria-hidden="true" width="205" height="160" class="h-40 w-auto">
      <h1 class="text-h1 uppercase tracking-wide">{{ title }}</h1>
      <NuxtImg
        :src="image.src" :alt="image.alt" v-bind="dimsOf(image.src)"
        sizes="100vw md:1200px" class="w-full max-w-5xl rounded-card shadow-card" fetchpriority="high"
      />
    </div>
  </section>
</template>
