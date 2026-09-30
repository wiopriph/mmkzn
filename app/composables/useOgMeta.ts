// OG/Twitter-мета для соцсетей и мессенджеров: одна точка, абсолютные URL.
// Без image подставляется общая картинка сайта (кадр hero).
export function useOgMeta(opts: {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article'
}) {
  const site = useSiteConfig()
  useSeoMeta({
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogType: opts.type ?? 'website',
    ogLocale: 'ru_RU',
    ogSiteName: site.name,
    ogImage: site.url + (opts.image ?? '/design/photo-hero.jpg'),
    twitterCard: 'summary_large_image',
  })
}
