<script setup lang="ts">
// "Подобрать под задачу" - фреймы 12743:4465 (1282x960) и 12783:5894 (моб. 390x1200).
// Слева задачи, справа рекомендация; название, цена и ссылка берутся из
// content/materials. В макете одно состояние: задача без материала
// ("Моей задачи здесь нет") показывает fallback с кнопкой на форму.
interface Task {
  name: string
  hint: string
  material?: string
  why?: string
  with?: string
  alt?: string
  not?: string
}

const props = defineProps<{
  title: string
  text: string
  priceNote: string
  labels: { with: string; alt: string; not: string }
  pageLabel: string
  calcLabel: string
  tasks: Task[]
  fallback: { title: string; text: string; cta: string }
}>();

const { data: allMaterials } = useAsyncData('materials-list', () =>
  queryCollection('materials').order('order', 'ASC')
    .all());

const priceFormat = new Intl.NumberFormat('ru-RU');
const factKeys = ['with', 'alt', 'not'] as const;

const activeIndex = ref(0);

const recommendation = computed(() => {
  const task = props.tasks[activeIndex.value];
  const material = task?.material ?
    (allMaterials.value ?? []).find(candidate => candidate.legacyPath === `/${task.material}/`) :
    undefined;

  if (!task || !material) {
    return undefined;
  }

  const facts = factKeys.flatMap((key) => {
    const text = task[key];

    return text ? [{ label: props.labels[key], text }] : [];
  });

  return {
    name: material.shortTitle,
    path: material.legacyPath,
    why: task.why,
    facts,
    price: material.price.cashless ?
      `${priceFormat.format(material.price.cashless)} ₽/${material.price.unit}.` :
      undefined,
  };
});
</script>

<template>
  <section
    id="selector"
    class="selector"
  >
    <div class="container">
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
      </p>

      <div
        v-reveal="{ delay: 100 }"
        class="picker"
      >
        <ul class="tasks">
          <li
            v-for="(task, index) in tasks"
            :key="task.name"
          >
            <button
              type="button"
              class="task"
              :class="{ active: index === activeIndex }"
              :aria-current="index === activeIndex ? 'true' : undefined"
              aria-controls="selector-panel"
              @click="activeIndex = index"
            >
              <span class="task-name">{{ task.name }}</span>

              <span class="task-hint">{{ task.hint }}</span>
            </button>
          </li>
        </ul>

        <div
          id="selector-panel"
          class="panel"
          aria-live="polite"
        >
          <template v-if="recommendation">
            <h3 class="name">
              {{ recommendation.name }}
            </h3>

            <p
              v-if="recommendation.why"
              class="why"
            >
              {{ recommendation.why }}
            </p>

            <dl
              v-if="recommendation.facts.length"
              class="facts"
            >
              <div
                v-for="fact in recommendation.facts"
                :key="fact.label"
                class="fact"
              >
                <dt>
                  {{ fact.label }}
                </dt>

                <dd>
                  {{ fact.text }}
                </dd>
              </div>
            </dl>

            <div class="footer">
              <p
                v-if="recommendation.price"
                class="price"
              >
                <strong>{{ recommendation.price }}</strong> {{ priceNote }}
              </p>

              <div class="actions">
                <UiButton
                  variant="outline-dark"
                  size="lg"
                  :to="recommendation.path"
                  class="page-link"
                >
                  {{ pageLabel }}
                </UiButton>

                <UiButton
                  variant="gradient"
                  size="lg"
                  href="#dialog"
                >
                  {{ calcLabel }}
                </UiButton>
              </div>
            </div>
          </template>

          <template v-else>
            <h3 class="name">
              {{ fallback.title }}
            </h3>

            <p class="why">
              {{ fallback.text }}
            </p>

            <div class="footer">
              <div class="actions">
                <UiButton
                  variant="gradient"
                  size="lg"
                  href="#dialog"
                >
                  {{ fallback.cta }}
                </UiButton>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.selector {
  padding-block: calc(var(--spacing) * 7.5) calc(var(--spacing) * 9.5);
  background: var(--color-paper);

  @include from-lg {
    padding-block: calc(var(--spacing) * 15);
  }
}

.title {
  @include text-display-sm;
  line-height: 1;

  @include from-lg {
    @include text-h2;
    line-height: 1.1;
  }
}

.text {
  max-width: 19rem; // перенос как в моб. макете: "...цену и когда / он не подойдёт."
  margin-top: calc(var(--spacing) * 6.25);
  @include text-body;

  @include from-lg {
    max-width: none;
    margin-top: calc(var(--spacing) * 2.5);
    @include text-lead;
    line-height: 1.4;
  }
}

.picker {
  margin-top: calc(var(--spacing) * 11.75);

  @include from-lg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: calc(var(--spacing) * 16.5);
  }
}

// рамки строк и панели пересекаются на 1px, как в макете
.tasks li + li {
  margin-top: -1px;
}

// у синей строки рамки нет - следующая идет встык
.tasks li:has(.active) + li {
  margin-top: 0;
}

.task {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: calc(var(--spacing));
  width: 100%;
  min-height: calc(var(--spacing) * 15);
  padding-inline: calc(var(--spacing) * 3);
  border: 1px solid var(--color-ink-muted);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  @include from-lg {
    gap: calc(var(--spacing) * 1.25);
    min-height: 5.875rem;
    padding-inline: calc(var(--spacing) * 10 - 1px);
  }

  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }

  &.active {
    position: relative; // синяя строка перекрывает рамки соседей
    border-color: var(--color-brand-mid);
    background: var(--color-brand-mid);
    color: var(--color-paper);

    // активная строка макета выше остальных: 102 против 94
    @include from-lg {
      min-height: 6.375rem;
    }
  }
}

.task-name {
  font-size: var(--text-small);
  line-height: 1.2;

  @include from-lg {
    font-size: var(--text-card);
  }
}

.task-hint {
  font-size: 0.625rem; // в моб. макете 8px - поднято до читаемых 10
  line-height: 1.2;

  @include from-lg {
    font-size: var(--text-caption);
  }
}

.panel {
  display: flex;
  flex-direction: column;
  margin-top: -1px;
  padding: calc(var(--spacing) * 3 - 1px) calc(var(--spacing) * 3 - 1px) calc(var(--spacing) * 2.5 - 1px);
  border: 1px solid var(--color-ink-muted);

  @include from-lg {
    margin-top: 0;
    margin-left: -1px;
    padding: calc(var(--spacing) * 7.5 - 1px) calc(var(--spacing) * 7.5);
  }
}

.name {
  font-size: var(--text-h3);
  font-weight: 500;
  line-height: 1;
  text-wrap: balance;

  @include from-lg {
    font-size: var(--text-h2);
  }
}

.why {
  margin-top: calc(var(--spacing) * 2.5);
  font-size: 0.625rem; // в моб. макете 8/12
  line-height: 1.5;

  @include from-lg {
    max-width: 33.25rem;
    font-size: var(--text-caption);
  }
}

.facts {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  min-height: calc(var(--spacing) * 15);
  margin-top: calc(var(--spacing) * 12.5);

  @include from-lg {
    min-height: calc(var(--spacing) * 30);
    margin-top: calc(var(--spacing) * 19.5);
  }
}

.fact {
  padding-right: calc(var(--spacing) * 5);

  & + & {
    padding-left: calc(var(--spacing) * 5);
    border-left: 1px solid var(--color-ink-muted);
  }

  dt {
    font-size: var(--text-caption);
    font-weight: 500;
    line-height: 1.1;

    @include from-lg {
      font-size: var(--text-body);
    }
  }

  dd {
    margin: calc(var(--spacing) * 2.5) 0 0;
    font-size: 0.625rem; // в моб. макете 8/12
    line-height: 1.5;

    @include from-lg {
      margin-top: calc(var(--spacing) * 2.75);
      font-size: var(--text-caption);
    }
  }
}

// цена и кнопки прижаты к низу панели: ее высота задана списком задач
.footer {
  margin-top: auto;
  padding-top: calc(var(--spacing) * 10.25);
}

.price {
  font-size: var(--text-body-sm);
  line-height: 1.1;

  @include from-lg {
    font-size: 1.75rem; // 28/30.8, токена нет
  }

  strong {
    font-weight: 600;
  }
}

.actions {
  display: grid;
  gap: calc(var(--spacing) * 2.5);

  @include from-lg {
    grid-template-columns: 1fr 1fr;
  }

  .price + & {
    margin-top: calc(var(--spacing) * 5);

    @include from-lg {
      margin-top: calc(var(--spacing) * 7.5);
    }
  }

  :deep(.button) {
    padding-inline: calc(var(--spacing) * 2);
  }

  // рамка кнопки в макете темная (#363636), а не серая как у остальных outline
  .page-link {
    border-color: var(--color-ink);
  }
}
</style>
