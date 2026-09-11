<script setup lang="ts">
// Заглушка формы заявки на копийных страницах: сама форма — Этап 1.
const { data: contacts } = useContacts()
</script>

<template>
  <section v-if="contacts" id="form" class="stub">
    <div class="container inner">
      <h2 class="title">{{ contacts.formNote }}</h2>
      <div class="actions">
        <a :href="`tel:${contacts.phone.tel}`" class="action primary">{{ contacts.phone.display }}</a>
        <a :href="contacts.whatsapp" target="_blank" rel="noopener" class="action">WhatsApp</a>
        <a :href="contacts.telegram" target="_blank" rel="noopener" class="action">Telegram</a>
      </div>
      <p class="note">
        Позвоните или напишите нам — консультант ответит на вопросы по материалам и доставке.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stub {
  background: var(--color-brand);
  color: var(--color-paper);
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--spacing) * 6);
  padding-block: calc(var(--spacing) * 14);
  text-align: center;
}

.title {
  @include text-h3;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 4);
}

.action {
  padding: calc(var(--spacing) * 3) calc(var(--spacing) * 8);
  border: 1px solid var(--color-paper);
  border-radius: var(--radius-pill);
  font-weight: 600;

  &:hover,
  &:focus-visible {
    background: var(--color-brand-deep);
  }

  &.primary {
    background: var(--color-paper);
    color: var(--color-brand-deep);

    &:hover,
    &:focus-visible {
      background: var(--color-stone);
    }
  }
}

.note {
  @include text-caption;
  color: color-mix(in srgb, var(--color-paper) 80%, transparent);
}
</style>
