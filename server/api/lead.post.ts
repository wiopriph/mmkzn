// Приём заявки с формы: валидация → антиспам → отправка в Telegram
// (раздел 9 PROMPT.md). INSERT в Postgres добавится на Этапе 1 вместе с VPS —
// в этот же обработчик, перед отправкой в Telegram.
// Без настроенного бота (env NUXT_TELEGRAM_*) отвечает 501 — форма показывает
// телефонный фолбэк, персональные данные не принимаются.
import { z } from 'zod'
import { createHash } from 'node:crypto'

const leadSchema = z.object({
  name: z.string().trim().min(2).max(60),
  phone: z.string().trim().min(6).max(20),
  consent: z.literal(true),
  sourcePath: z.string().max(200),
  elapsedMs: z.number().finite(),
  referrer: z.string().max(500).optional(),
  utm: z.record(z.string().max(40), z.string().max(200)).optional(),
  // honeypot: люди поле не видят, боты заполняют
  company: z.string().optional(),
})

// РФ-телефон: 10 цифр после кода 7/8 (сепараторы отбрасываем)
function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '')
  if (/^(7|8)\d{10}$/.test(digits)) return `+7${digits.slice(1)}`
  if (/^9\d{9}$/.test(digits)) return `+7${digits}`
  return null
}

// rate limit без БД: 10 заявок в час на хэш IP (in-memory, одного процесса хватает)
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60 * 60 * 1000
const hits = new Map<string, number[]>()

function allowed(ipHash: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ipHash) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) return false
  recent.push(now)
  hits.set(ipHash, recent)
  return true
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (!config.telegramBotToken || !config.telegramChatId) {
    throw createError({ statusCode: 501, statusMessage: 'Lead endpoint is not configured' })
  }

  const parsed = leadSchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }
  const lead = parsed.data

  const phone = normalizePhone(lead.phone)
  if (!phone) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })
  }

  // антиспам: honeypot и «слишком быстрое» заполнение гасим тихим успехом,
  // чтобы не подсказывать боту, что его распознали
  if (lead.company || lead.elapsedMs < 3000) {
    return { ok: true }
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const ipHash = createHash('sha256').update(ip + config.ipSalt).digest('hex')
  if (!allowed(ipHash)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }

  const utm = Object.entries(lead.utm ?? {})
    .map(([k, v]) => `${escapeHtml(k)}=${escapeHtml(v)}`)
    .join(', ')

  const lines = [
    '🟠 <b>Заявка с сайта</b>',
    `Имя: ${escapeHtml(lead.name)}`,
    `Телефон: ${phone}`,
    `Страница: ${escapeHtml(lead.sourcePath)}`,
    lead.referrer ? `Источник: ${escapeHtml(lead.referrer)}` : '',
    utm ? `UTM: ${utm}` : '',
  ].filter(Boolean)

  try {
    await $fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
      method: 'POST',
      timeout: 5000,
      body: {
        chat_id: config.telegramChatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      },
    })
  } catch {
    // наружу детали не текут — форма покажет телефонный фолбэк
    throw createError({ statusCode: 502, statusMessage: 'Delivery failed' })
  }

  return { ok: true }
})
