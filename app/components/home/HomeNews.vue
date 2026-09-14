<script setup lang="ts">
// «Новости» — фрейм 9736:5269 (1280×960): интро 18/25.2 слева, две круглые
// стрелки 62×62 справа; слайдер карточек 390×580 с зазором 15, соседние
// выглядывают на ~25px за полосу; заголовок 24/31.4 и дата 14/19.6 внутри
// фото снизу; кнопка «Все события» 62px по центру.
// Мобилка (по референсу): стрелки по краям, точки-индикатор по центру,
// карточка ~74% ширины, соседи выглядывают.
// Статьи приходят из content/articles (draft: false), новые сверху.
defineProps<{
  intro: string
  cta: string
}>()

const { data: articles } = useAsyncData('home-news', () =>
  queryCollection('articles')
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .limit(6)
    .all())

const scroller = ref<HTMLElement>()
const active = ref(0)

function cardStep() {
  const el = scroller.value
  if (!el) return 0
  const card = el.querySelector<HTMLElement>('.card')
  return card ? card.offsetWidth + 15 : 0
}

function scrollByDir(dir: 1 | -1) {
  scroller.value?.scrollBy({ left: dir * cardStep(), behavior: 'smooth' })
}

function onScroll() {
  const el = scroller.value
  const step = cardStep()
  if (!el || !step) return
  active.value = Math.round(el.scrollLeft / step)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })
}
</script>

<template>
  <section v-if="articles?.length" id="news" class="news">
    <div class="container head">
      <p class="intro">{{ intro }}</p>

      <div class="nav">
        <UiArrowButton label="Назад" direction="left" @click="scrollByDir(-1)" />
        <div class="dots" aria-hidden="true">
          <span
            v-for="(a, i) in articles" :key="a.path"
            class="dot" :class="{ active: i === active }"
          />
        </div>
        <UiArrowButton label="Вперёд" @click="scrollByDir(1)" />
      </div>
    </div>

    <div ref="scroller" class="scroller" @scroll.passive="onScroll">
      <NuxtLink v-for="a in articles" :key="a.path" :to="a.path" class="card">
        <NuxtImg
          v-if="a.cover" format="webp" :src="a.cover.src" :alt="a.cover.alt" width="780" height="1160"
          sizes="290px md:390px" loading="lazy" class="cover"
        />
        <span aria-hidden="true" class="shade" />
        <span class="caption">
          <span class="card-title">{{ a.title }}</span>
          <span class="date">{{ formatDate(a.publishedAt) }}</span>
        </span>
      </NuxtLink>
    </div>

    <p class="container more">
      <UiButton variant="outline-dark" size="lg" to="/blog/">{{ cta }}</UiButton>
    </p>
  </section>
</template>

<style scoped lang="scss">
.news {
  padding-block: calc(var(--spacing) * 15); // интро y60, низ кнопки 59
  background: var(--color-paper);
}

.head {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 10);

  @include from-md {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: calc(var(--spacing) * 8);
  }
}

.intro {
  max-width: 35.25rem; // 564px
  @include text-body; // 18 / 25.2
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include from-md {
    justify-content: flex-start;
    gap: calc(var(--spacing) * 5); // стрелки через 20px
  }

  :deep(.arrow) {
    width: calc(var(--spacing) * 15.5); // круги 62×62, как в макете
    height: calc(var(--spacing) * 15.5);
  }
}

// точки-индикатор — только на мобиле (по мобильному макету)
.dots {
  display: flex;
  gap: calc(var(--spacing) * 2);

  @include from-md {
    display: none;
  }
}

.dot {
  width: calc(var(--spacing) * 2);
  height: calc(var(--spacing) * 2);
  border-radius: var(--radius-pill);
  background: var(--color-line);
  transition: background 0.2s;

  &.active {
    background: var(--color-ink-muted);
  }
}

.scroller {
  display: flex;
  gap: 15px; // зазор карточек макета
  margin-top: calc(var(--spacing) * 10);
  padding-inline: var(--container-pad);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @include from-md {
    margin-top: calc(var(--spacing) * 22); // интро низ 110 → карточки y199
    // выравнивание по 1280-полосе: соседние карточки выглядывают за неё
    padding-inline: max(var(--container-pad-md), calc(50% - 40rem + var(--container-pad-md)));
    scroll-padding-inline: max(var(--container-pad-md), calc(50% - 40rem + var(--container-pad-md)));
  }
}

.card {
  position: relative;
  flex-shrink: 0;
  width: 74%; // моб.: карточка с выглядывающими соседями
  aspect-ratio: 390 / 580;
  overflow: hidden;
  background: var(--color-stone);
  scroll-snap-align: start;

  @include from-md {
    width: 24.375rem; // 390×580, как в макете
  }

  &:hover .cover,
  &:focus-visible .cover {
    transform: scale(1.05);
  }
}

.cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.shade {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 40%;
  background: linear-gradient(
    to top,
    color-mix(in srgb, var(--color-ink-strong) 70%, transparent),
    transparent
  );
}

.caption {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: calc(var(--spacing) * 3);
  padding: calc(var(--spacing) * 5); // подпись в 20px от краёв
  color: var(--color-paper);
}

.card-title {
  max-width: 16.25rem; // 260px
  @include text-small;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1.3;

  @include from-md {
    @include text-card; // 24 / 31.4
    line-height: 1.3;
  }
}

.date {
  @include text-small;

  @include from-md {
    @include text-caption; // 14 / 19.6
  }
}

.more {
  margin-top: calc(var(--spacing) * 8);
  text-align: center;

  @include from-md {
    margin-top: calc(var(--spacing) * 15); // слайдер низ 779 → кнопка y839
  }
}
</style>
