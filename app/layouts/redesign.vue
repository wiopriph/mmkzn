<script setup lang="ts">
// Лейаут редизайна (Этапы 2+). Копийные страницы остаются на layouts/default.vue
// до своего этапа редизайна.
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <LayoutSiteHeader :theme="($route.meta.headerTheme as 'overlay' | 'solid') ?? 'overlay'" />
    <div class="flex-1">
      <slot />
    </div>
    <LayoutSiteFooter />
  </div>
</template>
