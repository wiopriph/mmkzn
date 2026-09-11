<template>
  <div class="shell">
    <LayoutAppHeader />
    <div class="page">
      <slot />
    </div>
    <LeadStub />
    <LayoutAppFooter />
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
