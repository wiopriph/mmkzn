<script setup lang="ts">
// Подвал редизайна: реквизиты слева, крупный лого по центру, меню и мессенджеры справа.
const { data: contacts } = useContacts()

const menu = [
  { label: 'Продукция', to: '/nasha-produkcziya/' },
  { label: 'Компания', to: '/#infra' },
  { label: 'Новости', to: '/#news' },
  { label: 'Контакты', to: '/#dialog' },
]
</script>

<template>
  <footer v-if="contacts" id="contacts" class="bg-paper text-ink">
    <div class="container-page grid gap-12 py-16 lg:grid-cols-[1fr_auto_1fr]">
      <div class="flex flex-col gap-4 text-body-sm">
        <p class="font-medium">{{ contacts.company }}</p>
        <p v-if="contacts.requisites" class="text-ink-muted">ИНН/ОГРН — {{ contacts.requisites }}</p>
        <p class="pl-6">{{ contacts.address }}</p>
        <div>
          <p class="text-ink-muted">Диспетчерская</p>
          <p class="flex flex-wrap gap-x-6 pl-6">
            <a :href="`tel:${contacts.phone.tel}`" class="hocus:text-brand">{{ contacts.phone.display }}</a>
            <a :href="`tel:${contacts.dispatcher.tel}`" class="hocus:text-brand">{{ contacts.dispatcher.display }}</a>
          </p>
        </div>
        <div>
          <p class="text-ink-muted">e-mail:</p>
          <a :href="`mailto:${contacts.email}`" class="pl-6 hocus:text-brand">{{ contacts.email }}</a>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <img src="/design/logo-full.svg" alt="МируМир" width="426" height="281" class="h-48 w-auto lg:h-56">
      </div>

      <nav aria-label="Меню в подвале" class="flex flex-col items-start gap-3 lg:items-end">
        <div class="mb-2 flex gap-4">
          <a
            :href="contacts.telegram" target="_blank" rel="noopener" aria-label="Telegram"
            class="text-ink transition-opacity hocus:opacity-60"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6 18.9 19c-.2 1-.8 1.2-1.6.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.6L18.4 7c.4-.3-.1-.5-.6-.2L7.5 13.3l-4.4-1.4c-1-.3-1-1 .2-1.4l17.3-6.7c.8-.3 1.5.2 1.3.8Z" /></svg>
          </a>
          <a
            :href="contacts.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"
            class="text-ink transition-opacity hocus:opacity-60"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3 0-.2 0-.3-.1-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.6 2.6 0 0 0-.8 2c0 1.1.8 2.2 1 2.4.1.2 1.7 2.6 4.1 3.6.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z" /></svg>
          </a>
        </div>
        <NuxtLink
          v-for="item in menu" :key="item.label" :to="item.to"
          class="text-body-sm hocus:text-brand"
        >{{ item.label }}</NuxtLink>
      </nav>
    </div>

    <div class="border-t border-stone">
      <div class="container-page flex flex-wrap items-center justify-between gap-4 py-6 text-body-sm">
        <NuxtLink to="/politika/" class="hocus:text-brand">Политика конфиденциальности</NuxtLink>
        <p class="text-ink-muted">©2014-2026</p>
      </div>
    </div>
  </footer>
</template>
