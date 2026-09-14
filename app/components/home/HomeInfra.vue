<script setup lang="ts">
// Секция «Инфраструктура как единая система» — фрейм 9729:4393 (1282×853).
// Каскадная сетка: поле контента 1162px = 29 колонок по 40; карточки
// пересекаются рамками ровно на 1px (по вертикали и горизонтали).
//   «32»   x 0..280   ряд 1 (число 72px)  |  заголовок 64/76.8 с x387
//   «94»   x 40..600  ряд 2 (число 72px)  |  «500+» x 600..1160 ряд 2 (64px)
//   текст+кнопка x 0  ряд 3               |  «90+»  x 600..920  ряд 3 (64px)
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
        <UiButton variant="outline-dark" size="lg" href="#dialog">Подробнее о нас</UiButton>
      </div>

      <div class="region" aria-hidden="true">
        <span class="region-text">Республика Татарстан</span>
        <span class="region-text">Казань—2026</span>
        <img src="/design/sign-tatarstan.svg" alt="" class="region-sign">
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

  @include from-lg {
    display: grid;
    grid-template-columns: repeat(29, 1fr);
    grid-template-rows: minmax(14.5rem, auto) minmax(17.8rem, auto) minmax(14.5rem, auto);
    gap: 0;
    padding-block: calc(var(--spacing) * 13) calc(var(--spacing) * 14);
  }
}

.title {
  @include text-h3;

  // заголовок макета: 64 / 76.8 (lh 1.2)
  @include from-md {
    font-size: var(--text-h2);
    font-weight: var(--text-h2--font-weight);
    line-height: 1.2;
    max-width: 40rem; // перенос как в макете: «Инфраструктура / как единая система»
  }

  @include from-lg {
    grid-column: 11 / 30;
    grid-row: 1;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 5);
  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.stat-label {
  @include text-body-sm;
}

.stat-value {
  margin-top: calc(var(--spacing) * 2.5); // зазор лейбл→число 10px
  font-weight: 500;
  font-size: 4rem; // «500+», «90+» — 64px
  line-height: 1;
}

// «32» и «94» — числа крупнее: 72px
.stat-1 .stat-value,
.stat-2 .stat-value {
  font-size: var(--text-h1);
}

@include from-lg {
  .stat-1 {
    grid-column: 1 / 8;
    grid-row: 1;
    z-index: 1; // рамка «32» лежит поверх «94», как в макете
  }

  .stat-2 {
    grid-column: 2 / 16;
    grid-row: 2;
    margin-top: -1px; // ряды пересекаются на 1px
  }

  .stat-3 {
    grid-column: 16 / 30;
    grid-row: 2;
    margin-top: -1px;
    margin-left: -1px; // границы «94» и «500+» смыкаются в одну линию
  }

  .stat-4 {
    grid-column: 16 / 24;
    grid-row: 3;
    margin-top: -1px;
  }
}

.note-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 5); // текст→кнопка 20px

  @include from-lg {
    grid-column: 1 / 9;
    grid-row: 3;
    justify-content: center;
  }
}

.note {
  max-width: 20rem;
  @include text-body-sm;
  line-height: 1.7; // 16 / 27.2 в макете
}

.region {
  display: none;

  @include from-lg {
    display: flex;
    flex-direction: row-reverse; // визуально: знак, «Казань—2026», «Республика Татарстан»
    align-items: flex-end; // вертикальные подписи выровнены по низу
    gap: calc(var(--spacing));
    grid-column: 26 / 30;
    grid-row: 3;
    justify-self: end;
    align-self: end;
  }
}

.region-sign {
  width: calc(var(--spacing) * 20); // 80×73
  height: auto;
  align-self: center;
}

.region-text {
  color: var(--color-ink-muted);
  font-size: var(--text-caption); // 14px / 300 в макете
  font-weight: 300;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  writing-mode: vertical-rl;
}
</style>
