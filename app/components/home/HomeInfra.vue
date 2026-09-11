<script setup lang="ts">
interface Stat { label: string; value: string }
defineProps<{
  title: string
  note: string
  stats: Stat[]
}>()
</script>

<template>
  <section id="infra" class="infra">
    <div class="container grid">
      <div class="lead">
        <h2 class="title">{{ title }}</h2>
        <p class="note">{{ note }}</p>
      </div>

      <div class="stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <p class="stat-label">{{ s.label }}</p>
          <p class="stat-value">{{ s.value }}</p>
        </div>
      </div>
    </div>

    <p aria-hidden="true" class="vertical">Республика Татарстан · Казань—2026</p>
  </section>
</template>

<style scoped lang="scss">
.infra {
  position: relative;
  overflow: hidden;
  background: var(--color-paper);
}

.grid {
  display: grid;
  gap: calc(var(--spacing) * 10);
  padding-block: calc(var(--spacing) * 20);

  @include from-lg {
    grid-template-columns: 5fr 7fr;
    padding-block: calc(var(--spacing) * 28);
  }
}

.lead {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(var(--spacing) * 10);
}

.title {
  @include text-h3;

  @include from-md {
    @include text-h2;
  }
}

.note {
  max-width: 20rem;
  @include text-body;
}

.stats {
  display: grid;
  gap: calc(var(--spacing) * 4);

  @include from-sm {
    grid-template-columns: 1fr 1fr;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(var(--spacing) * 52);
  padding: calc(var(--spacing) * 6);
  border: 1px solid var(--color-line);
}

.stat-label {
  @include text-body-sm;
}

.stat-value {
  @include text-h2;

  @include from-md {
    @include text-display;
  }
}

.vertical {
  position: absolute;
  right: calc(var(--spacing) * 3);
  bottom: calc(var(--spacing) * 8);
  display: none;
  color: var(--color-ink-muted);
  @include text-small;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
  pointer-events: none;

  @include from-lg {
    display: block;
  }
}
</style>
