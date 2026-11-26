<script setup lang="ts">
// Полноширинная фото/видео-полоса с затемнением макета (два градиента hero).
// Видео беззвучное, поверх фото-постера; монтируется, когда секция подъезжает
// к экрану, а при prefers-reduced-motion не грузится вовсе.
// isPriority - полоса на первом экране (hero): постер грузится сразу с preload,
// видео монтируется после полной загрузки страницы, чтобы не мешать LCP.
// Высота: --band-min-height (по умолчанию 700px).
const props = withDefaults(defineProps<{
  image: { src: string; alt: string }
  video?: string
  videoMobile?: string
  isPriority?: boolean
  sizes?: string
}>(), {
  video: undefined,
  videoMobile: undefined,
  sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:1440px',
});

const bandEl = ref<HTMLElement>();
const isVideoReady = ref(false);
const shouldShowVideo = ref(false);
const videoSrc = ref<string>();

let observer: IntersectionObserver | undefined;

function showVideo() {
  shouldShowVideo.value = true;
}

onMounted(() => {
  if (!props.video || !bandEl.value) {
    return;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // узким экранам - легкий 720p-файл (выбор один раз при загрузке)
  videoSrc.value = props.videoMobile && window.matchMedia('(max-width: 767px)').matches ?
    props.videoMobile :
    props.video;

  if (props.isPriority) {
    if (document.readyState === 'complete') {
      showVideo();
    } else {
      window.addEventListener('load', showVideo, { once: true });
    }

    return;
  }

  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      showVideo();
      observer?.disconnect();
    }
  }, { rootMargin: '200px' });

  observer.observe(bandEl.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.removeEventListener('load', showVideo);
});
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
      :sizes="sizes"
      :loading="isPriority ? 'eager' : 'lazy'"
      :fetchpriority="isPriority ? 'high' : undefined"
      :preload="isPriority"
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
        :src="videoSrc"
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
      class="band-content"
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

// не .content: это имя занято глобальной типографикой markdown-страниц
.band-content {
  position: relative;
  z-index: 3;
}
</style>
