import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const seo = z.object({
  title: z.string().max(70),
  description: z.string().max(180),
  ogImage: z.string().optional(),
  noindex: z.boolean().default(false),
})

const specRow = z.object({
  param: z.string(),              // «Влажность»
  gost: z.string().optional(),    // норма по ГОСТ, как в протоколе
  actual: z.string(),             // фактическое значение
  unit: z.string().optional(),    // «%», «кг/м³», «Бк/кг»
})

const price = z.object({
  cashless: z.number().nullable(),  // безнал с НДС
  cash: z.number().nullable(),      // наличные
  unit: z.enum(['м3', 'т']).default('м3'),
  vatNote: z.string().default('с НДС 22%'),
  updatedAt: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    materials: defineCollection({
      type: 'page',
      source: 'materials/**/*.md',
      schema: z.object({
        title: z.string(),          // «Песок речной»
        shortTitle: z.string(),     // для карточек и меню
        order: z.number(),
        legacyPath: z.string(),     // старый URL, источник карты 301
        gostRef: z.string().optional(),   // «ГОСТ 8736-2014»
        price: price,
        specs: z.array(specRow),
        applications: z.array(z.string()),   // где применяется
        images: z.array(z.object({ src: z.string(), alt: z.string() })),
        seo: seo,
      }),
    }),

    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        cover: z.object({ src: z.string(), alt: z.string() }).optional(),
        tags: z.array(z.string()).default([]),
        relatedMaterials: z.array(z.string()).default([]),  // slug'и материалов
        draft: z.boolean().default(false),
        seo: seo,
      }),
    }),

    services: defineCollection({
      type: 'page',
      source: 'services/**/*.md',
      schema: z.object({
        title: z.string(),
        order: z.number(),
        icon: z.string().optional(),
        summary: z.string(),
        seo: seo,
      }),
    }),

    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: z.object({ title: z.string(), seo: seo }),
    }),

    documents: defineCollection({
      type: 'data',
      source: 'documents/**/*.yml',
      schema: z.object({
        title: z.string(),
        file: z.string(),           // /docs/xxx.pdf
        kind: z.enum(['certificate', 'passport', 'protocol', 'requisites']),
        issuedAt: z.string().optional(),
        materials: z.array(z.string()).default([]),
      }),
    }),

    data: defineCollection({
      type: 'data',
      source: '_data/**/*.yml',
      schema: z.object({}).passthrough(),
    }),
  },
})
