// Единственная точка чтения цен (раздел 6.3 PROMPT.md).
// Сейчас цены вшиты на этапе сборки из карточек материалов; когда понадобится
// runtime-режим — здесь появится ветка на GET /api/prices, компоненты не меняются.
export interface PriceRow {
  title: string
  shortTitle: string
  legacyPath: string
  cashless: number | null
  cash: number | null
  unit: string
  vatNote: string
}

export function usePrices() {
  return useAsyncData('prices', async () => {
    const materials = await queryCollection('materials').order('order', 'ASC').all()
    return materials.map((m): PriceRow => ({
      title: m.title,
      shortTitle: m.shortTitle,
      legacyPath: m.legacyPath,
      cashless: m.price.cashless,
      cash: m.price.cash,
      unit: m.price.unit,
      vatNote: m.price.vatNote,
    }))
  })
}

export function formatPrice(value: number): string {
  return value.toFixed(2).replace('.', ',')
}
