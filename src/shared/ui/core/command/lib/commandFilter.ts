export function commandFilter(value: string, search: string, keywords?: string[]) {
  const label = keywords?.[0] ?? value

  return label.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
}
