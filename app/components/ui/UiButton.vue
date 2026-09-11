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

const classes = computed(() => [
  'inline-flex items-center justify-center rounded-pill text-button uppercase tracking-wide transition-colors duration-200 cursor-pointer select-none',
  props.size === 'lg' ? 'h-16 px-10' : 'h-14 px-8',
  {
    'outline-dark': 'border border-line text-ink hocus:border-ink hocus:text-ink-strong',
    'outline-light': 'border border-paper/60 text-paper hocus:border-paper hocus:bg-paper/10',
    'gradient': 'bg-button-gradient text-paper hocus:brightness-110',
    'glass': 'bg-ink-strong/50 text-paper backdrop-blur-sm hocus:bg-ink-strong/70',
  }[props.variant],
])
</script>

<template>
  <component :is="tag" :to="to" :href="href" :type="to || href ? undefined : type" :class="classes">
    <slot />
  </component>
</template>
