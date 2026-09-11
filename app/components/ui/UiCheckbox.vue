<script setup lang="ts">
defineProps<{ name: string; required?: boolean }>()
const model = defineModel<boolean>({ default: false })
const id = useId()
</script>

<template>
  <label :for="id" class="flex cursor-pointer items-start gap-3 text-small text-paper">
    <input
      :id="id" v-model="model" :name="name" type="checkbox" :required="required"
      class="peer sr-only"
    >
    <span
      aria-hidden="true"
      class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill border border-paper/70 peer-checked:bg-paper peer-focus-visible:outline-2 peer-focus-visible:outline-paper [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.7 6.7L9 1.3" stroke="var(--color-brand)" stroke-width="1.6" />
      </svg>
    </span>
    <span><slot /></span>
  </label>
</template>
