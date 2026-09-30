import wiopriph from '@wiopriph/eslint-config';


export default [
  // сборки и вендорные файлы линтеру не нужны (.eslintignore в eslint 9 мёртв)
  { ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**', 'public/**'] },
  ...wiopriph,
];
