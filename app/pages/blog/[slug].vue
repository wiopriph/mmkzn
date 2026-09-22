<script setup lang="ts">
// Черновой каркас страницы статьи — типографика и related-материалы на Этапе 7.
definePageMeta({ headerTheme: 'solid' })

const route = useRoute()

const { data: article } = await useAsyncData(`article-${route.params.slug}`, () =>
  queryCollection('articles').path(route.path).first())

if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Статья не найдена' })

useSeoMeta({
  title: article.value.seo.title,
  description: article.value.seo.description || undefined,
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <main v-if="article" class="container page">
    <p class="date">{{ formatDate(article.publishedAt) }}</p>
    <h1 class="title">{{ article.title }}</h1>
    <NuxtImg
      v-if="article.cover" format="webp" :src="article.cover.src" :alt="article.cover.alt"
      width="1560" height="880" sizes="100vw lg:960px" class="cover"
    />
    <div class="content body">
      <ContentRenderer :value="article" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  padding-block: calc(var(--spacing) * 10) calc(var(--spacing) * 15);
}

.date {
  margin-bottom: calc(var(--spacing) * 2);
  color: var(--color-ink-muted);
  @include text-caption;
}

.title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;

  @include from-md {
    @include text-h1;
    max-width: 60rem;
  }
}

.cover {
  width: 100%;
  max-height: 30rem;
  object-fit: cover;
  margin-bottom: calc(var(--spacing) * 8);
}

.body {
  max-width: 45rem;
}
</style>
