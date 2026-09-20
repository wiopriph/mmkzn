import type { RouterConfig } from '@nuxt/schema'

// Правила прокрутки: «назад» возвращает на прежнее место, якорь (#dialog,
// #infra…) скроллит плавно, любой другой переход — в начало страницы.
// Без этого клик по лого с /#dialog на / оставлял посетителя у формы.
// Первый заход (загрузка/перезагрузка) не трогаем: браузер сам восстановит
// позицию или доскроллит к якорю — иначе страницу дёргало вниз-вверх.
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (!from.matched.length) return false
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
}
