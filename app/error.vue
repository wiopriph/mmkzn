<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper p-8 text-center">
    <h1 class="text-h1">{{ error.statusCode === 404 ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
    <p class="text-ink-muted">{{ error.statusCode }}</p>
    <NuxtLink to="/" class="rounded-pill bg-brand px-8 py-3 font-semibold text-paper hocus:bg-brand-deep">
      На главную
    </NuxtLink>
  </div>
</template>
