<script setup lang="ts">
interface SpecRow { param: string; gost?: string; actual: string; unit?: string }

const props = defineProps<{ specs: SpecRow[]; gostRef?: string }>()

const hasGost = computed(() => props.specs.some(r => r.gost !== undefined))
</script>

<template>
  <div v-if="specs.length">
    <!-- десктоп: полноценная таблица -->
    <table class="hidden w-full border-collapse md:table">
      <caption class="sr-only">Характеристики материала</caption>
      <thead>
        <tr class="border-b-2 border-stone text-left">
          <th scope="col" class="py-3 pr-4 font-semibold">Характеристики</th>
          <th v-if="hasGost" scope="col" class="py-3 pr-4 font-semibold">{{ gostRef ?? 'Норма' }}</th>
          <th scope="col" class="py-3 font-semibold">По факту</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in specs" :key="row.param" class="border-b border-stone even:bg-stone/50">
          <td class="py-2.5 pr-4">{{ row.param }}</td>
          <td v-if="hasGost" class="py-2.5 pr-4 text-ink-muted">{{ row.gost ?? '—' }}</td>
          <td class="py-2.5 font-medium">{{ row.actual }}{{ row.unit ? ` ${row.unit}` : '' }}</td>
        </tr>
      </tbody>
    </table>

    <!-- мобильный: список «параметр → значение» -->
    <dl class="md:hidden">
      <div v-for="row in specs" :key="row.param" class="border-b border-stone py-3">
        <dt class="text-caption text-ink-muted">{{ row.param }}</dt>
        <dd class="mt-1 font-medium">
          {{ row.actual }}{{ row.unit ? ` ${row.unit}` : '' }}
          <span v-if="hasGost && row.gost" class="ml-2 text-caption text-ink-muted">({{ gostRef ?? 'норма' }}: {{ row.gost }})</span>
        </dd>
      </div>
    </dl>
  </div>
</template>
