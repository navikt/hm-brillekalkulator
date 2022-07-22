import express, { Express } from 'express'
import mustacheExpress from 'mustache-express'
import { config } from './config'
import { routes } from './routes'

export function createApp(): Express {
  const router = express.Router()
  router.use('/api/', routes.api())
  router.use('/internal/', routes.internal())
  router.use('/', routes.public())

  const app = express()
  app.use(config.base_path, router)
  app.set('views', config.build_path)
  app.set('view engine', 'mustache')
  app.engine('html', mustacheExpress())
  app.set('trust proxy', 1)

  return app
}
