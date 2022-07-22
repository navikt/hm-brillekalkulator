import nock from 'nock'
import { config } from '../src/config'
import { testApp } from './test-app'

describe('app', () => {
  describe('/api', () => {
    test('/api/foobar skal svare med 200', async () => {
      const scope = nock(config.api.brille_api_base_url)
      scope.get('/api/foobar').reply(200, { foo: 'bar' })
      const response = await testApp.get('/api/foobar')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ foo: 'bar' })
      expect(scope.isDone()).toBe(true)
    })
  })
  describe('/internal', () => {
    test('/isalive skal svare med 200', async () => {
      const response = await testApp.get('/internal/isalive')
      expect(response.statusCode).toBe(200)
    })
    test('/isready skal svare med 200', async () => {
      const response = await testApp.get('/internal/isready')
      expect(response.statusCode).toBe(200)
    })
    test('/metrics skal svare med 200', async () => {
      const response = await testApp.get('/internal/metrics')
      expect(response.statusCode).toBe(200)
    })
  })
  describe('/', () => {
    test('/settings.js skal svare med 200', async () => {
      const response = await testApp.get('/settings.js')
      expect(response.statusCode).toBe(200)
    })
  })
})
