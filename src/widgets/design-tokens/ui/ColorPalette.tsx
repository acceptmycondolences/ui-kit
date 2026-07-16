import { useColorPalette } from '../lib/useColorPalette'

export function ColorPalette() {
  const { colors, title } = useColorPalette()

  return (
    <section className="mt-8">
      <h2>{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3 border bg-background p-4 text-foreground">
        {colors.map(([name, value]) => (
          <article
            className="grid min-w-0 grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-3 border bg-card p-3 text-card-foreground"
            key={name}
          >
            <span
              aria-label={`${name} swatch`}
              className="block size-14 border"
              style={{ background: `var(${name})` }}
            />
            <span className="min-w-0">
              <code className="block wrap-break-word whitespace-normal">{name}</code>
              <small className="mt-1 block text-secondary-foreground">{value}</small>
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}
