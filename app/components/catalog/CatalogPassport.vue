<script setup lang="ts">
// "Каждая партия с паспортом" - фреймы 12746:4732 (1280x853) и 12783:5736
// (моб. 390x1100). В макете значения - заглушки "из паспорта": показываем
// реальные строки лабораторной таблицы материала (specs), отобранные по params.
// Материалы без таблицы во вкладки не попадают. Кнопки макета "Скачать образец"
// и "Сертификат" появятся вместе с PDF-документами; пока есть ссылка на полную
// таблицу на странице материала.
const props = defineProps<{
  title: string
  text: string
  heading: string
  normLabel: string
  moreLabel: string
  params: string[]
  materials: string[]
}>();

const { data: allMaterials } = useAsyncData('materials-list', () =>
  queryCollection('materials').order('order', 'ASC')
    .all());

const passports = computed(() => props.materials.flatMap((slug) => {
  const material = (allMaterials.value ?? []).find(candidate => candidate.legacyPath === `/${slug}/`);

  if (!material || !material.specs.length) {
    return [];
  }

  const rows = props.params.flatMap((prefix) => {
    const spec = material.specs.find(candidate => candidate.param.startsWith(prefix));

    return spec ?
      [{ label: spec.param, value: spec.unit ? `${spec.actual} ${spec.unit}` : spec.actual }] :
      [];
  });

  return [{
    slug,
    name: material.shortTitle,
    path: material.legacyPath,
    norm: material.gostRef,
    rows,
  }];
}));

const activeSlug = ref<string>();
const activePassport = computed(() =>
  passports.value.find(passport => passport.slug === activeSlug.value) ?? passports.value[0]);
</script>

<template>
  <section
    v-if="activePassport"
    class="passport"
  >
    <div
      aria-hidden="true"
      class="pattern-holder"
    >
      <img
        src="/design/pattern-dialog.svg"
        alt=""
        class="pattern pattern-desk"
      >

      <img
        src="/design/pattern-passport-mobile.svg"
        alt=""
        class="pattern pattern-mob"
      >
    </div>

    <div class="container grid">
      <div class="intro">
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
      </div>

      <div
        v-reveal="{ delay: 100 }"
        class="panel"
      >
        <div
          role="tablist"
          :aria-label="heading"
          class="tabs"
        >
          <button
            v-for="passport in passports"
            :key="passport.slug"
            type="button"
            role="tab"
            class="tab"
            :class="{ active: passport.slug === activePassport.slug }"
            :aria-selected="passport.slug === activePassport.slug"
            @click="activeSlug = passport.slug"
          >
            {{ passport.name }}
          </button>
        </div>

        <div role="tabpanel">
          <h3 class="heading">
            {{ heading }}
          </h3>

          <p class="material">
            {{ activePassport.name }}
          </p>

          <dl class="rows">
            <div
              v-if="activePassport.norm"
              class="row"
            >
              <dt>
                {{ normLabel }}
              </dt>

              <dd>
                {{ activePassport.norm }}
              </dd>
            </div>

            <div
              v-for="row in activePassport.rows"
              :key="row.label"
              class="row"
            >
              <dt>
                {{ row.label }}
              </dt>

              <dd>
                {{ row.value }}
              </dd>
            </div>
          </dl>

          <UiButton
            variant="outline-light"
            size="lg"
            :to="activePassport.path"
            class="more"
          >
            {{ moreLabel }}
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.passport {
  position: relative;
  overflow: hidden;
  background-image: var(--gradient-section);
  color: var(--color-paper);
}

.pattern-holder {
  position: absolute;
  inset: 0;
  max-width: var(--container-max);
  margin-inline: auto;
  pointer-events: none;
}

.pattern {
  position: absolute;
  max-width: none;
}

// позиции узоров - от низа секции: высота блока зависит от числа строк таблицы
.pattern-mob {
  left: -202px;
  bottom: -315px;
  width: 701px;

  @include from-lg {
    display: none;
  }
}

.pattern-desk {
  display: none;

  @include from-lg {
    display: block;
    left: -145px;
    bottom: -239px;
    width: 809px;
  }
}

.grid {
  position: relative;
  display: grid;
  padding-block: calc(var(--spacing) * 17.25) calc(var(--spacing) * 68.75);

  @include from-lg {
    grid-template-columns: 1fr 1fr;
    padding-block: calc(var(--spacing) * 13.25) calc(var(--spacing) * 19.5);
  }
}

.title {
  @include text-display-sm;
  line-height: 1;

  @include from-lg {
    white-space: pre-line;
    @include text-h1;
  }
}

.text {
  max-width: 13.5rem;
  margin-top: calc(var(--spacing) * 2.5);
  @include text-body;
  line-height: 1.6;

  @include from-lg {
    max-width: none;
    margin-top: calc(var(--spacing) * 9.5);
    @include text-lead;
  }
}

.panel {
  margin-top: calc(var(--spacing) * 12.5);

  @include from-lg {
    margin-top: 0;
    padding-top: calc(var(--spacing) * 32.5); // вкладки на y183 при заголовке на y53
  }
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  row-gap: calc(var(--spacing) * 2);
}

.tab {
  padding-inline: calc(var(--spacing) * 1.25);
  font-size: 0.6875rem; // 11px: четыре вкладки в одну строку на 390 (в макете 10)
  line-height: 1.3;
  cursor: pointer;
  transition: color 0.2s;

  @include from-lg {
    padding-inline: calc(var(--spacing) * 3);
    @include text-body-sm;
    line-height: 1.875; // 30px - высота разделителя макета
  }

  &:first-child {
    padding-left: 0;
  }

  & + & {
    border-left: 1px solid color-mix(in srgb, var(--color-paper) 50%, transparent);
  }

  &:hover,
  &:focus-visible,
  &.active {
    color: var(--color-accent-mid);
  }
}

.heading {
  margin-top: calc(var(--spacing) * 7.5);
  @include text-body-sm;
  font-weight: 500;
  line-height: 1.3;

  @include from-lg {
    font-size: 2rem; // 32/41.6, токена нет
  }
}

.material {
  margin-top: calc(var(--spacing) * 1.25);
  @include text-small;

  @include from-lg {
    @include text-card;
    font-weight: 400;
  }
}

.rows {
  margin-top: calc(var(--spacing) * 3.75);
  border-top: 1px solid var(--color-paper);
}

.row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 2);
  border-bottom: 1px solid var(--color-paper);
  @include text-small;

  @include from-lg {
    padding-block: calc(var(--spacing) * 5);
    font-size: var(--text-body-sm);
    line-height: 1.2;
  }

  dd {
    flex-shrink: 0;
    color: color-mix(in srgb, var(--color-paper) 75%, transparent);
    text-align: right;
  }
}

.more {
  width: 100%;
  margin-top: calc(var(--spacing) * 7.5);

  @include from-lg {
    width: auto;
    margin-top: calc(var(--spacing) * 6.25);
  }
}
</style>
