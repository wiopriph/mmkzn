<script setup lang="ts">
// Лейаут редизайна (Этапы 2+). Копийные страницы остаются на layouts/default.vue
// до своего этапа редизайна.
</script>

<template>
  <div class="shell">
    <LayoutSiteHeader :theme="($route.meta.headerTheme as 'overlay' | 'solid') ?? 'overlay'" />
    <div class="page">
      <slot />
    </div>
    <LayoutSiteFooter />
  </div>
</template>

<style scoped lang="scss">
.shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page {
  flex: 1;
}
</style>
