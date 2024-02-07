export default function useHostUrl() {
  const config = useRuntimeConfig()
  const scheme = config.public.API_HOST.startsWith('dev.') ? 'http' : 'https'
  return `${scheme}://${config.public.API_HOST}`
}
