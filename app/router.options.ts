import type { RouterConfig } from '@nuxt/schema'

// Правила прокрутки: «назад» возвращает на прежнее место, якорь (#dialog,
// #infra…) скроллит плавно, любой другой переход — в начало страницы.
// Без этого клик по лого с /#dialog на / оставлял посетителя у формы.
export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
}
