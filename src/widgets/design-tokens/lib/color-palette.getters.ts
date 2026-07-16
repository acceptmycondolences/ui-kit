import styles from '~/shared/styles/index.css?raw'

export function getColorPalette() {
  const computedStyle = getComputedStyle(document.documentElement)

  return {
    colors: getColorTokens(getCssBlock(':root')).map(([name, fallbackValue]) => [
      name,
      computedStyle.getPropertyValue(name).trim() || fallbackValue,
    ]),
    title: document.documentElement.classList.contains('dark') ? 'Темная тема' : 'Светлая тема',
  }
}

export function getColorTokens(block: string) {
  const declarations = [...block.matchAll(/(--[a-z-]+):\s*([^;]+);/g)]

  return declarations.flatMap(([, name, value]) => {
    if (!value.startsWith('hsl(')) {
      return []
    }

    return [[name, value] as const]
  })
}

export function getCssBlock(selector: string) {
  return new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\n\\}`).exec(styles)?.[1] ?? ''
}
