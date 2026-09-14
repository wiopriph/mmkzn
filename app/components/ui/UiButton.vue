<script setup lang="ts">
// Кнопка-пилюля из макета. Варианты:
//  outline-dark  — тонкая рамка, тёмный текст (на белом фоне)
//  outline-light — тонкая рамка, белый текст (на синем/фото)
//  gradient      — оранжевый градиент («Отправить заявку»)
//  glass         — полупрозрачная тёмная поверх фото («Получить прайс»)
const props = withDefaults(defineProps<{
  variant?: 'outline-dark' | 'outline-light' | 'gradient' | 'glass'
  size?: 'md' | 'lg'
  to?: string
  href?: string
  type?: 'button' | 'submit'
}>(), { variant: 'outline-dark', size: 'md', type: 'button' })

const tag = computed(() => props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button')
</script>

<template>
  <component
    :is="tag" :to="to" :href="href" :type="to || href ? undefined : type"
    class="button" :class="[variant, size]"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  @include text-button;
  white-space: nowrap; // пилюля не переносится на узких экранах
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;

  &.md {
    height: calc(var(--spacing) * 14);
    padding-inline: calc(var(--spacing) * 8);
  }

  // размер кнопок макета: «Frame 36» 208×62, паддинги ~38px
  &.lg {
    height: calc(var(--spacing) * 15.5);
    padding-inline: calc(var(--spacing) * 9.5);
  }

  &.outline-dark {
    border: 1px solid var(--color-line);
    color: var(--color-ink);

    &:hover,
    &:focus-visible {
      border-color: var(--color-ink);
      color: var(--color-ink-strong);
    }
  }

  &.outline-light {
    border: 1px solid color-mix(in srgb, var(--color-paper) 60%, transparent);
    color: var(--color-paper);

    &:hover,
    &:focus-visible {
      border-color: var(--color-paper);
      background: color-mix(in srgb, var(--color-paper) 10%, transparent);
    }
  }

  &.gradient {
    background-image: var(--gradient-button);
    color: var(--color-paper);

    &:hover,
    &:focus-visible {
      filter: brightness(1.1);
    }
  }

  &.glass {
    background: color-mix(in srgb, var(--color-ink-strong) 50%, transparent);
    color: var(--color-paper);
    backdrop-filter: blur(4px);

    &:hover,
    &:focus-visible {
      background: color-mix(in srgb, var(--color-ink-strong) 70%, transparent);
    }
  }
}
</style>
