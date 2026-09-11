<script setup lang="ts">
// Поле-пилюля из формы «Приглашаем к диалогу»: белая рамка на синем фоне.
defineProps<{
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
    <label :for="id" class="visually-hidden">{{ label }}</label>
    <input
      :id="id" v-model="model" :name="name" :type="type ?? 'text'"
      :required="required" :autocomplete="autocomplete" :placeholder="label"
      class="input"
    >
  </div>
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  height: calc(var(--spacing) * 16);
  padding-inline: calc(var(--spacing) * 8);
  border: 1px solid color-mix(in srgb, var(--color-paper) 60%, transparent);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-paper);
  @include text-button;

  &::placeholder {
    color: color-mix(in srgb, var(--color-paper) 80%, transparent);
    text-transform: uppercase;
  }

  &:focus {
    border-color: var(--color-paper);
    outline: none;
  }
}
</style>
