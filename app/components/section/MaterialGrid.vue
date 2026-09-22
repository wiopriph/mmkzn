<script setup lang="ts">
// Сетка карточек материалов в стиле карточек продукции главной:
// фото 280/422, название заглавными со стрелкой, цена. Используется
// в каталоге (/nasha-produkcziya/) и как «другая продукция» на карточке
// материала (exclude — legacyPath текущего материала).
const props = defineProps<{
  title?: string
  exclude?: string
}>()

const { data: materials } = useAsyncData('materials-list', () =>
  queryCollection('materials').order('order', 'ASC').all())

const items = computed(() =>
  (materials.value ?? []).filter(m => m.legacyPath !== props.exclude))
</script>

<template>
  <section v-if="items.length" class="container catalog">
    <h2 v-if="title" v-reveal class="grid-title">{{ title }}</h2>
    <ul class="cards">
      <li v-for="(m, i) in items" :key="m.legacyPath" v-reveal="{ delay: (i % 4) * 100 }">
        <NuxtLink :to="m.legacyPath" class="card">
          <div class="photo-box">
            <NuxtImg
              v-if="m.images[0]" format="webp" :src="m.images[0].src" :alt="m.images[0].alt"
              width="640" height="964" sizes="50vw lg:320px" loading="lazy" class="photo"
            />
          </div>
          <p class="name">
            {{ m.shortTitle }}
            <IconArrow class="arrow" />
          </p>
          <p v-if="m.price.cashless" class="price">{{ m.price.cashless }} руб. / {{ m.price.unit }}.</p>
          <p v-else class="price">цена по запросу</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.catalog {
  padding-block: calc(var(--spacing) * 10);
}

.grid-title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;
}

// карточки — тот же рисунок, что в «Продукции» на главной
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 5) calc(var(--spacing) * 2);

  @include from-lg {
    grid-template-columns: repeat(4, 1fr);
    gap: calc(var(--spacing) * 7);
  }
}

.card {
  display: block;

  &:hover,
  &:focus-visible {
    .photo {
      transform: scale(1.05);
    }

    .arrow {
      transform: translateX(calc(var(--spacing)));
    }
  }
}

.photo-box {
  aspect-ratio: 280 / 422;
  overflow: hidden;
  background: var(--color-stone);
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 2);
  margin-top: calc(var(--spacing) * 2.5);
  font-size: var(--text-small);
  font-weight: 500;
  line-height: 1.2;
  text-transform: uppercase;

  @include from-md {
    margin-top: calc(var(--spacing) * 5);
    @include text-card;
    text-transform: uppercase;
  }

  .arrow {
    flex-shrink: 0;
    width: calc(var(--spacing) * 4);
    color: var(--color-ink-muted);
    transition: transform 0.2s;

    @include from-md {
      width: auto;
    }
  }
}

.price {
  margin-top: calc(var(--spacing) * 1.25);
  @include text-small;

  @include from-md {
    @include text-caption;
    line-height: 1.2;
  }
}
</style>
