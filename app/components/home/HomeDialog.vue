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
  <section id="dialog" class="bg-section-gradient relative overflow-hidden text-paper">
    <img
      src="/design/pattern-dialog.svg" alt="" aria-hidden="true"
      class="absolute right-0 top-0 h-3/4 translate-x-1/4 -translate-y-1/5 opacity-90"
    >
    <div class="container-page relative grid gap-12 py-20 md:grid-cols-2 md:py-28">
      <div class="flex flex-col justify-between gap-12">
        <div>
          <h2 class="text-h3 md:text-h2">{{ title }}</h2>
        </div>
        <div v-if="contacts" class="flex flex-col gap-5">
          <a :href="`tel:${contacts.phone.tel}`" class="text-h3 hocus:opacity-80">{{ contacts.phone.display }}</a>
          <div class="flex gap-4">
            <a
              :href="contacts.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"
              class="flex size-12 items-center justify-center rounded-pill bg-paper text-brand hocus:opacity-80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3 0-.2 0-.3-.1-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.6 2.6 0 0 0-.8 2c0 1.1.8 2.2 1 2.4.1.2 1.7 2.6 4.1 3.6.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z" /></svg>
            </a>
            <a
              :href="contacts.telegram" target="_blank" rel="noopener" aria-label="Telegram"
              class="flex size-12 items-center justify-center rounded-pill bg-paper text-brand hocus:opacity-80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6 18.9 19c-.2 1-.8 1.2-1.6.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.6L18.4 7c.4-.3-.1-.5-.6-.2L7.5 13.3l-4.4-1.4c-1-.3-1-1 .2-1.4l17.3-6.7c.8-.3 1.5.2 1.3.8Z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8">
        <p class="max-w-lg text-body-sm">{{ text }}</p>

        <form v-if="form.state.value !== 'done'" class="flex max-w-md flex-col gap-4" @submit.prevent="onSubmit">
          <UiInput v-model="form.name.value" name="name" :label="nameLabel" required autocomplete="name" />
          <UiInput v-model="form.phone.value" name="phone" :label="phoneLabel" type="tel" required autocomplete="tel" />
          <UiButton variant="gradient" type="submit" :aria-busy="form.state.value === 'sending'">
            {{ form.state.value === 'sending' ? 'Отправляем…' : submit }}
          </UiButton>
          <UiCheckbox v-model="form.consent.value" name="consent" required>
            <NuxtLink to="/politika/" class="underline hocus:opacity-80">{{ consent }}</NuxtLink>
          </UiCheckbox>

          <p v-if="form.state.value === 'unavailable' && contacts" role="status" class="text-body-sm">
            Онлайн-заявки заработают после запуска нового сайта. Пока позвоните нам:
            <a :href="`tel:${contacts.phone.tel}`" class="underline">{{ contacts.phone.display }}</a>
            — или напишите в мессенджеры слева.
          </p>
          <p v-else-if="form.state.value === 'error'" role="status" class="text-body-sm">
            Не получилось отправить заявку. Позвоните нам или напишите в мессенджер —
            ответим так же быстро.
          </p>
        </form>

        <p v-else role="status" class="max-w-md text-lead">
          Спасибо! Заявка получена — перезвоним в ближайшее время.
        </p>
      </div>
    </div>
  </section>
</template>
