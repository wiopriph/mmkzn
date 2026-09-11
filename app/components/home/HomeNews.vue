<script setup lang="ts">
// Слайдер событий. Данные — коллекция articles; пока она пуста,
// секция не рендерится вовсе (пустая лента хуже её отсутствия — PROMPT.md 8.4).
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

function scrollBy(dir: 1 | -1) {
  scroller.value?.scrollBy({ left: dir * 420, behavior: 'smooth' })
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })
}
</script>

<template>
  <section v-if="articles?.length" id="news" class="news">
    <div class="container head">
      <p class="intro">{{ intro }}</p>
      <div class="nav">
        <UiArrowButton label="Назад" direction="left" @click="scrollBy(-1)" />
        <UiArrowButton label="Вперёд" @click="scrollBy(1)" />
      </div>
    </div>

    <div ref="scroller" class="scroller">
      <NuxtLink v-for="a in articles" :key="a.path" :to="a.path" class="card">
        <NuxtImg format="webp"
          v-if="a.cover" :src="a.cover.src" :alt="a.cover.alt" width="780" height="1160"
          sizes="288px md:384px" loading="lazy" class="cover"
        />
        <span aria-hidden="true" class="shade" />
        <span class="caption">
          <span class="card-title">{{ a.title }}</span>
          <span class="date">{{ formatDate(a.publishedAt) }}</span>
        </span>
      </NuxtLink>
    </div>

    <p class="container more">
      <UiButton variant="outline-dark" to="/blog/">{{ cta }}</UiButton>
    </p>
  </section>
</template>

<style scoped lang="scss">
.news {
  padding-block: calc(var(--spacing) * 20);

  @include from-md {
    padding-block: calc(var(--spacing) * 28);
  }
}

.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: calc(var(--spacing) * 8);
}

.intro {
  max-width: 36rem;
  @include text-body;

  @include from-md {
    @include text-lead;
  }
}

.nav {
  display: none;

  @include from-md {
    display: flex;
    gap: calc(var(--spacing) * 4);
  }
}

.scroller {
  display: flex;
  gap: calc(var(--spacing) * 4);
  margin-top: calc(var(--spacing) * 12);
  padding-inline: var(--container-pad);
  padding-bottom: calc(var(--spacing) * 4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  @include from-md {
    padding-inline: var(--container-pad-md);
  }
}

.card {
  position: relative;
  flex-shrink: 0;
  width: calc(var(--spacing) * 72);
  aspect-ratio: 390 / 580;
  overflow: hidden;
  background: var(--color-stone);
  scroll-snap-align: start;

  @include from-md {
    width: calc(var(--spacing) * 96);
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
  height: 50%;
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
  padding: calc(var(--spacing) * 6);
  color: var(--color-paper);
}

.card-title {
  @include text-card;
  text-transform: uppercase;
  line-height: 1.2;
}

.date {
  @include text-caption;
}

.more {
  margin-top: calc(var(--spacing) * 10);
  text-align: center;
}
</style>
