<script setup lang="ts">
import { dimsOf } from '~/utils/mediaDims'
defineProps<{ images: { src: string; alt: string }[] }>()
</script>

<template>
  <section class="container-page py-14">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <NuxtImg
        v-for="img in images" :key="img.src"
        :src="img.src" :alt="img.alt" v-bind="dimsOf(img.src)"
        sizes="50vw md:25vw" loading="lazy"
        class="aspect-[3/4] w-full rounded-card object-cover shadow-card"
      />
    </div>
  </section>
</template>
