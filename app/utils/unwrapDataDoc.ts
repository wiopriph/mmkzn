// Поля data-коллекции живут в колонке meta (объект или JSON-строка в зависимости от адаптера)
export function unwrapDataDoc<T>(doc: unknown): T | null {
  if (!doc || typeof doc !== 'object') return null
  const meta = (doc as { meta?: unknown }).meta
  if (typeof meta === 'string') return JSON.parse(meta) as T
  if (meta && typeof meta === 'object' && Object.keys(meta).length) return meta as T
  return doc as T
}
