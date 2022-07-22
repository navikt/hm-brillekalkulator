import { createApp } from './app'
import { config } from './config'
import { logger } from './logger'

try {
  const app = createApp()
  app.listen(config.port, () => logger.info(`Listening on port ${config.port}`))
} catch (err: unknown) {
  logger.error(err)
  process.exit(1)
}
