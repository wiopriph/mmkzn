<script setup lang="ts">
// Шапка редизайна (макет «NY 90»): лого, меню, мессенджеры, телефон.
// theme=overlay — прозрачная поверх тёмного hero (главная),
// theme=solid — белый фон, тёмный текст (внутренние страницы).
withDefaults(defineProps<{ theme?: 'overlay' | 'solid' }>(), { theme: 'overlay' })

const { data: contacts } = useContacts()
const menuOpen = ref(false)

// «Услуги» и «Компания» появятся отдельными страницами на Этапе 5 —
// до тех пор пункты ведут на смысловые якоря главной
const menu = [
  { label: 'Продукция', to: '/nasha-produkcziya/' },
  { label: 'Компания', to: '/#infra' },
  { label: 'Контакты', to: '/#dialog' },
]
</script>

<template>
  <header class="header" :class="theme">
    <div class="container bar">
      <NuxtLink to="/" aria-label="МируМир — на главную" class="logo">
        <img
          v-if="theme === 'overlay'" src="/design/logo-sign-white.svg" alt="" aria-hidden="true"
          width="240" height="190" class="logo-sign"
        >
        <img
          v-else src="/design/logo-full.svg" alt="" aria-hidden="true"
          width="426" height="281" class="logo-full"
        >
        <span v-if="theme === 'overlay'" class="logo-word">Мирумир</span>
      </NuxtLink>

      <nav aria-label="Основное меню" class="menu">
        <NuxtLink v-for="item in menu" :key="item.to" :to="item.to" class="menu-link">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="contacts">
        <template v-if="contacts">
          <a
            :href="contacts.whatsapp" target="_blank" rel="noopener"
            aria-label="Написать в WhatsApp" class="icon-link"
          >
            <IconWhatsapp />
          </a>
          <a
            :href="contacts.telegram" target="_blank" rel="noopener"
            aria-label="Написать в Telegram" class="icon-link"
          >
            <IconTelegram />
          </a>
          <a :href="`tel:${contacts.phone.tel}`" class="phone">
            <IconPhone />
            {{ contacts.phone.display }}
          </a>
        </template>
      </div>

      <button
        type="button" class="burger" :aria-expanded="menuOpen"
        aria-label="Открыть меню" @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>
    </div>

    <nav v-if="menuOpen" aria-label="Мобильное меню" class="mobile-menu">
      <div class="container mobile-menu-list">
        <NuxtLink
          v-for="item in menu" :key="item.to" :to="item.to"
          class="mobile-link" @click="menuOpen = false"
        >{{ item.label }}</NuxtLink>
        <a v-if="contacts" :href="`tel:${contacts.phone.tel}`" class="mobile-link mobile-phone">
          {{ contacts.phone.display }}
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  &.overlay {
    position: absolute;
    inset-inline: 0;
    top: 0;
    z-index: 50;
    color: var(--color-paper);
  }

  &.solid {
    position: relative;
    z-index: 50;
    background: var(--color-paper);
    color: var(--color-ink);
    border-bottom: 1px solid var(--color-stone);
  }
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 8);
  height: calc(var(--spacing) * 20);
}

.logo {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 3);
  flex-shrink: 0;
}

.logo-sign {
  height: calc(var(--spacing) * 9);
  width: auto;
}

.logo-full {
  height: calc(var(--spacing) * 12);
  width: auto;
}

.logo-word {
  @include text-card;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.menu {
  display: none;

  @include from-lg {
    display: flex;
    align-items: center;
    gap: var(--spacing);
  }
}

.menu-link {
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  @include text-body-sm;
  transition: opacity 0.2s;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }
}

.contacts {
  display: none;

  @include from-lg {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }
}

.icon-link {
  transition: opacity 0.2s;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }
}

.phone {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  @include text-body;
  transition: opacity 0.2s;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }
}

.burger {
  padding: calc(var(--spacing) * 2);

  span {
    display: block;
    width: calc(var(--spacing) * 6);
    border-top: 2px solid currentcolor;

    + span {
      margin-top: calc(var(--spacing) * 1.5);
    }
  }

  @include from-lg {
    display: none;
  }
}

.mobile-menu {
  background: var(--color-brand);
  color: var(--color-paper);

  @include from-lg {
    display: none;
  }
}

.mobile-menu-list {
  display: flex;
  flex-direction: column;
  padding-block: calc(var(--spacing) * 4);
}

.mobile-link {
  padding-block: calc(var(--spacing) * 3);
  @include text-body;
}

.mobile-phone {
  font-weight: 500;
}
</style>
