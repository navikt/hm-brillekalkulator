import { RequestHandler, rest, setupWorker } from 'msw'
import { apiUrl } from '../http'
import { BeregnSatsRequest, BeregnSatsResponse } from '../types'
import { beregnSats } from './beregnSats'

const handlers: RequestHandler[] = [
  rest.post<BeregnSatsRequest, {}, BeregnSatsResponse>(apiUrl('/brillesedler'), (req, res, ctx) => {
    return res(
      ctx.delay(800),
      ctx.json(
        beregnSats({
          høyreSfære: req.body.høyreSfære,
          høyreSylinder: req.body.høyreSylinder,
          venstreSfære: req.body.venstreSfære,
          venstreSylinder: req.body.venstreSylinder,
        })
      )
    )
  }),
]

export const worker = setupWorker(...handlers)
