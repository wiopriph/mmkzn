<script setup lang="ts">
// "Снабжаем важные проекты региона" - фрейм 10357:13117 (1282x700):
// видеополоса + заголовок 96/96 (моб. 60) и подзаголовок 18/25.2 слева внизу.
// Карту Татарстана из макета убрали поверх видео (решение владельца).
defineProps<{
  title: string
  subtitle: string
  image: { src: string; alt: string }
  video?: string
}>();
</script>

<template>
  <SectionVideoBand
    id="supply"
    :image="image"
    :video="video"
  >
    <div class="container inner">
      <h2
        v-reveal
        class="title"
      >
        {{ title }}
      </h2>

      <p
        v-reveal="{ delay: 150 }"
        class="subtitle"
      >
        {{ subtitle }}
      </p>
    </div>
  </SectionVideoBand>
</template>

<style scoped lang="scss">
.inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 43.75rem;
  padding-top: calc(var(--spacing) * 24);
  padding-bottom: calc(var(--spacing) * 11);
}

.title {
  @include text-display-sm;

  @include from-md {
    @include text-display;
  }
}

.subtitle {
  margin-top: calc(var(--spacing) * 2.5);
  @include text-body;
}
</style>
