import supertest from 'supertest'
import { createApp } from '../src/app'

export const testApp = {
  app() {
    return supertest(createApp())
  },
  async get(url: string, token = 'secret') {
    return this.app()
      .get(url)
      .set(token ? { Authorization: `Bearer ${token}` } : {})
  },
}
