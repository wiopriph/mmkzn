<script setup lang="ts">
// Подвал — фрейм 10355:12772 (1280×468, белый фон, весь текст 18/25.2):
// слева реквизиты сплошным столбцом (строки через 5px, значения с отступом 40),
// по центру лого 426px, справа блок 280px — меню столбцом + тёмные иконки
// Telegram и MAX 36px. Нижняя строка без разделителя: «Политика…» слева,
// © по центру, справа кружок «тм» и два тёмных круга-декора из макета.
// Мобилка — по скрину владельца: всё в стопку, лого 290px, меню + иконки
// в одну строку, © и «тм»-группа в нижней строке.
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
        <p>{{ contacts.company }}</p>
        <p>ИНН/ОГРН—{{ contacts.requisites }}</p>
        <p class="indent address">{{ contacts.address }}</p>
        <p class="muted">Диспетчерская</p>
        <p class="indent phones">
          <a :href="`tel:${contacts.phone.tel}`">{{ contacts.phone.display }}</a>
          <a :href="`tel:${contacts.dispatcher.tel}`">{{ contacts.dispatcher.display }}</a>
        </p>
        <p class="muted">e-mail:</p>
        <a :href="`mailto:${contacts.email}`" class="indent link">{{ contacts.email }}</a>
      </div>

      <div class="logo-wrap">
        <img src="/design/logo-full.svg" alt="МируМир" width="426" height="281" class="logo">
      </div>

      <div class="right">
        <nav aria-label="Меню в подвале" class="nav">
          <NuxtLink v-for="item in menu" :key="item.label" :to="item.to" class="link">
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="socials">
          <a :href="contacts.telegram" target="_blank" rel="noopener" aria-label="Telegram" class="social">
            <IconTelegram width="36" height="36" />
          </a>
          <!-- в макете MAX; ссылки на профиль MAX у клиента пока нет — ведёт в WhatsApp-чат (см. DECISIONS) -->
          <a :href="contacts.whatsapp" target="_blank" rel="noopener" aria-label="Написать в мессенджер" class="social">
            <IconMax width="36" height="36" />
          </a>
        </div>
      </div>
    </div>

    <div class="container bottom">
      <NuxtLink to="/politika/" class="link policy">Политика конфиденциальности</NuxtLink>
      <p class="copyright">©2014-2026</p>
      <div aria-hidden="true" class="badges">
        <span class="tm">тм</span>
        <span class="badge badge--ink" />
        <span class="badge badge--strong" />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-paper);
  color: var(--color-ink);
  @include text-body; // весь подвал макета — 18 / 25.2
}

.grid {
  display: grid;
  gap: calc(var(--spacing) * 9);
  padding-top: calc(var(--spacing) * 14); // мобилка: по скрину

  @include from-lg {
    grid-template-columns: 1fr auto 1fr;
    gap: 0;
    padding-top: calc(var(--spacing) * 7.25); // 29px
  }
}

// строки реквизитов идут сплошным столбцом с интервалом 5px
.requisites {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1.25);
}

.muted {
  color: var(--color-ink-muted);
}

.indent {
  padding-left: calc(var(--spacing) * 4); // мобилка: по скрину ~16

  @include from-lg {
    padding-left: calc(var(--spacing) * 10); // отступ значений 40px
  }
}

.address {
  max-width: 24.125rem; // 386px: перенос после «г. Казань», как в макете
}

// телефоны всегда в одну строку, как в макете
.phones {
  display: flex;
  white-space: nowrap;
  column-gap: calc(var(--spacing) * 7.5); // мобилка: 30px, чтобы влезть в 366

  @include from-lg {
    column-gap: calc(var(--spacing) * 9.25); // десктоп 37px
  }
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
  justify-content: center;
}

.logo {
  width: 18.125rem; // мобилка: лого 290px
  height: auto;

  @include from-lg {
    width: 26.625rem; // 426×281, как в макете
  }
}

// правая часть: меню + иконки; на десктопе блок 280px у правого края
.right {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @include from-lg {
    width: 100%;
    max-width: 17.5rem;
    margin-left: auto;
  }
}

.nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(var(--spacing) * 1.25); // строки меню через 5px, как реквизиты
}

.socials {
  display: flex;
  gap: calc(var(--spacing) * 1.25); // иконки через 5px
}

.social {
  display: flex;
  color: var(--color-ink);

  &:hover,
  &:focus-visible {
    opacity: 0.7;
  }
}

// нижняя строка макета без разделительной линии
.bottom {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  row-gap: calc(var(--spacing) * 5);
  margin-top: calc(var(--spacing) * 20); // мобилка: большой отвес по скрину
  padding-bottom: calc(var(--spacing) * 12);

  @include from-lg {
    margin-top: calc(var(--spacing) * 23.25); // лого низ 310 → строка 403
    padding-bottom: calc(var(--spacing) * 7.25); // 29px
  }
}

.policy {
  flex-basis: 100%; // мобилка: политика отдельной строкой

  @include from-lg {
    flex-basis: auto;
  }
}

.copyright {
  @include from-lg {
    position: absolute; // © строго по центру полосы, как в макете
    left: 50%;
    transform: translateX(-50%);
  }
}

// «тм» и два тёмных круга-декора — как в правом нижнем углу макета
.badges {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 1.25);
}

.tm,
.badge {
  width: calc(var(--spacing) * 9);
  height: calc(var(--spacing) * 9);
  border-radius: var(--radius-pill);
}

.tm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-ink);
  font-size: 1.25rem; // «тм» в макете 20/24 (текстового токена нет)
  line-height: 1;
}

.badge--ink {
  background: var(--color-ink);
}

.badge--strong {
  background: var(--color-ink-strong);
}
</style>
