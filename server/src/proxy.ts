import proxy, { ProxyOptions } from 'express-http-proxy'
import { config } from './config'

function createProxy(host: string, options: ProxyOptions) {
  return proxy(host, {
    parseReqBody: false,
    ...options,
  })
}

export const proxyHandlers = {
  api() {
    return createProxy(config.api.brille_api_base_url, {
      proxyReqPathResolver(req) {
        return req.originalUrl.replace('/hjelpemidler/brillekalkulator/', '/')
      },
    })
  },
}
