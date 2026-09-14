<script setup lang="ts">
// Подвал редизайна: реквизиты слева, крупный лого по центру, меню и мессенджеры справа.
const { data: contacts } = useContacts()

const menu = [
  { label: 'Продукция', to: '/nasha-produkcziya/' },
  { label: 'Услуги', to: '/uslugi/' },
  { label: 'Компания', to: '/#infra' },
  { label: 'Новости', to: '/blog/' },
  { label: 'Контакты', to: '/#dialog' },
]
</script>

<template>
  <footer v-if="contacts" id="contacts" class="footer">
    <div class="container grid">
      <div class="requisites">
        <p class="company">{{ contacts.company }}</p>
        <p v-if="contacts.requisites" class="muted">ИНН/ОГРН — {{ contacts.requisites }}</p>
        <p class="indent">{{ contacts.address }}</p>
        <div>
          <p class="muted">Диспетчерская</p>
          <p class="indent phones">
            <a :href="`tel:${contacts.phone.tel}`">{{ contacts.phone.display }}</a>
            <a :href="`tel:${contacts.dispatcher.tel}`">{{ contacts.dispatcher.display }}</a>
          </p>
        </div>
        <div>
          <p class="muted">e-mail:</p>
          <a :href="`mailto:${contacts.email}`" class="indent link">{{ contacts.email }}</a>
        </div>
      </div>

      <div class="logo-wrap">
        <img src="/design/logo-full.svg" alt="МируМир" width="426" height="281" class="logo">
      </div>

      <nav aria-label="Меню в подвале" class="nav">
        <div class="socials">
          <!-- в макете MAX; ссылки на профиль MAX у клиента пока нет — ведёт в WhatsApp-чат (см. DECISIONS) -->
          <a :href="contacts.whatsapp" target="_blank" rel="noopener" aria-label="Написать в мессенджер" class="social">
            <IconMax width="24" height="24" />
          </a>
          <a :href="contacts.telegram" target="_blank" rel="noopener" aria-label="Telegram" class="social">
            <IconTelegram />
          </a>
        </div>
        <NuxtLink v-for="item in menu" :key="item.label" :to="item.to" class="link">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>

    <div class="bottom">
      <div class="container bottom-row">
        <NuxtLink to="/politika/" class="link">Политика конфиденциальности</NuxtLink>
        <p class="muted copyright">©2014-2026</p>
        <span aria-hidden="true" class="tm">тм</span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-paper);
  color: var(--color-ink);
}

.grid {
  display: grid;
  gap: calc(var(--spacing) * 12);
  padding-block: calc(var(--spacing) * 16);

  @include from-lg {
    grid-template-columns: 1fr auto 1fr;
  }
}

.requisites {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  @include text-body-sm;
}

.company {
  font-weight: 500;
}

.muted {
  color: var(--color-ink-muted);
}

.indent {
  display: block;
  padding-left: calc(var(--spacing) * 6);
}

.phones {
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(var(--spacing) * 6);
}

.link,
.phones a {
  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }
}

.logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: calc(var(--spacing) * 48);
  width: auto;

  @include from-lg {
    height: calc(var(--spacing) * 56);
  }
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 3);
  @include text-body-sm;

  @include from-lg {
    align-items: flex-end;
  }
}

.socials {
  display: flex;
  gap: calc(var(--spacing) * 4);
  margin-bottom: calc(var(--spacing) * 2);
}

.social {
  transition: opacity 0.2s;

  &:hover,
  &:focus-visible {
    opacity: 0.6;
  }
}

.bottom {
  border-top: 1px solid var(--color-stone);
}

.bottom-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 6);
  @include text-body-sm;
}

.copyright {
  @include from-md {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

.bottom .container {
  position: relative;
}

.tm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(var(--spacing) * 9);
  height: calc(var(--spacing) * 9);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-pill);
  color: var(--color-ink-muted);
  @include text-small;
}
</style>
