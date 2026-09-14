<script setup lang="ts">
// Шапка редизайна — геометрия из hero-фрейма макета (9156:6212):
// высота полосы ~68px, меню 16px с разделителями 1×30px (по 20px от текста),
// иконки мессенджеров 24px, телефон 24px, лого-строка ~20px высотой.
// theme=overlay — прозрачная поверх тёмного hero, theme=solid — на белом.
withDefaults(defineProps<{ theme?: 'overlay' | 'solid' }>(), { theme: 'overlay' })

const { data: contacts } = useContacts()
const menuOpen = ref(false)

// «Компания» появится отдельной страницей на Этапе 5 — пока якорь главной
const menu = [
  { label: 'Продукция', to: '/nasha-produkcziya/' },
  { label: 'Услуги', to: '/uslugi/' },
  { label: 'Компания', to: '/#infra' },
  { label: 'Контакты', to: '/#dialog' },
]
</script>

<template>
  <header class="header" :class="theme">
    <div class="container bar">
      <NuxtLink to="/" aria-label="МируМир — на главную" class="logo-link">
        <img
          v-if="theme === 'overlay'" src="/design/logo-header-white.svg" alt=""
          aria-hidden="true" width="180" height="19" class="logo"
        >
        <img
          v-else src="/design/logo-full.svg" alt="" aria-hidden="true"
          width="426" height="281" class="logo-solid"
        >
      </NuxtLink>

      <nav aria-label="Основное меню" class="menu">
        <template v-for="(item, i) in menu" :key="item.to">
          <span v-if="i > 0" aria-hidden="true" class="divider" />
          <NuxtLink :to="item.to" class="menu-link">{{ item.label }}</NuxtLink>
        </template>
      </nav>

      <div v-if="contacts" class="contacts">
        <a
          :href="contacts.whatsapp" target="_blank" rel="noopener"
          aria-label="Написать в WhatsApp" class="icon-link"
        >
          <IconWhatsapp width="24" height="24" />
        </a>
        <a
          :href="contacts.telegram" target="_blank" rel="noopener"
          aria-label="Написать в Telegram" class="icon-link"
        >
          <IconTelegram width="24" height="24" />
        </a>
        <span aria-hidden="true" class="divider" />
        <a :href="`tel:${contacts.phone.tel}`" class="phone">
          <IconPhone width="24" height="24" />
          {{ contacts.phone.display }}
        </a>
      </div>

      <button
        type="button" class="burger" :aria-expanded="menuOpen"
        aria-label="Открыть меню" @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>

      <!-- на мобиле телефон — второй строкой шапки, как в макете (фрейм 10390:22383) -->
      <a v-if="contacts" :href="`tel:${contacts.phone.tel}`" class="phone-mobile">
        <IconPhone width="18" height="18" />
        {{ contacts.phone.display }}
      </a>
    </div>

    <nav v-if="menuOpen" aria-label="Мобильное меню" class="mobile-menu">
      <div class="container mobile-menu-list">
        <NuxtLink
          v-for="item in menu" :key="item.to" :to="item.to"
          class="mobile-link" @click="menuOpen = false"
        >{{ item.label }}</NuxtLink>
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

    .divider {
      background: color-mix(in srgb, var(--color-paper) 50%, transparent);
    }
  }

  &.solid {
    position: relative;
    z-index: 50;
    background: var(--color-paper);
    color: var(--color-ink);
    border-bottom: 1px solid var(--color-stone);

    .divider {
      background: var(--color-line);
    }
  }
}

// мобильная шапка макета (фрейм 10390:22383) — две строки:
// лого + бургер (лого ~18px), ниже телефон 18px с иконкой 18px
.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  row-gap: calc(var(--spacing) * 2.5);
  padding-block: calc(var(--spacing) * 7) calc(var(--spacing) * 3.5);

  @include from-lg {
    flex-wrap: nowrap;
    gap: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 17); // ~68px, как полоса контента макета
    padding-block: 0;
  }
}

.logo-link {
  flex-shrink: 0;
  display: block;
}

.logo {
  height: calc(var(--spacing) * 4.5); // мобильная лого-строка макета ~17.6px

  @include from-lg {
    height: calc(var(--spacing) * 5); // десктопная ~19px
  }

  width: auto;
}

.phone-mobile {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  gap: calc(var(--spacing) * 1.75); // 7px до текста, как в макете
  font-size: var(--text-body); // 18px
  line-height: 1;

  @include from-lg {
    display: none;
  }
}

.logo-solid {
  height: calc(var(--spacing) * 12);
  width: auto;
}

.menu {
  display: none;

  @include from-lg {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 5); // текст—20px—разделитель—20px—текст
  }
}

.divider {
  width: 1px;
  height: calc(var(--spacing) * 7.5); // 30px, как в макете
  flex-shrink: 0;
}

.menu-link {
  @include text-body-sm; // 16px / 1.6 — размер меню макета
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
    gap: calc(var(--spacing) * 2.5); // иконки в макете через 10px
  }
}

.contacts .divider {
  margin-inline: calc(var(--spacing) * 2.5) calc(var(--spacing) * 5);
}

.icon-link {
  display: block;
  transition: opacity 0.2s;

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }
}

.phone {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 1.5);
  font-size: var(--text-lead); // телефон в макете 24px
  line-height: 1;
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
