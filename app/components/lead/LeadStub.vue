<script setup lang="ts">
// Заглушка формы заявки: сама форма — Этап 1 (нужны Postgres и Telegram-бот).
const { data: contacts } = useContacts()
</script>

<template>
  <section v-if="contacts" id="form" class="bg-brand text-paper">
    <div class="container-page flex flex-col items-center gap-6 py-14 text-center">
      <h2 class="text-h2">{{ contacts.formNote }}</h2>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a
          :href="`tel:${contacts.phone.tel}`"
          class="rounded-pill bg-paper px-8 py-3 font-semibold text-brand-dark shadow-card hocus:bg-stone"
        >{{ contacts.phone.display }}</a>
        <a
          :href="contacts.whatsapp" target="_blank" rel="noopener"
          class="rounded-pill border border-paper px-8 py-3 font-semibold text-paper hocus:bg-brand-dark"
        >WhatsApp</a>
        <a
          :href="contacts.telegram" target="_blank" rel="noopener"
          class="rounded-pill border border-paper px-8 py-3 font-semibold text-paper hocus:bg-brand-dark"
        >Telegram</a>
      </div>
      <p class="text-caption text-paper/80">
        Позвоните или напишите нам — консультант ответит на вопросы по материалам и доставке.
      </p>
    </div>
  </section>
</template>
