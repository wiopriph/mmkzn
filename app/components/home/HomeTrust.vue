<script setup lang="ts">
// «Нам доверяют объёмы» — фреймы 10355:13030 (1282×700) и 10406:3932 (390×1100).
// Десктоп: лого 239×189 слева (x40), заголовок 72/76.3 и текст 16/24 с ⅓ (x427),
// карточки 259×307 с зазором 19, контент карточек прижат к низу, числа 64/64.
// Мобилка: лого 130×103 по центру, заголовок 60/60, текст 12/19.2,
// карточки 366×160 стеком с зазором 10.
// Узор pattern-dialog слева-снизу: десктоп x-545 y280 w1475, мобилка x-311 y853 w701.
interface Fact { value: string; label: string }
defineProps<{
  title: string
  textBefore: string
  textLink: string
  textLinkTo: string
  textAfter: string
  facts: Fact[]
}>()
</script>

<template>
  <section class="trust">
    <img src="/design/pattern-dialog.svg" alt="" aria-hidden="true" class="pattern pattern-mob">
    <img src="/design/pattern-trust.svg" alt="" aria-hidden="true" class="pattern pattern-desk">

    <div class="container grid">
      <img src="/design/logo-sign-white.svg" alt="" aria-hidden="true" width="240" height="190" class="sign">

      <div class="head">
        <h2 class="title">{{ title }}</h2>
        <p class="text">
          {{ textBefore }}
          <NuxtLink :to="textLinkTo" class="text-link">{{ textLink }}</NuxtLink>
          {{ textAfter }}
        </p>
      </div>

      <ul class="facts">
        <li v-for="(f, i) in facts" :key="f.label" class="fact">
          <IconArrow v-if="i === facts.length - 1" class="fact-arrow" />
          <p v-if="f.value" class="value">{{ f.value }}</p>
          <IconCheckCircle v-else class="check" />
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
}

// мобильный узор: два зигзага по моб. фрейму (x-311 y853 при 390×1100)
.pattern-mob {
  left: -80%;
  top: 77.5%;
  width: 180%;

  @include from-lg {
    display: none;
  }
}

// десктопный узор — готовый кроп из макета (нода 10355:13032, 930×420),
// прижат к левому нижнему углу секции
.pattern-desk {
  display: none;

  @include from-lg {
    display: block;
    left: 0;
    bottom: 0;
    width: 72.5%; // 930 / 1282
    height: auto;
  }
}

.grid {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-block: calc(var(--spacing) * 17); // моб.: лого y69, низ 68

  @include from-lg {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto;
    padding-block: calc(var(--spacing) * 11); // десктоп: контент y44, низ 43
  }
}

.sign {
  align-self: center; // моб.: лого по центру
  width: calc(var(--spacing) * 32.5); // 130×103
  height: auto;
  margin-bottom: calc(var(--spacing) * 7.5); // лого→заголовок 30px

  @include from-lg {
    grid-column: 1;
    grid-row: 1;
    align-self: start;
    justify-self: start;
    width: calc(var(--spacing) * 60); // 239×189
    margin-bottom: 0;
  }
}

.head {
  @include from-lg {
    grid-column: 2;
    grid-row: 1;
  }
}

.title {
  @include text-display-sm; // моб.: 60
  line-height: 1; // 60/60 в мобильном фрейме

  @include from-lg {
    @include text-h1; // десктоп: 72 / 76.3
    max-width: 43rem; // перенос «Нам доверяят / объёмы»
  }
}

.text {
  max-width: 22.875rem; // моб. 366
  margin-top: calc(var(--spacing) * 2.5); // заголовок→текст 10px

  @include text-small;
  line-height: 1.6; // моб.: 12 / 19.2

  @include from-lg {
    max-width: 33.5rem; // 537px
    margin-top: calc(var(--spacing) * 5); // десктоп: 20px
    @include text-body-sm;
    line-height: 1.5; // 16 / 24
  }
}

.text-link {
  text-decoration: underline;
  text-underline-offset: 0.2em;

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
}

.facts {
  display: grid;
  gap: calc(var(--spacing) * 2.5); // моб.: зазор 10
  margin-top: calc(var(--spacing) * 15); // моб.: текст→карточки 61px

  @include from-lg {
    grid-column: 2;
    grid-row: 2;
    grid-template-columns: repeat(3, 1fr);
    gap: calc(var(--spacing) * 4.75); // десктоп: 19px
    margin-top: calc(var(--spacing) * 15.75); // текст→карточки 63px
  }
}

.fact {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: calc(var(--spacing) * 40); // моб.: 160px
  padding: calc(var(--spacing) * 2.5);
  border: 1px solid color-mix(in srgb, var(--color-paper) 75%, transparent);

  @include from-lg {
    min-height: calc(var(--spacing) * 76.75); // 307px
    padding: calc(var(--spacing) * 5);
  }
}

.fact-arrow {
  display: none; // в мобильном фрейме стрелки нет

  @include from-lg {
    display: block;
    position: absolute;
    top: calc(var(--spacing) * 5);
    right: calc(var(--spacing) * 5);
  }
}

.value {
  font-size: 4rem; // 64/64 на обоих брейкпоинтах
  font-weight: 500;
  line-height: 1;
}

.check {
  margin-bottom: calc(var(--spacing) * 2.75);
}

.label {
  margin-top: calc(var(--spacing) * 2.5); // число→лейбл 10px
  @include text-small;
  line-height: 1.5; // моб.: 12 / 18

  @include from-lg {
    @include text-body-sm; // десктоп: 16 / 25.6
  }
}
</style>
