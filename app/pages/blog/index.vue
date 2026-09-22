<script setup lang="ts">
// Черновой каркас ленты блога — полноценная лента и RSS придут на Этапе 7.
definePageMeta({ headerTheme: 'solid' })

const { data: articles } = await useAsyncData('blog-list', () =>
  queryCollection('articles')
    .where('draft', '=', false)
    .order('publishedAt', 'DESC')
    .all())

useSeoMeta({
  title: 'Новости — МируМир',
  description: 'События и новости компании МируМир: поставки нерудных материалов в Татарстане.',
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit' })
}
</script>

<template>
  <main class="container page">
    <h1 class="title">Новости</h1>
    <ul v-if="articles?.length" class="list">
      <li v-for="a in articles" :key="a.path">
        <NuxtLink :to="a.path" class="card">
          <NuxtImg
            v-if="a.cover" format="webp" :src="a.cover.src" :alt="a.cover.alt"
            width="780" height="1160" sizes="100vw md:390px" loading="lazy" class="cover"
          />
          <span aria-hidden="true" class="shade" />
          <span class="caption">
            <span class="card-title">{{ a.title }}</span>
            <span class="date">{{ formatDate(a.publishedAt) }}</span>
          </span>
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="empty">Новостей пока нет.</p>
  </main>
</template>

<style scoped lang="scss">
.page {
  padding-block: calc(var(--spacing) * 10) calc(var(--spacing) * 15);
}

.title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;

  @include from-md {
    @include text-h1;
  }
}

.list {
  display: grid;
  gap: calc(var(--spacing) * 4);

  @include from-md {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  position: relative;
  display: block;
  aspect-ratio: 390 / 580;
  overflow: hidden;
  background: var(--color-stone);

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
  padding: calc(var(--spacing) * 5);
  color: var(--color-paper);
}

.card-title {
  max-width: 16.25rem;
  @include text-card;
  text-transform: uppercase;
  line-height: 1.3;
}

.date {
  @include text-caption;
}

.empty {
  color: var(--color-ink-muted);
}
</style>
