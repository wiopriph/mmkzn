// Заглушка до Этапа 1 (Postgres + Telegram + антиспам).
// Отвечает 501, чтобы клиентская форма показала телефонный фолбэк,
// и не принимает данные — персональные данные без бэкенда не обрабатываем.
export default defineEventHandler(() => {
  throw createError({
    statusCode: 501,
    statusMessage: 'Lead endpoint is not deployed yet (Этап 1)',
  })
})
