<script setup lang="ts">
// «Приглашаем к диалогу» — фрейм 10357:21401 (1280×600):
// заголовок 72/76.3 слева сверху, текст 18/27 правой половиной, форма 320px
// по центру (поля 62px, зазор 15; кнопка 62px с белой обводкой; чекбокс 24px),
// телефон 36/38.2 и кружки MAX+Telegram 48px — слева снизу, узор 600×528
// справа за верхней кромкой. Мобилка — фрейм 10406:4320 (390×900): всё в стопку,
// заголовок 58/58, форма 292px, телефон 32/33.9 и иконки по центру.
// Общий CTA-блок: тексты в content/_data/dialog.yml, ставится на любую страницу.
interface DialogData {
  title: string
  text: string
  nameLabel: string
  phoneLabel: string
  submit: string
  consent: string
}

const { data: dialog } = await useAsyncData('dialog', async () => {
  const doc = await queryCollection('data').where('stem', 'LIKE', '%dialog').first()
  return unwrapDataDoc<DialogData>(doc)
})

const { data: contacts } = useContacts()
const route = useRoute()
const form = useLeadForm()

function onSubmit() {
  form.submit(route.path)
}
</script>

<template>
  <section v-if="dialog" id="dialog" class="dialog">
    <div aria-hidden="true" class="pattern-holder">
      <img src="/design/pattern-dialog.svg" alt="" class="pattern">
    </div>

    <div class="container inner">
      <div class="top">
        <h2 v-reveal class="title">{{ dialog.title }}</h2>
        <p v-reveal="{ delay: 150 }" class="text">{{ dialog.text }}</p>
      </div>

      <form v-if="form.state.value !== 'done'" v-reveal="{ delay: 100 }" class="form" @submit.prevent="onSubmit">
        <UiInput v-model="form.name.value" name="name" :label="dialog.nameLabel" required autocomplete="name" />
        <UiInput v-model="form.phone.value" name="phone" :label="dialog.phoneLabel" type="tel" required autocomplete="tel" />
        <UiButton variant="gradient" size="lg" type="submit" class="submit" :aria-busy="form.state.value === 'sending'">
          {{ form.state.value === 'sending' ? 'Отправляем…' : dialog.submit }}
        </UiButton>
        <UiCheckbox v-model="form.consent.value" name="consent" required class="consent">
          <NuxtLink to="/politika/" class="consent-link">{{ dialog.consent }}</NuxtLink>
        </UiCheckbox>

        <p v-if="form.state.value === 'unavailable' && contacts" role="status" class="status">
          Онлайн-заявки заработают после запуска нового сайта. Пока позвоните нам:
          <a :href="`tel:${contacts.phone.tel}`" class="status-link">{{ contacts.phone.display }}</a>
          — или напишите в мессенджеры.
        </p>
        <p v-else-if="form.state.value === 'error'" role="status" class="status">
          Не получилось отправить заявку. Позвоните нам или напишите в мессенджер —
          ответим так же быстро.
        </p>
      </form>

      <p v-else role="status" class="thanks">
        Спасибо! Заявка получена — перезвоним в ближайшее время.
      </p>

      <div v-if="contacts" v-reveal="{ delay: 200 }" class="bottom">
        <a :href="`tel:${contacts.phone.tel}`" class="phone">{{ contacts.phone.display }}</a>
        <div class="socials">
          <!-- в макете MAX; ссылки на профиль MAX у клиента пока нет — ведёт в WhatsApp-чат (см. DECISIONS) -->
          <a :href="contacts.whatsapp" target="_blank" rel="noopener" aria-label="Написать в мессенджер" class="social">
            <IconMax />
          </a>
          <a :href="contacts.telegram" target="_blank" rel="noopener" aria-label="Telegram" class="social">
            <IconTelegram width="48" height="48" />
          </a>
        </div>
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

// узор привязан к центрированной полосе 1280, а не к краю экрана
.pattern-holder {
  position: absolute;
  inset: 0;
  max-width: var(--container-max);
  margin-inline: auto;
  pointer-events: none;
}

.pattern {
  position: absolute;
  left: 25%; // мобилка: x98 при ширине 390
  top: -95px;
  width: 131.6%; // 513/390

  @include from-lg {
    left: 877px; // десктоп: x877.8 y-108.3, 600×528
    top: -108px;
    width: 600px;
  }
}

.inner {
  position: relative;
  padding-block: calc(var(--spacing) * 14); // мобилка: верх 56, низ 55

  @include from-lg {
    padding-block: calc(var(--spacing) * 9.5) calc(var(--spacing) * 9.25); // 38 / 37
  }
}

.top {
  display: grid;
  gap: calc(var(--spacing) * 2.5); // мобилка: заголовок → текст 10px

  @include from-lg {
    grid-template-columns: 1fr 1fr; // текст начинается ровно с середины полосы
    gap: 0;
  }
}

.title {
  font-size: 3.625rem; // мобильный заголовок макета 58/58 (токена нет)
  line-height: 1;
  font-weight: 500;

  @include from-lg {
    @include text-h1; // 72 / 76.3
    max-width: 31.5rem; // 504px
  }
}

.text {
  white-space: pre-line; // перенос после первого предложения — как в макете
  @include text-small; // мобилка 12px
  line-height: 1.5;

  @include from-lg {
    @include text-body; // десктоп 18px
    line-height: 1.5; // 27px
    max-width: 37.5rem; // 600px
  }
}

// форма 292px по центру (мобилка), 320px по центру полосы (десктоп)
.form {
  width: 100%;
  max-width: 18.25rem;
  margin-inline: auto;
  margin-top: calc(var(--spacing) * 30); // мобилка: текст низ 236 → форма 357

  @include from-lg {
    max-width: 20rem;
    // в макете форма на y300: заголовочный ряд в браузере 153px (у фигмы 162),
    // поэтому отступ 109, а не 100
    margin-top: calc(var(--spacing) * 27.25);
  }

  > * + * {
    margin-top: calc(var(--spacing) * 2.5); // поля через 10 (мобилка)

    @include from-lg {
      margin-top: calc(var(--spacing) * 3.75); // десктоп 15
    }
  }

  > .submit {
    width: 100%;
    margin-top: calc(var(--spacing) * 5); // 20px в обоих макетах
  }

  > .consent {
    margin-top: calc(var(--spacing) * 5); // мобилка 20

    @include from-lg {
      margin-top: calc(var(--spacing) * 2.5); // десктоп 10
    }
  }
}

.consent-link {
  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
}

.status {
  @include text-small;
  line-height: 1.4;
}

.status-link {
  text-decoration: underline;
}

.thanks {
  max-width: 28rem;
  margin-inline: auto;
  margin-top: calc(var(--spacing) * 30);
  text-align: center;
  @include text-lead;

  @include from-lg {
    margin-top: calc(var(--spacing) * 25);
  }
}

// телефон и мессенджеры: мобилка — по центру после формы,
// десктоп — левый нижний угол (телефон y450, кружки y515)
.bottom {
  margin-top: calc(var(--spacing) * 29.5); // мобилка: чекбокс низ 625 → телефон 743
  text-align: center;

  @include from-lg {
    position: absolute;
    left: var(--container-pad-md);
    bottom: calc(var(--spacing) * 9.25); // низ кружков на 37px выше кромки
    margin-top: 0;
    text-align: left;
  }
}

.phone {
  display: inline-block;
  font-size: 2rem; // мобилка 32/33.9
  line-height: 1.06;
  font-weight: 500;

  @include from-lg {
    @include text-h3; // 36 / 38.2
  }

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
}

.socials {
  display: flex;
  justify-content: center;
  gap: calc(var(--spacing) * 2.5); // кружки через 10
  margin-top: calc(var(--spacing) * 5); // мобилка: телефон низ 777 → иконки 797

  @include from-lg {
    justify-content: flex-start;
    margin-top: calc(var(--spacing) * 6.75); // десктоп: 488 → 515
  }
}

// по макету значки без подложек: белый пузырь MAX и контурный самолётик, 48px
.social {
  display: flex;
  width: calc(var(--spacing) * 12);
  height: calc(var(--spacing) * 12);
  color: var(--color-paper);

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
}
</style>
