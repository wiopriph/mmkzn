// Состояние и отправка формы заявки в /api/lead (Telegram; Postgres — Этап 1).
// Ручка не настроена или сайт собран чистой статикой → 501/404 → форма
// показывает телефонный фолбэк.
export function useLeadForm() {
  const name = ref('');
  const phone = ref('');
  const consent = ref(false);
  // honeypot: скрытое поле — люди его не заполняют, боты заполняют
  const company = ref('');
  const startedAt = Date.now();

  const state = ref<'idle' | 'sending' | 'done' | 'invalid' | 'unavailable' | 'error'>('idle');

  const route = useRoute();

  async function submit(sourcePath: string) {
    if (state.value === 'sending') return;

    state.value = 'sending';

    // utm-метки из адреса — менеджер видит, с какой рекламы пришла заявка
    const utm = Object.fromEntries(
      Object.entries(route.query)
        .filter(([k]) => k.startsWith('utm_'))
        .map(([k, v]) => [k, String(v)]),
    );

    try {
      await $fetch('/api/lead', {
        method: 'POST',
        body: {
          name: name.value,
          phone: phone.value,
          consent: consent.value,
          company: company.value,
          sourcePath,
          referrer: document.referrer || undefined,
          utm,
          // антиспам: форма должна заполняться дольше 3 секунд
          elapsedMs: Date.now() - startedAt,
        },
      });

      state.value = 'done';
    } catch (error: unknown) {
      const status = (error as { statusCode?: number })?.statusCode;

      // 400 — не прошла валидация (обычно телефон не в РФ-формате);
      // 501 — ручка не настроена; 404/405 — статическая сборка без сервера
      if (status === 400) {
        state.value = 'invalid';
      } else if (status === 501 || status === 404 || status === 405) {
        state.value = 'unavailable';
      } else {
        state.value = 'error';
      }
    }
  }

  return { name, phone, consent, company, state, submit };
}
