<script setup lang="ts">
// Витрина дизайн-системы вместо Storybook (Этап 2). Не индексируется.
definePageMeta({ layout: 'redesign', headerTheme: 'solid' })

useSeoMeta({ title: 'Kitchen sink — дизайн-система', robots: 'noindex, nofollow' })

// классы статические: заодно проверяем, что каждый цвет реально компилируется
const colors = [
  { name: 'ink', cls: 'bg-ink' },
  { name: 'ink-strong', cls: 'bg-ink-strong' },
  { name: 'ink-muted', cls: 'bg-ink-muted' },
  { name: 'line', cls: 'bg-line' },
  { name: 'paper', cls: 'bg-paper' },
  { name: 'stone', cls: 'bg-stone' },
  { name: 'brand', cls: 'bg-brand' },
  { name: 'brand-mid', cls: 'bg-brand-mid' },
  { name: 'brand-deep', cls: 'bg-brand-deep' },
  { name: 'accent', cls: 'bg-accent' },
  { name: 'accent-mid', cls: 'bg-accent-mid' },
  { name: 'accent-deep', cls: 'bg-accent-deep' },
  { name: 'logo-red', cls: 'bg-logo-red' },
]
// классы перечислены статически — Tailwind не видит интерполяций
const textStyles = [
  { name: 'display', cls: 'text-display' },
  { name: 'h1', cls: 'text-h1' },
  { name: 'h2', cls: 'text-h2' },
  { name: 'h3', cls: 'text-h3' },
  { name: 'card', cls: 'text-card' },
  { name: 'lead', cls: 'text-lead' },
  { name: 'body', cls: 'text-body' },
  { name: 'body-sm', cls: 'text-body-sm' },
  { name: 'button', cls: 'text-button uppercase' },
  { name: 'caption', cls: 'text-caption' },
  { name: 'small', cls: 'text-small' },
]

const name = ref('')
const phone = ref('')
const agree = ref(false)
</script>

<template>
  <main class="container-page flex flex-col gap-16 py-16">
    <h1 class="text-h1">Kitchen sink</h1>

    <section>
      <h2 class="text-h3 mb-6">Палитра</h2>
      <div class="flex flex-wrap gap-4">
        <div v-for="c in colors" :key="c.name" class="flex flex-col items-center gap-2">
          <div class="size-20 rounded-card border border-stone" :class="c.cls" />
          <code class="text-small">{{ c.name }}</code>
        </div>
      </div>
      <div class="mt-6 flex gap-4">
        <div class="bg-section-gradient h-20 flex-1 rounded-card" />
        <div class="bg-button-gradient h-20 flex-1 rounded-card" />
      </div>
    </section>

    <section>
      <h2 class="text-h3 mb-6">Типографика</h2>
      <div class="flex flex-col gap-4">
        <p v-for="t in textStyles" :key="t.name" :class="t.cls">
          {{ t.name }} — Добыча, хранение и отгрузка
        </p>
      </div>
    </section>

    <section>
      <h2 class="text-h3 mb-6">Кнопки</h2>
      <div class="flex flex-wrap items-center gap-6">
        <UiButton variant="outline-dark">Вся продукция</UiButton>
        <UiButton variant="gradient">Отправить заявку</UiButton>
        <UiButton variant="glass" size="lg">Получить прайс</UiButton>
        <UiArrowButton label="Вперёд" />
        <UiArrowButton label="Назад" direction="left" />
      </div>
      <div class="bg-section-gradient mt-6 flex flex-wrap items-center gap-6 rounded-card p-8">
        <UiButton variant="outline-light">Все события</UiButton>
        <UiArrowButton label="Вперёд" variant="outline-light" />
      </div>
    </section>

    <section>
      <h2 class="text-h3 mb-6">Форма</h2>
      <div class="bg-section-gradient flex max-w-md flex-col gap-4 rounded-card p-8">
        <UiInput v-model="name" name="name" label="Имя" autocomplete="name" />
        <UiInput v-model="phone" name="phone" label="Телефон" type="tel" autocomplete="tel" />
        <UiButton variant="gradient" type="submit">Отправить заявку</UiButton>
        <UiCheckbox v-model="agree" name="consent" required>
          Согласен(на) с политикой обработки персональных данных
        </UiCheckbox>
      </div>
    </section>

    <section>
      <h2 class="text-h3 mb-6">Ассеты</h2>
      <div class="flex flex-wrap items-end gap-8 rounded-card border border-stone p-8">
        <img src="/design/logo-full.svg" alt="Лого полное" class="h-24">
        <div class="bg-brand rounded-card p-4"><img src="/design/logo-sign-white.svg" alt="Знак белый" class="h-16"></div>
        <img src="/design/sign-tatarstan.svg" alt="Знак Татарстана" class="h-12">
        <img src="/design/pattern-dialog.svg" alt="Узор" class="h-24">
      </div>
    </section>
  </main>
</template>
