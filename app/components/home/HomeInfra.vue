<script setup lang="ts">
// Секция «Инфраструктура как единая система» — фреймы 9729:4393 (1282×853)
// и 10390:22396 (мобилка 390×800). Каскад карточек сохраняется на обоих:
// мобилка — «32» на левой половине (знак РТ справа), «94»/«500+» во всю
// ширину со сдвигом 12px, «90+» на правой половине рядом с нотой.
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
  // мобильная сетка макета: линии 0 | 12px | 50% | 100%
  display: grid;
  grid-template-columns: calc(var(--spacing) * 3) calc(50% - var(--spacing) * 3) 1fr;
  grid-template-rows: auto minmax(8.4375rem, auto) minmax(8.3125rem, auto) minmax(8.3125rem, auto) minmax(8.5rem, auto);
  padding-block: calc(var(--spacing) * 7) calc(var(--spacing) * 12);

  @include from-lg {
    grid-template-columns: repeat(29, 1fr);
    grid-template-rows: minmax(14.5rem, auto) minmax(17.8rem, auto) minmax(14.5rem, auto);
    padding-block: calc(var(--spacing) * 13) calc(var(--spacing) * 14);
  }
}

.title {
  grid-column: 1 / -1;
  grid-row: 1;
  margin-bottom: calc(var(--spacing) * 10); // зазор заголовок→карточки ~43px
  font-size: 2.5rem; // мобилка: 40 / 48
  font-weight: 500;
  line-height: 1.2;

  // заголовок макета: 64 / 76.8 (lh 1.2)
  @include from-md {
    font-size: var(--text-h2);
    line-height: 1.2;
    max-width: 40rem; // перенос как в макете: «Инфраструктура / как единая система»
  }

  @include from-lg {
    grid-column: 11 / 30;
    grid-row: 1;
    margin-bottom: 0;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 2.5); // мобилка: паддинг 10px

  @include from-lg {
    padding: calc(var(--spacing) * 5);
  }

  border: 1px solid var(--color-line);
  background: var(--color-paper);
}

.stat-label {
  @include text-small; // мобилка: 12 / 15.6

  @include from-lg {
    @include text-body-sm;
  }
}

.stat-value {
  font-weight: 500;
  font-size: 2.625rem; // мобилка: 42 / 42
  line-height: 1;

  @include from-lg {
    margin-top: calc(var(--spacing) * 2.5); // зазор лейбл→число 10px
    font-size: 4rem; // «500+», «90+» — 64px
  }
}

// «32» и «94» — числа крупнее на десктопе: 72px
@include from-lg {
  .stat-1 .stat-value,
  .stat-2 .stat-value {
    font-size: var(--text-h1);
  }
}

// мобильный каскад (пересечения рамок на 1px, как и на десктопе)
.stat-1 {
  grid-column: 1 / 3;
  grid-row: 2;
  z-index: 1; // рамка «32» лежит поверх «94», как в макете
}

.stat-2 {
  grid-column: 2 / 4;
  grid-row: 3;
  margin-top: -1px;
}

.stat-3 {
  grid-column: 2 / 4;
  grid-row: 4;
  margin-top: -1px;
}

.stat-4 {
  grid-column: 3 / 4;
  grid-row: 5;
  margin-top: -1px;
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
    margin-left: -1px; // границы «94» и «500+» смыкаются в одну линию
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
  gap: calc(var(--spacing) * 2.5);
  grid-column: 1 / 3;
  grid-row: 5;
  padding-top: calc(var(--spacing) * 3);
  padding-right: calc(var(--spacing) * 4);

  // мобильная кнопка макета — уменьшенная (106×32)
  :deep(.button) {
    height: calc(var(--spacing) * 8);
    padding-inline: calc(var(--spacing) * 5);
    font-size: 0.625rem;
  }

  @include from-lg {
    grid-column: 1 / 9;
    grid-row: 3;
    justify-content: center;
    padding: 0;
    gap: calc(var(--spacing) * 5); // текст→кнопка 20px

    :deep(.button) {
      height: calc(var(--spacing) * 15.5);
      padding-inline: calc(var(--spacing) * 9.5);
      font-size: var(--text-button);
    }
  }
}

.note {
  max-width: 20rem;
  @include text-small; // мобилка: 12 / 16.8
  line-height: 1.4;

  @include from-lg {
    @include text-body-sm;
    line-height: 1.7; // 16 / 27.2 в макете
  }
}

.region {
  // мобилка: знак и подписи справа, на уровне карточки «32»
  display: flex;
  flex-direction: row-reverse; // визуально: знак, «Казань—2026», «Республика Татарстан»
  align-items: flex-start;
  gap: calc(var(--spacing));
  grid-column: 3 / 4;
  grid-row: 2;
  justify-self: end;

  @include from-lg {
    align-items: flex-end; // вертикальные подписи выровнены по низу
    grid-column: 26 / 30;
    grid-row: 3;
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
  font-size: var(--text-small); // мобилка 12 / 300
  font-weight: 300;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  writing-mode: vertical-rl;

  @include from-lg {
    font-size: var(--text-caption); // десктоп 14 / 300
  }
}
</style>
