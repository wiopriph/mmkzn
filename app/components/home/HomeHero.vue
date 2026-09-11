<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  cta: string
  image: { src: string; alt: string }
}>()
</script>

<template>
  <section class="hero">
    <NuxtImg format="webp"
      :src="image.src" :alt="image.alt" width="2560" height="1398"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1440px" fetchpriority="high" preload
      class="bg"
    />
    <div aria-hidden="true" class="tint" />
    <div aria-hidden="true" class="shade" />

    <div class="container inner">
      <h1 class="title">
        {{ title }}
        <span class="subtitle">{{ subtitle }}</span>
      </h1>
      <div class="cta">
        <UiButton variant="glass" size="lg" to="/#products">{{ cta }}</UiButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 43.75rem;
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

.tint {
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--color-ink-strong) 20%, transparent);
}

.shade {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 66%;
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--color-ink-strong) 70%, transparent),
    transparent
  );
}

.inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 43.75rem;
  padding-top: calc(var(--spacing) * 32);
  padding-bottom: calc(var(--spacing) * 14);
}

.title {
  max-width: 56rem;
  @include text-h1;

  @include from-md {
    @include text-display;
  }
}

.subtitle {
  display: block;
  margin-top: calc(var(--spacing) * 4);
  @include text-body;

  @include from-md {
    @include text-lead;
  }
}

.cta {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 4);
  margin-top: calc(var(--spacing) * 10);

  @include from-md {
    position: absolute;
    right: var(--container-pad-md);
    bottom: calc(var(--spacing) * 14);
    margin-top: 0;
  }
}
</style>
