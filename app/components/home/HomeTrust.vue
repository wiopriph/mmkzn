<script setup lang="ts">
// «Нам доверяют объёмы»: чистый синий градиент, оранжевый узор слева-снизу,
// лого-знак слева, заголовок и карточки — от трети ширины вправо (фрейм 10355:13030).
interface Fact { value: string; label: string }
defineProps<{
  title: string
  text: string
  facts: Fact[]
}>()
</script>

<template>
  <section class="trust">
    <img src="/design/pattern-dialog.svg" alt="" aria-hidden="true" class="pattern">

    <div class="container grid">
      <img src="/design/logo-sign-white.svg" alt="" aria-hidden="true" width="240" height="190" class="sign">

      <div class="head">
        <h2 class="title">{{ title }}</h2>
        <p class="text">{{ text }}</p>
      </div>

      <ul class="facts">
        <li v-for="(f, i) in facts" :key="f.label" class="fact">
          <IconArrow v-if="i === facts.length - 1" class="fact-arrow" />
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

.pattern {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 70%;
  transform: translate(-20%, 30%);
  opacity: 0.95;
}

.grid {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 10);
  padding-block: calc(var(--spacing) * 10);

  @include from-lg {
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: calc(var(--spacing) * 10);
    row-gap: calc(var(--spacing) * 14);
  }
}

.sign {
  height: calc(var(--spacing) * 28);
  width: auto;

  @include from-lg {
    grid-column: 1;
    grid-row: 1;
    height: calc(var(--spacing) * 38);
  }
}

.head {
  @include from-lg {
    grid-column: 2;
    grid-row: 1;
  }
}

.title {
  @include text-h3;
  max-width: 30rem; // перенос как в макете: «Нам доверяют / объёмы»

  @include from-md {
    @include text-h2;
  }
}

.text {
  max-width: 34rem;
  margin-top: calc(var(--spacing) * 6);
  @include text-body-sm;
}

.facts {
  display: grid;
  gap: calc(var(--spacing) * 4);

  @include from-md {
    grid-template-columns: repeat(3, 1fr);
  }

  @include from-lg {
    grid-column: 2;
    grid-row: 2;
    gap: calc(var(--spacing) * 5);
  }
}

.fact {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: calc(var(--spacing) * 3);
  min-height: calc(var(--spacing) * 58);
  padding: calc(var(--spacing) * 5);
  border: 1px solid color-mix(in srgb, var(--color-paper) 75%, transparent);
}

.fact-arrow {
  position: absolute;
  top: calc(var(--spacing) * 5);
  right: calc(var(--spacing) * 5);
}

.value {
  font-size: var(--text-h2);
  font-weight: var(--text-h2--font-weight);
  line-height: 1;

  @include from-md {
    font-size: var(--text-display);
  }
}

.check {
  margin-bottom: calc(var(--spacing) * 2);
}

.label {
  @include text-body-sm;
}
</style>
