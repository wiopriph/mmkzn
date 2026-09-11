<script setup lang="ts">
interface Stat { label: string; value: string }
defineProps<{
  title: string
  note: string
  stats: Stat[]
}>()
</script>

<template>
  <section id="infra" class="relative overflow-hidden bg-paper">
    <div class="container-page grid gap-10 py-20 lg:grid-cols-[5fr_7fr] lg:py-28">
      <div class="flex flex-col justify-between gap-10">
        <h2 class="text-h3 md:text-h2">{{ title }}</h2>
        <p class="max-w-xs text-body text-ink">{{ note }}</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="s in stats" :key="s.label"
          class="flex min-h-52 flex-col justify-between border border-line p-6"
        >
          <p class="text-body-sm text-ink">{{ s.label }}</p>
          <p class="text-h2 md:text-display">{{ s.value }}</p>
        </div>
      </div>
    </div>

    <p
      aria-hidden="true"
      class="pointer-events-none absolute bottom-8 right-3 hidden text-small uppercase tracking-widest text-ink-muted [writing-mode:vertical-rl] lg:block"
    >
      Республика Татарстан · Казань—2026
    </p>
  </section>
</template>
