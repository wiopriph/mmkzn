<script setup lang="ts">
// «Продукция» — баннер (9740:5874 / 10391:1614) + карточки (9731:4974 / 10391:1932).
// Баннер: градиент section, узор pattern-heading.svg (правая часть, 715×360),
// заголовок 96 (моб. 60), интро 16/22.4 max-width 531.
// Карточки: зазор 28px (моб. 8), фото 280×422, название 24/28.8 (моб. 12),
// цена 14 (моб. 12), кнопка 62px по центру (моб. во всю ширину).
// Цены приходят только из карточек материалов (usePrices) — макетные цифры не используются.
const props = defineProps<{
  title: string
  introBefore: string
  introLink: string
  introLinkTo: string
  introAfter: string
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
      <!-- мобилка: узор — два зигзага (pattern-dialog × 0.567), сдвинуты вправо-вверх
           с выходом за края баннера (фрейм 341×300 на x130 y-72); десктоп — pattern-heading -->
      <img src="/design/pattern-dialog.svg" alt="" aria-hidden="true" class="pattern pattern-m">
      <img src="/design/pattern-heading.svg" alt="" aria-hidden="true" class="pattern pattern-d">
      <div class="container banner-inner">
        <h2 class="banner-title">{{ title }}</h2>
        <p class="banner-intro">
          {{ introBefore }}
          <NuxtLink :to="introLinkTo" class="intro-link">{{ introLink }}</NuxtLink>
          {{ introAfter }}
        </p>
      </div>
    </div>

    <div class="container catalog">
      <ul class="cards">
        <li v-for="c in cards" :key="c.legacyPath">
          <NuxtLink :to="c.legacyPath" class="card">
            <div class="photo-box">
              <NuxtImg
                v-if="c.photo" format="webp" :src="c.photo" :alt="c.title" width="640" height="900"
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
        <UiButton variant="outline-dark" size="lg" to="/nasha-produkcziya/">{{ cta }}</UiButton>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 22.5rem; // 360px на обоих брейкпоинтах
  overflow: hidden;
  background-image: var(--gradient-section);
  color: var(--color-paper);
}

.pattern {
  position: absolute;
}

// мобильный узор: pattern-dialog шириной 87% (341/390), сдвинут на треть вправо
// и на 20% за верх — обрезается краями самого баннера
.pattern-m {
  left: 33.3%;
  top: -20%;
  width: 87.4%;
  height: auto;
  transform: scaleX(-1); // наклон зигзагов в мобильном макете зеркален

  @include from-md {
    display: none;
  }
}

// десктопный узор уже обрезан под правую часть баннера (715×360 при фрейме 1282)
.pattern-d {
  display: none;

  @include from-md {
    display: block;
    right: 0;
    top: 0;
    height: 100%;
    width: auto;
  }
}

.banner-inner {
  position: relative;
  padding-bottom: calc(var(--spacing) * 10); // моб.: интро на 40px от низа

  @include from-md {
    padding-bottom: calc(var(--spacing) * 15); // десктоп: низ текста на 60px
  }
}

.banner-title {
  @include text-display-sm; // моб.: 60 / 54

  @include from-md {
    @include text-display; // десктоп: 96 / 96
  }
}

.intro-link {
  text-decoration: underline;
  text-underline-offset: 0.2em;

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
}

.banner-intro {
  max-width: 21.375rem;
  margin-top: calc(var(--spacing) * 2.5);
  @include text-small; // моб.: 12 / 16.8

  @include from-md {
    max-width: 33.1875rem; // 531px
    margin-top: calc(var(--spacing) * 2.5); // зазор заголовок→интро 10px
    @include text-body-sm;
    line-height: 1.4; // 16 / 22.4
  }
}

.catalog {
  padding-block: calc(var(--spacing) * 5) calc(var(--spacing) * 10);

  @include from-md {
    padding-block: calc(var(--spacing) * 11); // карточки y44, кнопка низ 43
  }
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 10.5) calc(var(--spacing) * 2); // моб.: 8px между колонками

  @include from-lg {
    grid-template-columns: repeat(4, 1fr);
    gap: calc(var(--spacing) * 7); // десктоп: 28px
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
  aspect-ratio: 280 / 422; // пропорция фото макета
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
  margin-top: calc(var(--spacing) * 2.5); // моб.: фото→название 10px
  font-size: var(--text-small); // моб.: 12 / 14.4
  font-weight: 500;
  line-height: 1.2;
  text-transform: uppercase;

  @include from-md {
    margin-top: calc(var(--spacing) * 5); // десктоп: 20px
    @include text-card; // 24 / 28.8
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
  margin-top: calc(var(--spacing) * 1.25); // название→цена 5px
  @include text-small; // моб.: 12

  @include from-md {
    @include text-caption; // десктоп: 14
    line-height: 1.2; // 16.8 в макете
  }
}

.more {
  margin-top: calc(var(--spacing) * 8); // моб.: до кнопки 32px

  @include from-md {
    margin-top: calc(var(--spacing) * 14.5); // десктоп: цены→кнопка 58px
    text-align: center;
  }

  :deep(.button) {
    width: 100%; // моб.: кнопка во всю ширину (366×62)

    @include from-md {
      width: auto;
    }
  }
}
</style>
