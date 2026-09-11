<script setup lang="ts">
// Круглая кнопка со стрелкой: слайдеры, карточки, CTA.
const props = withDefaults(defineProps<{
  direction?: 'left' | 'right'
  variant?: 'outline-dark' | 'outline-light'
  label: string
}>(), { direction: 'right', variant: 'outline-dark' })

const cls = computed(() => [
  'inline-flex size-16 items-center justify-center rounded-pill border transition-colors duration-200 cursor-pointer',
  props.variant === 'outline-light'
    ? 'border-paper/60 text-paper hocus:border-paper hocus:bg-paper/10'
    : 'border-line text-ink hocus:border-ink',
])
</script>

<template>
  <button type="button" :class="cls" :aria-label="label">
    <svg
      width="27" height="21" viewBox="0 0 27 21" fill="none" aria-hidden="true"
      :class="direction === 'left' ? 'rotate-180' : ''"
    >
      <path d="M16.5 1.5L25.5 10.5L16.5 19.5M25.5 10.5H0.5" stroke="currentColor" stroke-width="1.5" />
    </svg>
  </button>
</template>
