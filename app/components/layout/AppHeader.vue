<script setup lang="ts">
// Шапка копийных страниц (до их редизайна на Этапах 4-5).
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
  <header class="header">
    <div class="container bar">
      <NuxtLink to="/" aria-label="МируМир — на главную" class="logo-link">
        <img src="/legacy/media/mirymir_logo_2.svg" alt="МируМир" width="82" height="54" class="logo">
      </NuxtLink>

      <nav aria-label="Основное меню" class="menu">
        <NuxtLink v-for="item in menu" :key="item.to" :to="item.to" class="menu-link">
          {{ item.label }}
        </NuxtLink>
        <a v-if="contacts" :href="`tel:${contacts.phone.tel}`" class="phone">
          {{ contacts.phone.display }}
        </a>
      </nav>

      <button
        type="button" class="burger" :aria-expanded="menuOpen"
        aria-label="Открыть меню" @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>
    </div>

    <nav v-if="menuOpen" aria-label="Мобильное меню" class="mobile-menu">
      <div class="container mobile-list">
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
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-paper);
  border-bottom: 1px solid var(--color-stone);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 6);
  padding-block: calc(var(--spacing) * 3);
}

.logo-link {
  flex-shrink: 0;
}

.logo {
  height: calc(var(--spacing) * 14);
  width: auto;
}

.menu {
  display: none;

  @include from-lg {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 6);
  }
}

.menu-link {
  @include text-caption;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.03em;

  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }
}

.phone {
  @include text-caption;
  font-weight: 600;
  color: var(--color-brand);

  &:hover,
  &:focus-visible {
    color: var(--color-brand-deep);
  }
}

.burger {
  padding: calc(var(--spacing) * 2);

  span {
    display: block;
    width: calc(var(--spacing) * 6);
    border-top: 2px solid var(--color-ink);

    + span {
      margin-top: calc(var(--spacing) * 1.5);
    }
  }

  @include from-lg {
    display: none;
  }
}

.mobile-menu {
  border-top: 1px solid var(--color-stone);
  background: var(--color-paper);

  @include from-lg {
    display: none;
  }
}

.mobile-list {
  display: flex;
  flex-direction: column;
  padding-block: calc(var(--spacing) * 2);
}

.mobile-link {
  padding-block: calc(var(--spacing) * 3);
  @include text-body;
  font-weight: 500;

  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }
}

.mobile-phone {
  font-weight: 600;
  color: var(--color-brand);
}
</style>
