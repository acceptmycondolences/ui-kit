export function getRequiredEnv(env: ImportMetaEnv, key: string) {
  const value = env[key] as string | undefined

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}
