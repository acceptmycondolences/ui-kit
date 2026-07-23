import { create } from 'storybook/theming/create'

const brand = {
  brandTarget: '_self',
  fontBase: 'pnfont',
  fontCode: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
} as const

export const lightTheme = create({
  ...brand,
  appBg: 'hsl(210 23% 95%)',
  appBorderColor: 'hsl(0 0% 88%)',
  appBorderRadius: 8,
  appContentBg: 'hsl(0 0% 100%)',
  appPreviewBg: 'hsl(0 0% 100%)',
  barBg: 'hsl(0 0% 100%)',
  barHoverColor: 'hsl(147 75% 30%)',
  barSelectedColor: 'hsl(147 75% 30%)',
  barTextColor: 'hsl(224 8% 35%)',
  base: 'light',
  brandUrl: './',
  colorPrimary: 'hsl(147 75% 37%)',
  colorSecondary: 'hsl(209 85% 47%)',
  inputBg: 'hsl(0 0% 100%)',
  inputBorder: 'hsl(0 0% 88%)',
  inputBorderRadius: 6,
  inputTextColor: 'hsl(225 9% 9%)',
  textColor: 'hsl(225 9% 9%)',
  textInverseColor: 'hsl(0 0% 100%)',
})

export const darkTheme = create({
  ...brand,
  appBg: 'hsl(225 9% 9%)',
  appBorderColor: 'hsl(227 8% 21%)',
  appBorderRadius: 8,
  appContentBg: 'hsl(220 9% 13%)',
  appPreviewBg: 'hsl(225 9% 9%)',
  barBg: 'hsl(220 9% 13%)',
  barHoverColor: 'hsl(147 75% 37%)',
  barSelectedColor: 'hsl(147 75% 37%)',
  barTextColor: 'hsl(220 5% 88%)',
  base: 'dark',
  brandUrl: './?globals=theme:dark',
  colorPrimary: 'hsl(147 75% 37%)',
  colorSecondary: 'hsl(209 98% 54%)',
  inputBg: 'hsl(220 9% 13%)',
  inputBorder: 'hsl(227 8% 21%)',
  inputBorderRadius: 6,
  inputTextColor: 'hsl(210 23% 95%)',
  textColor: 'hsl(210 23% 95%)',
  textInverseColor: 'hsl(225 9% 9%)',
})

export function getTheme(theme: unknown) {
  return theme === 'dark' ? darkTheme : lightTheme
}
