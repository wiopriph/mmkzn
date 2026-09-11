// Состояние и отправка формы заявки. Бэкенд (/api/lead: Postgres + Telegram)
// подключается на Этапе 1 — до тех пор роут отвечает 501, а форма показывает
// телефонный фолбэк.
export function useLeadForm() {
  const name = ref('')
  const phone = ref('')
  const consent = ref(false)
  const startedAt = Date.now()

  const state = ref<'idle' | 'sending' | 'done' | 'unavailable' | 'error'>('idle')

  async function submit(sourcePath: string) {
    if (state.value === 'sending') return
    state.value = 'sending'
    try {
      await $fetch('/api/lead', {
        method: 'POST',
        body: {
          name: name.value,
          phone: phone.value,
          consent: consent.value,
          sourcePath,
          // антиспам: форма должна заполняться дольше 3 секунд
          elapsedMs: Date.now() - startedAt,
        },
      })
      state.value = 'done'
    } catch (e: unknown) {
      const status = (e as { statusCode?: number })?.statusCode
      state.value = status === 501 ? 'unavailable' : 'error'
    }
  }

  return { name, phone, consent, state, submit }
}
