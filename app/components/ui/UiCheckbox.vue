<script setup lang="ts">
defineProps<{ name: string; required?: boolean }>()
const model = defineModel<boolean>({ default: false })
const id = useId()
</script>

<template>
  <label :for="id" class="checkbox">
    <input
      :id="id" v-model="model" :name="name" type="checkbox" :required="required"
      class="visually-hidden native"
    >
    <span aria-hidden="true" class="box">
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.7 6.7L9 1.3" stroke="var(--color-brand)" stroke-width="1.6" />
      </svg>
    </span>
    <span class="label"><slot /></span>
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: flex-start;
  gap: calc(var(--spacing) * 3);
  color: var(--color-paper);
  @include text-small;
  cursor: pointer;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: calc(var(--spacing) * 5);
  height: calc(var(--spacing) * 5);
  margin-top: calc(var(--spacing) / 2);
  border: 1px solid color-mix(in srgb, var(--color-paper) 70%, transparent);
  border-radius: var(--radius-pill);

  svg {
    opacity: 0;
  }
}

.native:checked + .box {
  background: var(--color-paper);

  svg {
    opacity: 1;
  }
}

.native:focus-visible + .box {
  outline: 2px solid var(--color-paper);
  outline-offset: 2px;
}
</style>
