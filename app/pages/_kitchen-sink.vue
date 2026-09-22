<script setup lang="ts">
// Витрина дизайн-системы вместо Storybook (Этап 2). Не индексируется.
definePageMeta({ headerTheme: 'solid' })

useSeoMeta({ title: 'Kitchen sink — дизайн-система', robots: 'noindex, nofollow' })

const colors = [
  'ink', 'ink-strong', 'ink-muted', 'line', 'paper', 'stone',
  'brand', 'brand-mid', 'brand-deep', 'accent', 'accent-mid', 'accent-deep', 'logo-red',
]

const textStyles = ['display', 'h1', 'h2', 'h3', 'card', 'lead', 'body', 'body-sm', 'button', 'caption', 'small']

const name = ref('')
const phone = ref('')
const agree = ref(false)
</script>

<template>
  <main class="container sink">
    <h1 class="h1">Kitchen sink</h1>

    <section>
      <h2 class="section-title">Палитра</h2>
      <div class="swatches">
        <div v-for="c in colors" :key="c" class="swatch">
          <div class="chip" :style="{ background: `var(--color-${c})` }" />
          <code class="chip-name">{{ c }}</code>
        </div>
      </div>
      <div class="gradients">
        <div class="grad" style="background-image: var(--gradient-section)" />
        <div class="grad" style="background-image: var(--gradient-button)" />
      </div>
    </section>

    <section>
      <h2 class="section-title">Типографика</h2>
      <div class="type-list">
        <p v-for="t in textStyles" :key="t" class="type-sample" :class="`t-${t}`">
          {{ t }} — Добыча, хранение и отгрузка
        </p>
      </div>
    </section>

    <section>
      <h2 class="section-title">Кнопки</h2>
      <div class="row">
        <UiButton variant="outline-dark">Вся продукция</UiButton>
        <UiButton variant="gradient">Отправить заявку</UiButton>
        <UiButton variant="glass" size="lg">Получить прайс</UiButton>
        <UiArrowButton label="Вперёд" />
        <UiArrowButton label="Назад" direction="left" />
      </div>
      <div class="row dark">
        <UiButton variant="outline-light">Все события</UiButton>
        <UiArrowButton label="Вперёд" variant="outline-light" />
      </div>
    </section>

    <section>
      <h2 class="section-title">Форма</h2>
      <div class="form dark">
        <UiInput v-model="name" name="name" label="Имя" autocomplete="name" />
        <UiInput v-model="phone" name="phone" label="Телефон" type="tel" autocomplete="tel" />
        <UiButton variant="gradient" type="submit">Отправить заявку</UiButton>
        <UiCheckbox v-model="agree" name="consent" required>
          Согласен(на) с политикой обработки персональных данных
        </UiCheckbox>
      </div>
    </section>

    <section>
      <h2 class="section-title">Ассеты</h2>
      <div class="assets">
        <img src="/design/logo-full.svg" alt="Лого полное" class="asset-lg">
        <div class="asset-dark"><img src="/design/logo-sign-white.svg" alt="Знак белый" class="asset-md"></div>
        <img src="/design/sign-tatarstan.svg" alt="Знак Татарстана" class="asset-sm">
        <img src="/design/pattern-dialog.svg" alt="Узор" class="asset-lg">
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.sink {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 16);
  padding-block: calc(var(--spacing) * 16);
}

.h1 {
  @include text-h1;
}

.section-title {
  margin-bottom: calc(var(--spacing) * 6);
  @include text-h3;
}

.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 4);
}

.swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--spacing) * 2);
}

.chip {
  width: calc(var(--spacing) * 20);
  height: calc(var(--spacing) * 20);
  border: 1px solid var(--color-stone);
  border-radius: var(--radius-card);
}

.chip-name {
  @include text-small;
}

.gradients {
  display: flex;
  gap: calc(var(--spacing) * 4);
  margin-top: calc(var(--spacing) * 6);
}

.grad {
  flex: 1;
  height: calc(var(--spacing) * 20);
  border-radius: var(--radius-card);
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  overflow-x: auto; // display 96px шире мобильного экрана — скроллим внутри блока
}

.t-display { @include text-display; }
.t-h1 { @include text-h1; }
.t-h2 { @include text-h2; }
.t-h3 { @include text-h3; }
.t-card { @include text-card; }
.t-lead { @include text-lead; }
.t-body { @include text-body; }
.t-body-sm { @include text-body-sm; }
.t-button { @include text-button; }
.t-caption { @include text-caption; }
.t-small { @include text-small; }

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: calc(var(--spacing) * 6);

  &.dark {
    margin-top: calc(var(--spacing) * 6);
    padding: calc(var(--spacing) * 8);
    border-radius: var(--radius-card);
  }
}

.dark {
  background-image: var(--gradient-section);
}

.form {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  max-width: 28rem;
  padding: calc(var(--spacing) * 8);
  border-radius: var(--radius-card);
}

.assets {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: calc(var(--spacing) * 8);
  padding: calc(var(--spacing) * 8);
  border: 1px solid var(--color-stone);
  border-radius: var(--radius-card);
}

.asset-lg { height: calc(var(--spacing) * 24); }
.asset-md { height: calc(var(--spacing) * 16); }
.asset-sm { height: calc(var(--spacing) * 12); }

.asset-dark {
  padding: calc(var(--spacing) * 4);
  border-radius: var(--radius-card);
  background: var(--color-brand);
}
</style>
