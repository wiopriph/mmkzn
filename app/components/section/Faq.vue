<script setup lang="ts">
// "Часто задаваемые вопросы" - фреймы 12783:4948 (1280x1448) и 12788:6200
// (моб. 390x777). Колонка начинается с x427, как заголовки каскадов.
// Аккордеон на <details name>: одновременно открыт один ответ, работает без JS.
interface FaqItem { question: string; answer: string[] }

defineProps<{
  title: string
  text: string
  items: FaqItem[]
}>();

const { data: contacts } = useContacts();
</script>

<template>
  <section class="faq">
    <div class="container">
      <div class="body">
        <h2
          v-reveal
          class="title"
        >
          {{ title }}
        </h2>

        <p
          v-reveal="{ delay: 150 }"
          class="text"
        >
          {{ text }}
          <a
            v-if="contacts"
            :href="`tel:${contacts.phone.tel}`"
            class="phone"
          >{{ contacts.phone.display }}</a>
        </p>

        <div class="list">
          <details
            v-for="(item, index) in items"
            :key="item.question"
            v-reveal="{ delay: Math.min(index, 4) * 60 }"
            name="faq"
            class="item"
          >
            <summary class="summary">
              <h3 class="question">
                {{ item.question }}
              </h3>

              <svg
                viewBox="0 0 48 48"
                aria-hidden="true"
                class="plus"
              >
                <path
                  d="M24 7.5v33M7.5 24h33"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                />
              </svg>
            </summary>

            <div class="answer">
              <p
                v-for="paragraph in item.answer"
                :key="paragraph"
              >
                {{ paragraph }}
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq {
  background: var(--color-paper);
}

.body {
  padding-block: calc(var(--spacing) * 7.5) calc(var(--spacing) * 12.25);

  @include from-lg {
    margin-left: 24.1875rem;
    padding-block: calc(var(--spacing) * 22.75) calc(var(--spacing) * 22.25);
  }
}

.title {
  font-size: 2.5rem; // мобилка 40/48, токена нет
  font-weight: 500;
  line-height: 1.2;

  @include from-lg {
    @include text-h1;
  }
}

.text {
  max-width: 18.125rem; // перенос как в моб. макете: "Не нашли свой вопрос? / Позвоните..."
  margin-top: calc(var(--spacing) * 2.5);
  @include text-body;
  line-height: 1.6;

  @include from-lg {
    max-width: none;
    margin-top: calc(var(--spacing) * 7.5);
    white-space: pre-line;
    @include text-lead;
    line-height: 1.6;
  }
}

.phone {
  color: var(--color-brand);
  white-space: nowrap;
  text-decoration: underline;
  text-underline-offset: 0.15em;

  &:hover,
  &:focus-visible {
    color: var(--color-accent-mid);
  }
}

.list {
  display: grid;
  gap: calc(var(--spacing) * 1.25);
  margin-top: calc(var(--spacing) * 7.25);

  @include from-lg {
    gap: calc(var(--spacing) * 3.75);
    margin-top: calc(var(--spacing) * 13.25);
  }
}

.item {
  border: 1px solid var(--color-ink-muted);
}

.summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  min-height: calc(var(--spacing) * 9);
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 4.5 - 1px);
  list-style: none;
  cursor: pointer;

  &::-webkit-details-marker {
    display: none;
  }

  @include from-lg {
    min-height: calc(var(--spacing) * 19.5);
    padding: calc(var(--spacing) * 3.75) calc(var(--spacing) * 10);
  }

  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }
}

.question {
  font-size: 0.625rem; // мобилка 10/11
  font-weight: 400;
  line-height: 1.1;
  white-space: pre-line;

  @include from-lg {
    font-size: var(--text-lead);
    line-height: 1.4;
  }
}

.plus {
  flex-shrink: 0;
  width: calc(var(--spacing) * 6);
  height: calc(var(--spacing) * 6);
  transition: transform 0.2s;

  @include from-lg {
    width: calc(var(--spacing) * 12);
    height: calc(var(--spacing) * 12);
  }

  .item[open] & {
    transform: rotate(45deg);
  }
}

.answer {
  display: grid;
  gap: calc(var(--spacing) * 2);
  max-width: 43rem;
  padding: 0 calc(var(--spacing) * 4.5 - 1px) calc(var(--spacing) * 3.5);
  font-size: 0.625rem; // в масштабе вопроса моб. макета (10px)
  line-height: 1.5;

  @include from-lg {
    padding: 0 calc(var(--spacing) * 10) calc(var(--spacing) * 7);
    @include text-body-sm;
  }
}
</style>
