<script setup lang="ts">
// Поле-пилюля из формы «Приглашаем к диалогу»: белая рамка на синем фоне.
const props = defineProps<{
  name: string
  label: string
  type?: 'text' | 'tel'
  required?: boolean
  autocomplete?: string
}>()

const model = defineModel<string>({ default: '' })
const id = useId()
</script>

<template>
  <div>
    <label :for="id" class="sr-only">{{ label }}</label>
    <input
      :id="id" v-model="model" :name="name" :type="type ?? 'text'"
      :required="required" :autocomplete="autocomplete" :placeholder="label"
      class="h-16 w-full rounded-pill border border-paper/60 bg-transparent px-8 text-button uppercase tracking-wide text-paper placeholder:text-paper/80 focus:border-paper focus:outline-none"
    >
  </div>
</template>
