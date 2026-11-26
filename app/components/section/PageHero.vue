<script setup lang="ts">
// Hero внутренних страниц (каталог: фреймы 12410:4382 / 12783:5139).
// Фон - видеополоса SectionVideoBand: постер (первый кадр ролика) и беззвучное
// видео поверх. В макете десктопный фон был плоской синей заливкой - видео
// добавлено по решению владельца, как на главной.
defineProps<{
  title: string
  text: string
  cta?: { label: string; to: string }
  image: { src: string; alt: string }
  video?: string
  videoMobile?: string
}>();
</script>

<template>
  <!-- на узком экране кадр 16:9 обрезается по высоте - картинке нужна ширина больше экрана -->
  <SectionVideoBand
    :image="image"
    :video="video"
    :videoMobile="videoMobile"
    sizes="xs:200vw sm:200vw md:100vw lg:100vw xl:1440px"
    isPriority
    class="hero"
  >
    <div class="container inner">
      <h1
        v-reveal
        class="title"
      >
        {{ title }}
      </h1>

      <div class="bottom">
        <p
          v-reveal="{ delay: 150 }"
          class="text"
        >
          {{ text }}
        </p>

        <div
          v-if="cta"
          v-reveal="{ delay: 250 }"
          class="actions"
        >
          <UiButton
            variant="outline-light"
            size="lg"
            :href="cta.to"
          >
            {{ cta.label }}
          </UiButton>
        </div>
      </div>
    </div>
  </SectionVideoBand>
</template>

<style scoped lang="scss">
.hero {
  --band-min-height: 50rem;
  background: var(--color-brand-mid);

  @include from-md {
    --band-min-height: 43.75rem;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: var(--band-min-height);
  padding-top: calc(var(--spacing) * 32);
  padding-bottom: calc(var(--spacing) * 12);

  @include from-md {
    padding-bottom: calc(var(--spacing) * 10.75);
  }
}

.title {
  @include text-display-sm;
  margin-bottom: calc(var(--spacing) * 2.5);

  @include from-md {
    @include text-display;
    max-width: 58rem;
  }
}

.bottom {
  display: flex;
  flex-direction: column;

  @include from-md {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: calc(var(--spacing) * 8);
  }
}

.text {
  white-space: pre-line;
  @include text-body;

  @include from-md {
    max-width: 47.5rem;
    @include text-lead;
  }
}

.actions {
  display: flex;
  margin-top: calc(var(--spacing) * 5);

  @include from-md {
    flex-shrink: 0;
    margin-top: 0;
  }

  :deep(.button) {
    flex: 1;

    // кнопка макета 271x62 - уже стандартной
    @include from-md {
      flex: none;
      padding-inline: calc(var(--spacing) * 4.5);
    }
  }
}
</style>
