<script setup lang="ts">
// Hero по фреймам макета 9156:6212 (десктоп) и 10390:22383 (мобилка):
// заголовок 96/96 (моб. 60/54), подзаголовок 24 (моб. 18) на одной нижней
// линии с кнопками; кнопки — outline-пилюля 62px + круглая play 62×62;
// затемняющих оверлеев поверх фото в макете нет.
// Фон — видео: крутится беззвучно поверх фото (фото остаётся постером
// и фолбэком), появляется с плавным проявлением; кнопка play включает
// и выключает звук того же видео. При prefers-reduced-motion видео
// не запускается вовсе — остаётся статичное фото.
const props = defineProps<{
  title: string
  subtitle: string
  cta: string
  image: { src: string; alt: string }
  video?: string
  videoMobile?: string
}>()

const videoEl = ref<HTMLVideoElement>()
const videoReady = ref(false)
const soundOn = ref(false)
const showVideo = ref(false)
const videoSrc = ref<string>()

onMounted(() => {
  if (!props.video) return
  // видео только тем, кто не просил убрать анимацию
  showVideo.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // узким экранам — лёгкий 720p-файл (выбор один раз при загрузке)
  videoSrc.value = props.videoMobile && window.matchMedia('(max-width: 767px)').matches
    ? props.videoMobile
    : props.video
})

function toggleSound() {
  const v = videoEl.value
  if (!v) return
  if (v.paused) v.play().catch(() => {})
  v.muted = soundOn.value
  soundOn.value = !soundOn.value
}
</script>

<template>
  <section class="hero">
    <!-- постер = первый кадр видео, поэтому старт ролика бесшовный -->
    <NuxtImg
      format="webp"
      :src="image.src" :alt="image.alt" width="1920" height="1072"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1440px" fetchpriority="high" preload
      class="bg"
    />
    <video
      v-if="showVideo"
      ref="videoEl"
      class="bg video"
      :class="{ ready: videoReady }"
      autoplay muted loop playsinline preload="metadata"
      @playing="videoReady = true"
    >
      <source :src="videoSrc" type="video/mp4">
    </video>
    <!-- оверлеи из макета (слой «luch_render 3»): затемнение низа + синий градиент под шапку -->
    <div aria-hidden="true" class="shade-bottom" />
    <div aria-hidden="true" class="shade-top" />

    <div class="container inner">
      <h1 v-reveal class="title">{{ title }}</h1>
      <div class="bottom">
        <p v-reveal="{ delay: 150 }" class="subtitle">{{ subtitle }}</p>
        <div v-reveal="{ delay: 250 }" class="actions">
          <UiButton variant="outline-light" size="lg" to="/#products">{{ cta }}</UiButton>
          <button
            v-if="showVideo"
            type="button" class="play"
            :aria-label="soundOn ? 'Выключить звук видео' : 'Включить звук видео'"
            :aria-pressed="soundOn"
            @click="toggleSound"
          >
            <svg v-if="!soundOn" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
            <!-- звук включён — иконка динамика с волнами -->
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" fill="currentColor" />
              <path d="M15.5 9a4.2 4.2 0 0 1 0 6" stroke-linecap="round" />
              <path d="M18 6.7a7.6 7.6 0 0 1 0 10.6" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 50rem; // мобильный фрейм 800px
  overflow: hidden;
  color: var(--color-paper);

  @include from-md {
    min-height: 43.75rem; // десктопный фрейм 700px
  }
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

.shade-bottom {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero-bottom);
}

.shade-top {
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 18%;
  background: var(--gradient-hero-top);
}

.inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 50rem;
  padding-top: calc(var(--spacing) * 32);
  padding-bottom: calc(var(--spacing) * 12); // низ кнопок ~49 от низа (моб.)

  @include from-md {
    min-height: 43.75rem;
    padding-bottom: calc(var(--spacing) * 11); // низ подзаголовка/кнопок 43-44px
  }
}

.title {
  @include text-display-sm; // мобилка: 60px / 0.9
  margin-bottom: calc(var(--spacing) * 2.5);

  @include from-md {
    @include text-display; // десктоп: 96px / 1
    max-width: 56rem; // перенос как в макете: «Добыча, хранение / и отгрузка»
    margin-bottom: calc(var(--spacing) * 2); // зазор заголовок→подзаголовок 8px
  }
}

.bottom {
  display: flex;
  flex-direction: column;

  // на десктопе подзаголовок и кнопки выровнены по нижней линии
  @include from-md {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: calc(var(--spacing) * 8);
  }
}

.subtitle {
  @include text-body; // мобилка 18px

  @include from-md {
    @include text-lead; // десктоп 24px
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2.5); // 10px между кнопками, как в макете
  margin-top: calc(var(--spacing) * 7.5); // моб.: 30px от подзаголовка

  @include from-md {
    margin-top: 0;
  }

  :deep(.button) {
    flex: 1; // мобилка: «Получить прайс» тянется на всю ширину

    @include from-md {
      flex: none;
    }
  }
}

.play {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: calc(var(--spacing) * 15.5); // 62×62, как Ellipse 151 макета
  height: calc(var(--spacing) * 15.5);
  border: 1px solid var(--color-paper);
  border-radius: var(--radius-pill);
  color: var(--color-paper);
  transition: background 0.2s;

  &:hover,
  &:focus-visible {
    background: color-mix(in srgb, var(--color-paper) 10%, transparent);
  }
}
</style>
