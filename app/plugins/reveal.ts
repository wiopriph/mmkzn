// Директива v-reveal — плавное появление блока при попадании в вьюпорт.
// Использование: v-reveal или v-reveal="{ delay: 150 }" (мс, для каскада).
// Скрытое состояние навешивается только на клиенте: SSR-разметка остаётся
// видимой (SEO и работа без JS), а при prefers-reduced-motion анимации нет.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | undefined

  function observe(el: HTMLElement) {
    io ??= new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-in')
          io!.unobserve(e.target)
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
    io.observe(el)
  }

  nuxtApp.vueApp.directive<HTMLElement, { delay?: number } | undefined>('reveal', {
    getSSRProps: () => ({}),
    mounted(el, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (binding.value?.delay) el.style.setProperty('--reveal-delay', `${binding.value.delay}ms`)
      el.classList.add('reveal')
      observe(el)
    },
    unmounted(el) {
      io?.unobserve(el)
    },
  })
})
