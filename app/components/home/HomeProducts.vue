<script setup lang="ts">
// Синий баннер «Продукция» + карточки материалов.
// Цены приходят только из карточек материалов (usePrices) — макетные цифры не используются.
const props = defineProps<{
  title: string
  intro: string
  cta: string
  photos: Record<string, string>
}>()

const { data: prices } = usePrices()

// показываем те же 4 карточки, что в макете: материалы с ценой и фото
const cards = computed(() =>
  (prices.value ?? [])
    .map(p => ({
      ...p,
      photo: props.photos[p.legacyPath.replaceAll('/', '')] ?? null,
    }))
    .filter(p => p.cashless !== null && p.photo)
    .slice(0, 4))
</script>

<template>
  <section id="products">
    <div class="banner">
      <img src="/design/pattern-dialog.svg" alt="" aria-hidden="true" class="pattern">
      <div class="container banner-inner">
        <h2 class="banner-title">{{ title }}</h2>
        <p class="banner-intro">{{ intro }}</p>
      </div>
    </div>

    <div class="container catalog">
      <ul class="cards">
        <li v-for="c in cards" :key="c.legacyPath">
          <NuxtLink :to="c.legacyPath" class="card">
            <div class="photo-box">
              <NuxtImg format="webp"
                v-if="c.photo" :src="c.photo" :alt="c.title" width="640" height="900"
                sizes="50vw lg:320px" loading="lazy" class="photo"
              />
            </div>
            <p class="name">
              {{ c.shortTitle }}
              <IconArrow class="arrow" />
            </p>
            <p class="price">{{ c.cashless }} руб. / {{ c.unit }}.</p>
          </NuxtLink>
        </li>
      </ul>

      <p class="more">
        <UiButton variant="outline-dark" to="/nasha-produkcziya/">{{ cta }}</UiButton>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  position: relative;
  overflow: hidden;
  background-image: var(--gradient-section);
  color: var(--color-paper);
}

.pattern {
  position: absolute;
  right: calc(var(--spacing) * -16);
  top: 50%;
  height: 150%;
  transform: translateY(-50%);
  opacity: 0.9;
}

.banner-inner {
  position: relative;
  padding-block: calc(var(--spacing) * 16);

  @include from-md {
    padding-block: calc(var(--spacing) * 20);
  }
}

.banner-title {
  @include text-h2;

  @include from-md {
    @include text-display;
  }
}

.banner-intro {
  max-width: 28rem;
  margin-top: calc(var(--spacing) * 6);
  @include text-body-sm;
}

.catalog {
  padding-block: calc(var(--spacing) * 14);
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 10) calc(var(--spacing) * 4);

  @include from-lg {
    grid-template-columns: repeat(4, 1fr);
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
  aspect-ratio: 3 / 4.2;
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
  margin-top: calc(var(--spacing) * 5);
  @include text-card;
  text-transform: uppercase;

  .arrow {
    flex-shrink: 0;
    color: var(--color-ink-muted);
    transition: transform 0.2s;
  }
}

.price {
  margin-top: calc(var(--spacing) * 2);
  color: var(--color-ink-muted);
  @include text-body-sm;
}

.more {
  margin-top: calc(var(--spacing) * 12);
  text-align: center;
}
</style>
