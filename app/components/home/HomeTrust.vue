<script setup lang="ts">
interface Fact { value: string; label: string; highlight?: boolean }
defineProps<{
  title: string
  text: string
  image: { src: string; alt: string }
  facts: Fact[]
}>()
</script>

<template>
  <section class="trust">
    <NuxtImg format="webp"
      :src="image.src" :alt="image.alt" width="2048" height="1143"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1440px" loading="lazy" class="bg"
    />
    <div class="container inner">
      <div class="head">
        <img src="/design/logo-sign-white.svg" alt="" aria-hidden="true" width="240" height="190" class="sign">
        <div>
          <h2 class="title">{{ title }}</h2>
          <p class="text">{{ text }}</p>
        </div>
      </div>

      <ul class="facts">
        <li
          v-for="f in facts" :key="f.label"
          class="fact" :class="{ highlight: f.highlight }"
        >
          <p v-if="f.value" class="value">{{ f.value }}</p>
          <svg v-else width="52" height="52" viewBox="0 0 64 64" fill="none" aria-hidden="true" class="check">
            <circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="2.5" />
            <path d="M22 32.5L29 39.5L42 26" stroke="currentColor" stroke-width="2.5" />
          </svg>
          <p class="label">{{ f.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.trust {
  position: relative;
  overflow: hidden;
  background-image: var(--gradient-section);
  color: var(--color-paper);
}

.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
  mix-blend-mode: luminosity;
}

.inner {
  position: relative;
  padding-block: calc(var(--spacing) * 20);

  @include from-md {
    padding-block: calc(var(--spacing) * 28);
  }
}

.head {
  display: grid;
  gap: calc(var(--spacing) * 10);

  @include from-md {
    grid-template-columns: 1fr 1fr;
  }
}

.sign {
  height: calc(var(--spacing) * 32);
  width: auto;

  @include from-md {
    height: calc(var(--spacing) * 48);
  }
}

.title {
  @include text-h3;

  @include from-md {
    @include text-h2;
  }
}

.text {
  max-width: 32rem;
  margin-top: calc(var(--spacing) * 6);
  @include text-body-sm;
}

.facts {
  display: grid;
  gap: calc(var(--spacing) * 4);
  margin-top: calc(var(--spacing) * 16);

  @include from-md {
    grid-template-columns: repeat(3, 1fr);
    max-width: 48rem;
    margin-left: auto;
  }
}

.fact {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: calc(var(--spacing) * 3);
  min-height: calc(var(--spacing) * 72);
  padding: calc(var(--spacing) * 6);
  border: 1px solid color-mix(in srgb, var(--color-paper) 70%, transparent);

  &.highlight {
    border-color: var(--color-accent);
    background: var(--color-accent);
  }
}

.value {
  @include text-display;
}

.check {
  margin-bottom: auto;
}

.label {
  @include text-body-sm;
}
</style>
