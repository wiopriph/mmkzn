<template>
  <div class="flex min-h-screen flex-col">
    <LayoutAppHeader />
    <div class="flex-1">
      <slot />
    </div>
    <LeadStub />
    <LayoutAppFooter />
  </div>
</template>
