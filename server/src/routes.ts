import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'
import express, { RequestHandler, Router } from 'express'
import { config } from './config'
import { logger } from './logger'
import { createMetrics } from './metrics'
import { proxyHandlers } from './proxy'

export const routes = {
  internal(): Router {
    const metrics = createMetrics()
    return Router()
      .get('/isalive', (_, res) => res.send('alive'))
      .get('/isready', (_, res) => res.send('ready'))
      .get('/metrics', async (req, res) => {
        res.set('Content-Type', metrics.contentType)
        res.end(await metrics.metrics())
      })
  },
  api(): Router {
    return Router().use(proxyHandlers.api())
  },
  public(): Router {
    return Router()
      .get('/settings.js', settingsHandler)
      .get('*', express.static(config.build_path, { index: false }))
      .get('*', spaHandler)
  },
}

const spaHandler: RequestHandler = async (req, res) => {
  try {
    const decorator = await fetchDecoratorHtml({
      env: config.nais_cluster_name === 'prod-gcp' ? 'prod' : 'dev',
      context: 'privatperson',
      chatbot: false,
      language: 'nb',
      availableLanguages: [
        {
          locale: 'nb',
          handleInApp: true,
        },
        {
          locale: 'nn',
          handleInApp: true,
        },
      ],
    })
    res.render('index.html', decorator)
  } catch (err: unknown) {
    const error = `Feil under henting av dekoratør: ${err}`
    logger.error(error)
    res.status(500).send(error)
  }
}

const settingsHandler: RequestHandler = (req, res) => {
  const appSettings = {
    GIT_COMMIT: config.git_commit,
    MILJO: config.nais_cluster_name,
    USE_MSW: config.use_msw,
  }
  res.type('.js')
  res.send(`window.appSettings = ${JSON.stringify(appSettings)}`)
}
