<script setup lang="ts">
// Прайс собирается из карточек материалов — цена живёт в одном месте
// (раздел 6.3 PROMPT.md). Стилистика — по типографике редизайна.
const { data: prices } = usePrices()
const priced = computed(() => (prices.value ?? []).filter(p => p.cashless !== null || p.cash !== null))
</script>

<template>
  <section id="price" class="container prices">
    <h2 v-reveal class="title">Цены</h2>
    <div v-reveal class="scroll">
      <table class="table">
        <caption class="visually-hidden">Прайс-лист на нерудные материалы</caption>
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Цена за безналичный расчет, руб./тн., с НДС 22%</th>
            <th scope="col">Цена за наличный расчет, руб./тн.</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in priced" :key="p.legacyPath">
            <td>
              <NuxtLink :to="p.legacyPath" class="link">{{ p.shortTitle }}</NuxtLink>
            </td>
            <td class="num">{{ p.cashless !== null ? formatPrice(p.cashless) : 'по запросу' }}</td>
            <td class="num">{{ p.cash !== null ? formatPrice(p.cash) : 'по запросу' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-reveal class="order">
      <UiButton variant="gradient" size="lg" href="#dialog">Заказать!</UiButton>
    </p>
  </section>
</template>

<style scoped lang="scss">
.prices {
  padding-block: calc(var(--spacing) * 10) calc(var(--spacing) * 15);
}

.title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;

  @include from-md {
    @include text-h2;
  }
}

.scroll {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;

  th {
    padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4) calc(var(--spacing) * 3) 0;
    border-bottom: 1px solid var(--color-ink);
    @include text-caption;
    font-weight: 500;
    text-align: left;
  }

  td {
    padding: calc(var(--spacing) * 3.5) calc(var(--spacing) * 4) calc(var(--spacing) * 3.5) 0;
    border-bottom: 1px solid var(--color-line);
    @include text-body-sm;
  }
}

.num {
  font-weight: 500;
}

.link {
  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }
}

.order {
  margin-top: calc(var(--spacing) * 8);
}
</style>
