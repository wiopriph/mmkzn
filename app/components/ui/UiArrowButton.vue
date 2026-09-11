<script setup lang="ts">
// Круглая кнопка со стрелкой: слайдеры, карточки, CTA.
withDefaults(defineProps<{
  direction?: 'left' | 'right'
  variant?: 'outline-dark' | 'outline-light'
  label: string
}>(), { direction: 'right', variant: 'outline-dark' })
</script>

<template>
  <button type="button" class="arrow" :class="variant" :aria-label="label">
    <svg
      width="27" height="21" viewBox="0 0 27 21" fill="none" aria-hidden="true"
      :class="{ flipped: direction === 'left' }"
    >
      <path d="M16.5 1.5L25.5 10.5L16.5 19.5M25.5 10.5H0.5" stroke="currentColor" stroke-width="1.5" />
    </svg>
  </button>
</template>

<style scoped lang="scss">
.arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--spacing) * 16);
  height: calc(var(--spacing) * 16);
  border-radius: var(--radius-pill);
  border: 1px solid;
  transition: all 0.2s;

  &.outline-dark {
    border-color: var(--color-line);
    color: var(--color-ink);

    &:hover,
    &:focus-visible {
      border-color: var(--color-ink);
    }
  }

  &.outline-light {
    border-color: color-mix(in srgb, var(--color-paper) 60%, transparent);
    color: var(--color-paper);

    &:hover,
    &:focus-visible {
      border-color: var(--color-paper);
      background: color-mix(in srgb, var(--color-paper) 10%, transparent);
    }
  }

  .flipped {
    transform: rotate(180deg);
  }
}
</style>
