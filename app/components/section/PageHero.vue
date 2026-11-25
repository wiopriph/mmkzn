<script setup lang="ts">
// Hero внутренних страниц по фреймам каталога 12410:4382 / 12783:5139:
// на десктопе фон - плоская синяя заливка, фото (если задано) только на мобилке.
const props = defineProps<{
  title: string
  text: string
  cta?: { label: string; to: string }
  image?: string
}>();

const img = useImage();
const mobilePhoto = computed(() =>
  props.image ? img(props.image, { width: 800, format: 'webp', quality: 72 }) : undefined);

if (mobilePhoto.value) {
  useHead({
    link: [{
      rel: 'preload',
      as: 'image',
      href: mobilePhoto.value,
      media: '(max-width: 767px)',
      fetchpriority: 'high',
    }],
  });
}
</script>

<template>
  <section
    class="hero"
    :style="mobilePhoto ? { '--hero-photo': `url('${mobilePhoto}')` } : undefined"
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
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-height: 50rem;
  background: var(--color-brand-mid);
  color: var(--color-paper);

  @include below-md {
    background:
      var(--gradient-hero-top) top / 100% 18% no-repeat,
      var(--gradient-hero-bottom),
      var(--hero-photo, none) center / cover no-repeat,
      var(--color-brand-mid);
  }

  @include from-md {
    min-height: 43.75rem;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 50rem;
  padding-top: calc(var(--spacing) * 32);
  padding-bottom: calc(var(--spacing) * 12);

  @include from-md {
    min-height: 43.75rem;
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
