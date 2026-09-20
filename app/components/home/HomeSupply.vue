<script setup lang="ts">
// «Снабжаем важные проекты региона» — фрейм 10357:13117 (1282×700).
// Слои: фото/видео → тёмно-синий градиент к низу (op 0.9)
// → заголовок 96/96 (моб. 60) и подзаголовок 18/25.2 слева внизу.
// Карту Татарстана из макета убрали поверх видео (решение владельца).
// Подписи городов в макете лежат ниже кадра (y758+) — в секцию не попадают.
// Фон — беззвучное видео поверх фото (фото остаётся постером и фолбэком);
// секция глубоко под сгибом, поэтому видео монтируется только когда она
// подъезжает к экрану, а при prefers-reduced-motion не грузится вовсе.
const props = defineProps<{
  title: string
  subtitle: string
  image: { src: string; alt: string }
  video?: string
}>()

const sectionEl = ref<HTMLElement>()
const videoReady = ref(false)
const showVideo = ref(false)

onMounted(() => {
  if (!props.video || !sectionEl.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      showVideo.value = true
      io.disconnect()
    }
  }, { rootMargin: '200px' })
  io.observe(sectionEl.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <section id="supply" ref="sectionEl" class="supply">
    <NuxtImg
      format="webp"
      :src="image.src" :alt="image.alt" width="2560" height="1398"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1440px" loading="lazy" class="bg"
    />
    <video
      v-if="showVideo"
      class="bg video"
      :class="{ ready: videoReady }"
      autoplay muted loop playsinline preload="none"
      @playing="videoReady = true"
    >
      <source :src="video" type="video/mp4">
    </video>
    <!-- слой затемнения макета — те же два градиента, что в hero -->
    <div aria-hidden="true" class="shade shade-bottom" />
    <div aria-hidden="true" class="shade shade-top" />

    <div class="container inner">
      <h2 v-reveal class="title">{{ title }}</h2>
      <p v-reveal="{ delay: 150 }" class="subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.supply {
  position: relative;
  min-height: 43.75rem; // 700px
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

// видео проявляется поверх фото, когда реально пошли кадры
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

.inner {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 43.75rem;
  padding-top: calc(var(--spacing) * 24);
  padding-bottom: calc(var(--spacing) * 11); // низ подзаголовка 43px от края
}

.title {
  @include text-display-sm; // моб.: 60

  @include from-md {
    @include text-display; // десктоп: 96 / 96
  }
}

.subtitle {
  margin-top: calc(var(--spacing) * 2.5); // заголовок→подзаголовок 10px
  @include text-body; // 18 / 25.2
}
</style>
