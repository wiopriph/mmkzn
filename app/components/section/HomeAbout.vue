<script setup lang="ts">
defineProps<{ title: string; text: string }>()
</script>

<template>
  <section id="o-nas" class="container-page py-14">
    <h2 class="text-h2 mb-6 text-center">{{ title }}</h2>
    <p class="mx-auto max-w-3xl text-center text-body">{{ text }}</p>
  </section>
</template>
