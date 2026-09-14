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
      <!-- кружок с галочкой из макета: кольцо белое, галочка оранжевая при отметке -->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M2.25 12C2.25 6.60059 6.60059 2.25 12 2.25C14.625 2.25 17.0244 3.29004 18.75 5.01562L17.6953 6.07031C16.2715 4.64648 14.25 3.75 12 3.75C7.42383 3.75 3.75 7.42383 3.75 12C3.75 16.5762 7.42383 20.25 12 20.25C16.5762 20.25 20.25 16.5762 20.25 12C20.25 11.3262 20.165 10.7256 20.0156 10.125L21.2344 8.92969C21.6094 9.90527 21.75 10.9512 21.75 12C21.75 17.3994 17.3994 21.75 12 21.75C6.60059 21.75 2.25 17.3994 2.25 12Z" fill="currentColor" />
        <path class="tick" d="M20.4609 5.46094L12 13.9219L8.78906 10.7109L7.71094 11.7891L11.4609 15.5391L12 16.0547L12.5391 15.5391L21.5391 6.53906L20.4609 5.46094Z" fill="var(--color-accent-mid)" />
      </svg>
    </span>
    <span class="label"><slot /></span>
  </label>
</template>

<style scoped lang="scss">
// по макету: кружок 24px, текст 12/15.6, зазор 5px, оранжевая галочка
.checkbox {
  display: flex;
  align-items: flex-start;
  gap: calc(var(--spacing) * 1.25);
  color: var(--color-paper);
  @include text-small;
  line-height: 1.3;
  cursor: pointer;
}

.box {
  display: flex;
  flex-shrink: 0;
  width: calc(var(--spacing) * 6);
  height: calc(var(--spacing) * 6);
  margin-top: calc(var(--spacing) * 1);

  .tick {
    opacity: 0;
    transition: opacity 0.15s;
  }
}

.native:checked + .box .tick {
  opacity: 1;
}

.native:focus-visible + .box {
  outline: 2px solid var(--color-paper);
  outline-offset: 2px;
}
</style>
