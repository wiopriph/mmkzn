<script setup lang="ts">
interface SpecRow { param: string; gost?: string; actual: string; unit?: string }

const props = defineProps<{ specs: SpecRow[]; gostRef?: string }>()

const hasGost = computed(() => props.specs.some(r => r.gost !== undefined))
</script>

<template>
  <div v-if="specs.length">
    <!-- десктоп: полноценная таблица -->
    <table class="table">
      <caption class="visually-hidden">Характеристики материала</caption>
      <thead>
        <tr>
          <th scope="col">Характеристики</th>
          <th v-if="hasGost" scope="col">{{ gostRef ?? 'Норма' }}</th>
          <th scope="col">По факту</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in specs" :key="row.param">
          <td>{{ row.param }}</td>
          <td v-if="hasGost" class="gost">{{ row.gost ?? '—' }}</td>
          <td class="actual">{{ row.actual }}{{ row.unit ? ` ${row.unit}` : '' }}</td>
        </tr>
      </tbody>
    </table>

    <!-- мобильный: список «параметр → значение» -->
    <dl class="list">
      <div v-for="row in specs" :key="row.param" class="row">
        <dt class="param">{{ row.param }}</dt>
        <dd class="value">
          {{ row.actual }}{{ row.unit ? ` ${row.unit}` : '' }}
          <span v-if="hasGost && row.gost" class="norm">({{ gostRef ?? 'норма' }}: {{ row.gost }})</span>
        </dd>
      </div>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.table {
  display: none;

  @include from-md {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }

  th {
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4) calc(var(--spacing) * 3) 0;
    border-bottom: 2px solid var(--color-stone);
    font-weight: 600;
    text-align: left;
  }

  td {
    padding: calc(var(--spacing) * 2.5) calc(var(--spacing) * 4) calc(var(--spacing) * 2.5) 0;
    border-bottom: 1px solid var(--color-stone);
  }

  tbody tr:nth-child(even) {
    background: color-mix(in srgb, var(--color-stone) 50%, transparent);
  }
}

.gost {
  color: var(--color-ink-muted);
}

.actual {
  font-weight: 500;
}

.list {
  margin: 0;

  @include from-md {
    display: none;
  }
}

.row {
  padding-block: calc(var(--spacing) * 3);
  border-bottom: 1px solid var(--color-stone);
}

.param {
  color: var(--color-ink-muted);
  @include text-caption;
}

.value {
  margin: calc(var(--spacing)) 0 0;
  font-weight: 500;
}

.norm {
  margin-left: calc(var(--spacing) * 2);
  color: var(--color-ink-muted);
  @include text-caption;
  font-weight: 400;
}
</style>
