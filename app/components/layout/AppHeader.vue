<script setup lang="ts">
const { data: contacts } = useContacts()
const menuOpen = ref(false)

const menu = [
  { label: 'Наша продукция', to: '/nasha-produkcziya/' },
  { label: 'О нас', to: '/#o-nas' },
  { label: 'Услуги', to: '/#uslugi' },
  { label: 'Плюсы', to: '/#plusy' },
  { label: 'Цены', to: '/#price' },
  { label: 'Контакты', to: '/#contacts' },
]
</script>

<template>
  <header class="bg-paper shadow-card sticky top-0 z-50">
    <div class="container-page flex items-center justify-between gap-6 py-3">
      <NuxtLink to="/" aria-label="МируМир — на главную" class="shrink-0">
        <img src="/legacy/media/mirymir_logo_2.svg" alt="МируМир" width="82" height="54" class="h-14 w-auto">
      </NuxtLink>

      <nav aria-label="Основное меню" class="hidden lg:flex items-center gap-6">
        <NuxtLink
          v-for="item in menu" :key="item.to" :to="item.to"
          class="text-caption font-medium uppercase tracking-wide text-ink hocus:text-brand"
        >{{ item.label }}</NuxtLink>
        <a v-if="contacts" :href="`tel:${contacts.phone.tel}`" class="text-caption font-semibold text-brand hocus:text-brand-dark">
          {{ contacts.phone.display }}
        </a>
      </nav>

      <button
        type="button" class="lg:hidden p-2 text-ink" :aria-expanded="menuOpen"
        aria-label="Открыть меню" @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true" class="block w-6 border-t-2 border-ink" />
        <span aria-hidden="true" class="mt-1.5 block w-6 border-t-2 border-ink" />
        <span aria-hidden="true" class="mt-1.5 block w-6 border-t-2 border-ink" />
      </button>
    </div>

    <nav v-if="menuOpen" aria-label="Мобильное меню" class="lg:hidden border-t border-stone bg-paper">
      <div class="container-page flex flex-col py-2">
        <NuxtLink
          v-for="item in menu" :key="item.to" :to="item.to"
          class="py-3 text-body font-medium text-ink hocus:text-brand"
          @click="menuOpen = false"
        >{{ item.label }}</NuxtLink>
        <a v-if="contacts" :href="`tel:${contacts.phone.tel}`" class="py-3 font-semibold text-brand">
          {{ contacts.phone.display }}
        </a>
      </div>
    </nav>
  </header>
</template>
