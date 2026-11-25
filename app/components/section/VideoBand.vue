<script setup lang="ts">
// Полноширинная фото/видео-полоса с затемнением макета (два градиента hero).
// Видео беззвучное, поверх фото-постера; монтируется, когда секция подъезжает
// к экрану, а при prefers-reduced-motion не грузится вовсе.
// Высота: --band-min-height (по умолчанию 700px).
const props = defineProps<{
  image: { src: string; alt: string }
  video?: string
}>();

const bandEl = ref<HTMLElement>();
const isVideoReady = ref(false);
const shouldShowVideo = ref(false);

let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (!props.video || !bandEl.value) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      shouldShowVideo.value = true;
      observer?.disconnect();
    }
  }, { rootMargin: '200px' });

  observer.observe(bandEl.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section
    ref="bandEl"
    class="band"
  >
    <NuxtImg
      format="webp"
      :src="image.src"
      :alt="image.alt"
      width="2560"
      height="1398"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1440px"
      loading="lazy"
      class="bg"
    />

    <video
      v-if="shouldShowVideo"
      class="bg video"
      :class="{ ready: isVideoReady }"
      autoplay
      muted
      loop
      playsinline
      preload="none"
      @playing="isVideoReady = true"
    >
      <source
        :src="video"
        type="video/mp4"
      >
    </video>

    <div
      aria-hidden="true"
      class="shade shade-bottom"
    />

    <div
      aria-hidden="true"
      class="shade shade-top"
    />

    <div
      v-if="$slots.default"
      class="content"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.band {
  position: relative;
  min-height: var(--band-min-height, 43.75rem);
  overflow: hidden;
  color: var(--color-paper);
}

.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video {
  opacity: 0;
  transition: opacity 0.8s;

  &.ready {
    opacity: 1;
  }
}

.shade {
  position: absolute;
  z-index: 2;
}

.shade-bottom {
  inset: 0;
  background: var(--gradient-hero-bottom);
}

.shade-top {
  inset-inline: 0;
  top: 0;
  height: 18%;
  background: var(--gradient-hero-top);
}

.content {
  position: relative;
  z-index: 3;
}
</style>
