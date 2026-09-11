<script setup lang="ts">
// Прайс собирается из карточек материалов — цена живёт в одном месте.
const { data: prices } = usePrices()
const priced = computed(() => (prices.value ?? []).filter(p => p.cashless !== null || p.cash !== null))
</script>

<template>
  <section id="price" class="container-page py-14">
    <h2 class="text-h2 mb-8 text-center">Цены</h2>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <caption class="sr-only">Прайс-лист на нерудные материалы</caption>
        <thead>
          <tr class="border-b-2 border-stone text-left">
            <th scope="col" class="py-3 pr-4 font-semibold" />
            <th scope="col" class="py-3 pr-4 font-semibold">Цена за безналичный расчет, руб./тн., с НДС 22%</th>
            <th scope="col" class="py-3 font-semibold">Цена за наличный расчет, руб./тн.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in priced" :key="p.legacyPath" class="border-b border-stone even:bg-stone/50">
            <td class="py-2.5 pr-4">
              <NuxtLink :to="p.legacyPath" class="underline hocus:text-brand">{{ p.shortTitle }}</NuxtLink>
            </td>
            <td class="py-2.5 pr-4 font-medium">{{ p.cashless !== null ? formatPrice(p.cashless) : 'по запросу' }}</td>
            <td class="py-2.5 font-medium">{{ p.cash !== null ? formatPrice(p.cash) : 'по запросу' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-8 text-center">
      <a href="#form" class="inline-block rounded-pill bg-accent px-10 py-3 font-semibold text-ink hocus:opacity-90">Заказать!</a>
    </p>
  </section>
</template>
