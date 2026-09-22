<script setup lang="ts">
// Единственный лейаут сайта: шапка (overlay поверх тёмного hero или solid
// на белом — по headerTheme страницы) + контент + подвал.
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
