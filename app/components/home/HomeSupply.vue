<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  image: { src: string; alt: string }
}>()
</script>

<template>
  <section id="supply" class="supply">
    <NuxtImg format="webp"
      :src="image.src" :alt="image.alt" width="2560" height="1398"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1440px" loading="lazy" class="bg"
    />
    <!-- контурная карта Татарстана поверх фото, как в макете -->
    <img src="/design/map-tatarstan.svg" alt="" aria-hidden="true" class="map">
    <div aria-hidden="true" class="shade" />

    <div class="container inner">
      <h2 class="title">
        {{ title }}
        <span class="subtitle">{{ subtitle }}</span>
      </h2>
    </div>
  </section>
</template>

<style scoped lang="scss">
.supply {
  position: relative;
  min-height: 43.75rem;
  overflow: hidden;
  color: var(--color-paper);
}

.bg,
.map {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map {
  opacity: 0.4;
}

.shade {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 50%;
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--color-ink-strong) 60%, transparent),
    transparent
  );
}

.inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 43.75rem;
  padding-top: calc(var(--spacing) * 24);
  padding-bottom: calc(var(--spacing) * 14);
}

.title {
  @include text-h1;

  @include from-md {
    @include text-display;
  }
}

.subtitle {
  display: block;
  margin-top: calc(var(--spacing) * 3);
  @include text-body;
}
</style>
