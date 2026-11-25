<script setup lang="ts" generic="Item">
// Каскад из четырех карточек с заголовком, нотой и кнопкой: "Инфраструктура"
// на главной (фреймы 9729:4393, моб. 10390:22396) и шаги каталога (12746:4708,
// моб. 12783:5220) - геометрия в макете одна и та же.
// Десктоп: поле каскада 1160px = 29 колонок по 40 (уже контейнера), рамки
// карточек пересекаются ровно на 1px; хвостовая колонка 1fr дотягивает
// до правого края контейнера - в ней живет слот aside.
//   1: x 0..280 ряд 1      | заголовок 64/76.8 с x387
//   2: x 40..600 ряд 2     | 3: x 600..1160 ряд 2
//   нота + кнопка ряд 3    | 4: x 600..920 ряд 3
// Мобилка: 1 на левой половине, 2 и 3 с отступами 12px от краев,
// 4 на правой половине рядом с нотой.
// Настройка под контент: --cascade-title-width (точка переноса заголовка),
// --cascade-note-width, --cascade-cta-padding, --cascade-note-inset (моб.).
defineProps<{
  title: string
  note: string
  cta: { label: string; href: string }
  items: Item[]
}>();
</script>

<template>
  <section class="cascade">
    <div class="container grid">
      <h2
        v-reveal
        class="title"
      >
        {{ title }}
      </h2>

      <div
        v-for="(item, index) in items"
        :key="index"
        v-reveal="{ delay: index * 120 }"
        class="card"
        :class="`card-${index + 1}`"
      >
        <slot
          name="card"
          :item="item"
          :index="index"
        />
      </div>

      <div
        v-reveal
        class="note-block"
      >
        <p class="note">
          {{ note }}
        </p>

        <UiButton
          variant="outline-dark"
          size="lg"
          :href="cta.href"
        >
          {{ cta.label }}
        </UiButton>
      </div>

      <slot name="aside" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.cascade {
  overflow: hidden;
  background: var(--color-paper);
}

.grid {
  // мобильная сетка макета: линии 0 | 12px | 50% | 100% - 12px | 100%
  display: grid;
  grid-template-columns: calc(var(--spacing) * 3) calc(50% - var(--spacing) * 3) 1fr calc(var(--spacing) * 3);
  grid-template-rows: auto minmax(8.4375rem, auto) minmax(8.3125rem, auto) minmax(8.3125rem, auto) minmax(8.5rem, auto);
  padding-block: calc(var(--spacing) * 7.5) calc(var(--spacing) * 12);

  @include from-lg {
    grid-template-columns: repeat(29, minmax(0, 2.5rem)) minmax(0, 1fr);
    grid-template-rows: minmax(14.5rem, auto) minmax(17.8rem, auto) minmax(14.5rem, auto);
    padding-block: calc(var(--spacing) * 13) calc(var(--spacing) * 14);
  }
}

.title {
  grid-column: 1 / -1;
  grid-row: 1;
  margin-bottom: calc(var(--spacing) * 10.75);
  font-size: 2.5rem; // мобилка 40/48, токена нет
  font-weight: 500;
  line-height: 1.2;
  white-space: pre-line;

  @include from-md {
    font-size: var(--text-h2);
    line-height: 1.2;
    max-width: var(--cascade-title-width, 40rem);
  }

  // заголовок макета на x387 от края контента: линия 10 сетки (360px) + 27px
  @include from-lg {
    grid-column: 10 / -1;
    grid-row: 1;
    margin-bottom: 0;
    margin-left: 1.6875rem;
  }
}

.card {
  display: flex;
  flex-direction: column;
  padding: calc(var(--spacing) * 2.5);
  border: 1px solid var(--color-line);
  background: var(--color-paper);

  @include from-lg {
    padding: calc(var(--spacing) * 5);
  }
}

.card-1 {
  grid-column: 1 / 3;
  grid-row: 2;
  z-index: 1; // рамка первой карточки лежит поверх второй, как в макете
}

.card-2 {
  grid-column: 2 / 4;
  grid-row: 3;
  margin-top: -1px;
}

.card-3 {
  grid-column: 2 / 4;
  grid-row: 4;
  margin-top: -1px;
}

.card-4 {
  grid-column: 3 / 5;
  grid-row: 5;
  margin-top: -1px;
  margin-left: -1px;
}

@include from-lg {
  .card-1 {
    grid-column: 1 / 8;
    grid-row: 1;
  }

  .card-2 {
    grid-column: 2 / 16;
    grid-row: 2;
  }

  .card-3 {
    grid-column: 16 / 30;
    grid-row: 2;
    margin-left: -1px;
  }

  .card-4 {
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
  padding: var(--cascade-note-inset, calc(var(--spacing) * 3) calc(var(--spacing) * 4) 0 0);

  // мобильная кнопка макета уменьшенная (106x32)
  :deep(.button) {
    height: calc(var(--spacing) * 8);
    padding-inline: calc(var(--spacing) * 5);
    font-size: 0.625rem;
  }

  @include from-lg {
    grid-column: 1 / 11;
    grid-row: 3;
    justify-content: center;
    padding: 0;
    gap: calc(var(--spacing) * 5);

    :deep(.button) {
      height: calc(var(--spacing) * 15.5);
      padding-inline: var(--cascade-cta-padding, calc(var(--spacing) * 9.5));
      font-size: var(--text-button);
    }
  }
}

.note {
  max-width: var(--cascade-note-width, 20rem);
  white-space: pre-line;
  @include text-small;
  line-height: 1.4;

  @include from-lg {
    @include text-body-sm;
    line-height: 1.7; // 16/27.2 в макете
  }
}
</style>
