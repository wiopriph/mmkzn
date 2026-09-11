<script setup lang="ts">
defineProps<{
  title: string
  text: string
  nameLabel: string
  phoneLabel: string
  submit: string
  consent: string
}>()

const { data: contacts } = useContacts()
const route = useRoute()
const form = useLeadForm()

function onSubmit() {
  form.submit(route.path)
}
</script>

<template>
  <section id="dialog" class="dialog">
    <img src="/design/pattern-dialog.svg" alt="" aria-hidden="true" class="pattern">
    <div class="container grid">
      <div class="left">
        <h2 class="title">{{ title }}</h2>
        <div v-if="contacts" class="contacts">
          <a :href="`tel:${contacts.phone.tel}`" class="phone">{{ contacts.phone.display }}</a>
          <div class="socials">
            <a :href="contacts.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp" class="social">
              <IconWhatsapp />
            </a>
            <a :href="contacts.telegram" target="_blank" rel="noopener" aria-label="Telegram" class="social">
              <IconTelegram />
            </a>
          </div>
        </div>
      </div>

      <div class="right">
        <p class="text">{{ text }}</p>

        <form v-if="form.state.value !== 'done'" class="form" @submit.prevent="onSubmit">
          <UiInput v-model="form.name.value" name="name" :label="nameLabel" required autocomplete="name" />
          <UiInput v-model="form.phone.value" name="phone" :label="phoneLabel" type="tel" required autocomplete="tel" />
          <UiButton variant="gradient" type="submit" :aria-busy="form.state.value === 'sending'">
            {{ form.state.value === 'sending' ? 'Отправляем…' : submit }}
          </UiButton>
          <UiCheckbox v-model="form.consent.value" name="consent" required>
            <NuxtLink to="/politika/" class="consent-link">{{ consent }}</NuxtLink>
          </UiCheckbox>

          <p v-if="form.state.value === 'unavailable' && contacts" role="status" class="status">
            Онлайн-заявки заработают после запуска нового сайта. Пока позвоните нам:
            <a :href="`tel:${contacts.phone.tel}`" class="status-link">{{ contacts.phone.display }}</a>
            — или напишите в мессенджеры слева.
          </p>
          <p v-else-if="form.state.value === 'error'" role="status" class="status">
            Не получилось отправить заявку. Позвоните нам или напишите в мессенджер —
            ответим так же быстро.
          </p>
        </form>

        <p v-else role="status" class="thanks">
          Спасибо! Заявка получена — перезвоним в ближайшее время.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dialog {
  position: relative;
  overflow: hidden;
  background-image: var(--gradient-section);
  color: var(--color-paper);
}

.pattern {
  position: absolute;
  right: 0;
  top: 0;
  height: 75%;
  transform: translate(25%, -20%);
  opacity: 0.9;
}

.grid {
  position: relative;
  display: grid;
  gap: calc(var(--spacing) * 12);
  padding-block: calc(var(--spacing) * 20);

  @include from-md {
    grid-template-columns: 1fr 1fr;
    padding-block: calc(var(--spacing) * 28);
  }
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(var(--spacing) * 12);
}

.title {
  @include text-h3;

  @include from-md {
    @include text-h2;
  }
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 5);
}

.phone {
  @include text-h3;

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
}

.socials {
  display: flex;
  gap: calc(var(--spacing) * 4);
}

.social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--spacing) * 12);
  height: calc(var(--spacing) * 12);
  border-radius: var(--radius-pill);
  background: var(--color-paper);
  color: var(--color-brand);

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
}

.right {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 8);
}

.text {
  max-width: 32rem;
  @include text-body-sm;
}

.form {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  max-width: 28rem;
}

.consent-link {
  text-decoration: underline;

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
}

.status {
  @include text-body-sm;
}

.status-link {
  text-decoration: underline;
}

.thanks {
  max-width: 28rem;
  @include text-lead;
}
</style>
