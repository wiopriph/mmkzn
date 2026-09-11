<script setup lang="ts">
defineProps<{ title: string; items: string[] }>()
</script>

<template>
  <section id="plusy" class="container-page py-14">
    <h2 class="text-h2 mb-10 text-center">{{ title }}</h2>
    <ul class="grid gap-6 md:grid-cols-3">
      <li v-for="item in items" :key="item" class="rounded-card border border-stone p-6 font-medium">
        {{ item }}
      </li>
    </ul>
  </section>
</template>
