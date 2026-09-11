<script setup lang="ts">
// Секция «Инфраструктура как единая система».
// Раскладка повторяет каскадную сетку макета (фрейм 9729:4393, поле 1162px = 29 колонок по 40):
//   «32»   x 0..280   ряд 1   |  заголовок x 387.. ряд 1
//   «94»   x 40..600  ряд 2   |  «500+» x 600..1160 ряд 2 (границы смыкаются)
//   текст+кнопка x 0  ряд 3   |  «90+»  x 600..920  ряд 3  | знак РТ справа
interface Stat { label: string; value: string }
defineProps<{
  title: string
  note: string
  stats: Stat[]
}>()
</script>

<template>
  <section id="infra" class="infra">
    <div class="container grid">
      <h2 class="title">{{ title }}</h2>

      <div v-for="(s, i) in stats" :key="s.label" class="stat" :class="`stat-${i + 1}`">
        <p class="stat-label">{{ s.label }}</p>
        <p class="stat-value">{{ s.value }}</p>
      </div>

      <div class="note-block">
        <p class="note">{{ note }}</p>
        <!-- страница «Компания» появится на Этапе 5 — пока ведём к форме диалога -->
        <UiButton variant="outline-dark" href="#dialog">Подробнее о нас</UiButton>
      </div>

      <div class="region" aria-hidden="true">
        <img src="/design/sign-tatarstan.svg" alt="" class="region-sign">
        <span class="region-text">Республика Татарстан</span>
        <span class="region-text">Казань—2026</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.infra {
  overflow: hidden;
  background: var(--color-paper);
}

.grid {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 6);
  padding-block: calc(var(--spacing) * 14);

  // каскадная сетка макета: 29 колонок по ~40px, три ряда
  @include from-lg {
    display: grid;
    grid-template-columns: repeat(29, 1fr);
    grid-template-rows: minmax(14.5rem, auto) minmax(17.8rem, auto) minmax(14.5rem, auto);
    gap: 0;
    padding-block: calc(var(--spacing) * 14) calc(var(--spacing) * 13);
  }
}

.title {
  @include text-h3;
  max-width: 42rem; // перенос как в макете: «Инфраструктура / как единая система»

  @include from-md {
    @include text-h1;
  }

  @include from-lg {
    grid-column: 11 / 30;
    grid-row: 1;
    padding-left: calc(var(--spacing) * 10);
  }
}

.stat {
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 5);
  border: 1px solid var(--color-line);
}

.stat-label {
  @include text-body-sm;
}

.stat-value {
  margin-top: calc(var(--spacing) * 2);
  @include text-h2;

  @include from-md {
    font-size: var(--text-display);
    line-height: 1;
  }
}

@include from-lg {
  .stat-1 {
    grid-column: 1 / 8;
    grid-row: 1;
  }

  .stat-2 {
    grid-column: 2 / 16;
    grid-row: 2;
  }

  .stat-3 {
    grid-column: 16 / 30;
    grid-row: 2;
    margin-left: -1px; // границы «94» и «500+» смыкаются в одну линию, как в макете
  }

  .stat-4 {
    grid-column: 16 / 24;
    grid-row: 3;
  }
}

.note-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 5);

  @include from-lg {
    grid-column: 1 / 9;
    grid-row: 3;
    justify-content: center;
  }
}

.note {
  max-width: 20rem;
  @include text-body-sm;
}

.region {
  display: none;

  @include from-lg {
    display: flex;
    align-items: flex-end;
    gap: calc(var(--spacing) * 2);
    grid-column: 27 / 30;
    grid-row: 3;
    justify-self: end;
    align-self: end;
  }
}

.region-sign {
  width: calc(var(--spacing) * 20);
  height: auto;
  align-self: center;
}

.region-text {
  color: var(--color-ink-muted);
  @include text-small;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  writing-mode: vertical-rl;
}
</style>
