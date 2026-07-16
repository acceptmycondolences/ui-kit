/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  endOfLine: 'auto',
  importOrder: [
    '^(react(/.*)?)$',
    '^(react-dom(/.*)?)$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^~/widgets/(.*)$',
    '',
    '^~/shared/(.*)$',
    '',
    '^[.]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: Infinity,
      },
    },
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tailwindAttributes: ['toastOptions', 'classNames', 'containerClassName', 'contentClassName'],
  tailwindFunctions: ['classNames', 'cva', 'cn'],
  tailwindStylesheet: './.storybook/preview.css',
}
