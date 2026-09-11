<script setup lang="ts">
// Шапка редизайна (макет «NY 90»): лого, меню, мессенджеры, телефон.
// theme=overlay — прозрачная поверх тёмного hero (главная),
// theme=solid — белый фон, тёмный текст (внутренние страницы).
const props = withDefaults(defineProps<{ theme?: 'overlay' | 'solid' }>(), { theme: 'overlay' })

const { data: contacts } = useContacts()
const menuOpen = ref(false)

// «Услуги» и «Компания» появятся отдельными страницами на Этапе 5 —
// до тех пор пункты ведут на смысловые якоря главной
const menu = [
  { label: 'Продукция', to: '/nasha-produkcziya/' },
  { label: 'Компания', to: '/#infra' },
  { label: 'Контакты', to: '/#dialog' },
]

const light = computed(() => props.theme === 'overlay')
</script>

<template>
  <header
    :class="light
      ? 'absolute inset-x-0 top-0 z-50 text-paper'
      : 'relative z-50 bg-paper text-ink border-b border-stone'"
  >
    <div class="container-page flex h-20 items-center justify-between gap-8">
      <NuxtLink to="/" aria-label="МируМир — на главную" class="flex items-center gap-3 shrink-0">
        <img
          v-if="light" src="/design/logo-sign-white.svg" alt="" aria-hidden="true"
          width="240" height="190" class="h-9 w-auto"
        >
        <img
          v-else src="/design/logo-full.svg" alt="" aria-hidden="true"
          width="426" height="281" class="h-12 w-auto"
        >
        <span v-if="light" class="text-card font-medium tracking-widest uppercase">Мирумир</span>
      </NuxtLink>

      <nav aria-label="Основное меню" class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in menu" :key="item.to" :to="item.to"
          class="px-4 py-2 text-body-sm transition-opacity hocus:opacity-70"
        >{{ item.label }}</NuxtLink>
      </nav>

      <div class="hidden items-center gap-6 lg:flex">
        <div v-if="contacts" class="flex items-center gap-3">
          <a
            :href="contacts.whatsapp" target="_blank" rel="noopener" aria-label="Написать в WhatsApp"
            class="transition-opacity hocus:opacity-70"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3 0-.2 0-.3-.1-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3a2.6 2.6 0 0 0-.8 2c0 1.1.8 2.2 1 2.4.1.2 1.7 2.6 4.1 3.6.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z" /></svg>
          </a>
          <a
            :href="contacts.telegram" target="_blank" rel="noopener" aria-label="Написать в Telegram"
            class="transition-opacity hocus:opacity-70"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6 18.9 19c-.2 1-.8 1.2-1.6.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-.9.5l.3-4.6L18.4 7c.4-.3-.1-.5-.6-.2L7.5 13.3l-4.4-1.4c-1-.3-1-1 .2-1.4l17.3-6.7c.8-.3 1.5.2 1.3.8Z" /></svg>
          </a>
        </div>
        <a
          v-if="contacts" :href="`tel:${contacts.phone.tel}`"
          class="flex items-center gap-2 text-body transition-opacity hocus:opacity-70"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" /></svg>
          {{ contacts.phone.display }}
        </a>
      </div>

      <button
        type="button" class="p-2 lg:hidden" :aria-expanded="menuOpen"
        aria-label="Открыть меню" @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true" class="block w-6 border-t-2 border-current" />
        <span aria-hidden="true" class="mt-1.5 block w-6 border-t-2 border-current" />
        <span aria-hidden="true" class="mt-1.5 block w-6 border-t-2 border-current" />
      </button>
    </div>

    <nav
      v-if="menuOpen" aria-label="Мобильное меню"
      class="bg-brand text-paper lg:hidden"
    >
      <div class="container-page flex flex-col py-4">
        <NuxtLink
          v-for="item in menu" :key="item.to" :to="item.to"
          class="py-3 text-body" @click="menuOpen = false"
        >{{ item.label }}</NuxtLink>
        <a v-if="contacts" :href="`tel:${contacts.phone.tel}`" class="py-3 text-body font-medium">
          {{ contacts.phone.display }}
        </a>
      </div>
    </nav>
  </header>
</template>
