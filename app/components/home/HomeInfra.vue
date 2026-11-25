<script setup lang="ts">
// "Инфраструктура как единая система" - каскад SectionCascade с цифрами компании
// и знаком Татарстана. Числа первых двух карточек на десктопе крупнее (72px).
interface Stat { label: string; value: string }

defineProps<{
  title: string
  note: string
  stats: Stat[]
}>();

// страницы "Компания" пока нет (Этап 5) - кнопка ведет к форме диалога
const cta = { label: 'Подробнее о нас', href: '#dialog' };
</script>

<template>
  <SectionCascade
    id="infra"
    :title="title"
    :note="note"
    :cta="cta"
    :items="stats"
  >
    <template #card="{ item, index }">
      <p class="stat-label">
        {{ item.label }}
      </p>

      <p
        class="stat-value"
        :class="{ 'is-large': index < 2 }"
      >
        {{ item.value }}
      </p>
    </template>

    <template #aside>
      <div
        v-reveal="{ delay: 150 }"
        class="region"
        aria-hidden="true"
      >
        <span class="region-text">Республика Татарстан</span>

        <span class="region-text">Казань—2026</span>

        <img
          src="/design/sign-tatarstan.svg"
          alt=""
          width="80"
          height="73"
          class="region-sign"
        >
      </div>
    </template>
  </SectionCascade>
</template>

<style scoped lang="scss">
.stat-label {
  @include text-small;

  @include from-lg {
    @include text-body-sm;
  }
}

.stat-value {
  font-weight: 500;
  font-size: 2.625rem; // мобилка 42/42, токена нет
  line-height: 1;

  @include from-lg {
    margin-top: calc(var(--spacing) * 2.5);
    font-size: 4rem;

    &.is-large {
      font-size: var(--text-h1);
    }
  }
}

.region {
  // мобилка: знак и подписи справа от первой карточки; надпись "Республика
  // Татарстан" выше ряда, поэтому регион занимает ряды 1-2 с прижимом к низу
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  gap: calc(var(--spacing));
  width: max-content; // на десктопе колонка уже знака - не даем ему сжаться
  grid-column: 3 / 5;
  grid-row: 1 / 3;
  justify-self: end;
  align-self: end;
  margin-bottom: calc(var(--spacing) * 4);

  // хвостовая колонка каскада: знак прижат к правому краю контейнера
  @include from-lg {
    grid-column: 30 / 31;
    grid-row: 3;
    margin-bottom: 0;
  }
}

.region-sign {
  width: calc(var(--spacing) * 20);
  height: auto;
  align-self: center;
}

.region-text {
  color: var(--color-ink-muted);
  font-size: var(--text-small);
  font-weight: 300;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  writing-mode: vertical-rl;

  @include from-lg {
    font-size: var(--text-caption);
  }
}
</style>
