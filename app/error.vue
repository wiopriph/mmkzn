<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="error">
    <h1 class="title">{{ error.statusCode === 404 ? 'Страница не найдена' : 'Что-то пошло не так' }}</h1>
    <p class="code">{{ error.statusCode }}</p>
    <NuxtLink to="/" class="home">На главную</NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 6);
  min-height: 100vh;
  padding: calc(var(--spacing) * 8);
  background: var(--color-paper);
  text-align: center;
}

.title {
  @include text-h1;
}

.code {
  color: var(--color-ink-muted);
}

.home {
  padding: calc(var(--spacing) * 3) calc(var(--spacing) * 8);
  border-radius: var(--radius-pill);
  background: var(--color-brand);
  color: var(--color-paper);
  font-weight: 600;

  &:hover,
  &:focus-visible {
    background: var(--color-brand-deep);
  }
}
</style>
