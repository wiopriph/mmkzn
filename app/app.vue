<script setup lang="ts">
// title переносится из Yoast байт в байт — без titleTemplate с суффиксами
useHead({
  htmlAttrs: { lang: 'ru' },
  titleTemplate: '%s',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
