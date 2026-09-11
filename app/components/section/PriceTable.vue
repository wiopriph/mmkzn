<script setup lang="ts">
// Прайс собирается из карточек материалов — цена живёт в одном месте (копийные страницы).
const { data: prices } = usePrices()
const priced = computed(() => (prices.value ?? []).filter(p => p.cashless !== null || p.cash !== null))
</script>

<template>
  <section id="price" class="container prices">
    <h2 class="title">Цены</h2>
    <div class="scroll">
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
    <p class="order">
      <a href="#form" class="order-btn">Заказать!</a>
    </p>
  </section>
</template>

<style scoped lang="scss">
.prices {
  padding-block: calc(var(--spacing) * 14);
}

.title {
  margin-bottom: calc(var(--spacing) * 8);
  @include text-h3;
  text-align: center;
}

.scroll {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;

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

.num {
  font-weight: 500;
}

.link {
  text-decoration: underline;

  &:hover,
  &:focus-visible {
    color: var(--color-brand);
  }
}

.order {
  margin-top: calc(var(--spacing) * 8);
  text-align: center;
}

.order-btn {
  display: inline-block;
  padding: calc(var(--spacing) * 3) calc(var(--spacing) * 10);
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  color: var(--color-paper);
  font-weight: 600;

  &:hover,
  &:focus-visible {
    opacity: 0.9;
  }
}
</style>
