<script setup lang="ts">
// Сетка карточек материалов. Два режима:
// - каталог (photos задан): только перечисленные материалы в порядке ключей,
//   фото из макета, 3 колонки - фрейм 12410:4593 (моб. 12783:5191);
// - "другая продукция" на карточке материала: все материалы кроме exclude, 4 колонки.
const props = defineProps<{
  title?: string
  exclude?: string
  photos?: Record<string, string>
}>();

const { data: materials } = useAsyncData('materials-list', () =>
  queryCollection('materials').order('order', 'ASC')
    .all());

const isFeatured = computed(() => Boolean(props.photos));

const items = computed(() => {
  const all = materials.value ?? [];

  if (!props.photos) {
    return all
      .filter(material => material.legacyPath !== props.exclude)
      .map(material => ({ material, photo: material.images[0]?.src, alt: material.images[0]?.alt }));
  }

  return Object.entries(props.photos).flatMap(([slug, photo]) => {
    const material = all.find(candidate => candidate.legacyPath === `/${slug}/`);

    return material ? [{ material, photo, alt: material.title }] : [];
  });
});
</script>

<template>
  <section
    v-if="items.length"
    class="container catalog"
    :class="{ featured: isFeatured }"
  >
    <h2
      v-if="title"
      v-reveal
      class="grid-title"
    >
      {{ title }}
    </h2>

    <ul class="cards">
      <li
        v-for="(item, index) in items"
        :key="item.material.legacyPath"
        v-reveal="{ delay: (index % 4) * 100 }"
      >
        <NuxtLink
          :to="item.material.legacyPath"
          class="card"
        >
          <div class="photo-box">
            <NuxtImg
              v-if="item.photo"
              format="webp"
              :src="item.photo"
              :alt="item.alt"
              :width="isFeatured ? 774 : 640"
              :height="isFeatured ? 1100 : 964"
              :sizes="isFeatured ? '50vw lg:400px' : '50vw lg:320px'"
              loading="lazy"
              class="photo"
            />
          </div>

          <p class="name">
            {{ item.material.shortTitle }}
            <IconArrow class="arrow" />
          </p>

          <p
            v-if="item.material.price.cashless"
            class="price"
          >
            {{ item.material.price.cashless }} руб. / {{ item.material.price.unit }}.
          </p>

          <p
            v-else
            class="price"
          >
            цена по запросу
          </p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.catalog {
  padding-block: calc(var(--spacing) * 10);

  &.featured {
    padding-block: calc(var(--spacing) * 5) calc(var(--spacing) * 16.5);

    @include from-lg {
      padding-block: calc(var(--spacing) * 18.75) calc(var(--spacing) * 12.25);
    }
  }
}

.grid-title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 5) calc(var(--spacing) * 2);

  @include from-lg {
    grid-template-columns: repeat(4, 1fr);
    gap: calc(var(--spacing) * 7);
  }
}

.featured .cards {
  @include from-lg {
    grid-template-columns: repeat(3, 1fr);
    gap: calc(var(--spacing) * 8.5) calc(var(--spacing) * 5.25);
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

.featured .photo-box {
  aspect-ratio: 179 / 270;

  @include from-lg {
    aspect-ratio: 387 / 550;
  }
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

  // на мобилке стрелка не должна быть выше строки названия (12/14.4)
  .arrow {
    flex-shrink: 0;
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 3.5);
    color: var(--color-ink-muted);
    transition: transform 0.2s;

    @include from-md {
      width: auto;
      height: auto;
    }
  }
}

.price {
  margin-top: calc(var(--spacing) * 1.25);
  @include text-small;
  line-height: 1.2;

  @include from-md {
    @include text-caption;
    line-height: 1.2;
  }
}
</style>
