import { RequestHandler, rest, setupWorker } from 'msw'
import { apiUrl } from '../http'
import { BeregnSatsRequest, BeregnSatsResponse } from '../types'
import { beregnSats } from './beregnSats'

const handlers: RequestHandler[] = [
  rest.post<BeregnSatsRequest, {}, BeregnSatsResponse>(apiUrl('/brillesedler'), (req, res, ctx) => {
    return res(
      ctx.delay(700),
      ctx.json(
        beregnSats({
          høyreSfære: req.body.høyreSfære,
          høyreSylinder: req.body.høyreSylinder,
            høyreAdd: req.body.høyreAdd,
          venstreSfære: req.body.venstreSfære,
          venstreSylinder: req.body.venstreSylinder,
            venstreAdd: req.body.venstreAdd
        })
      )
    )
  }),
]

export const worker = setupWorker(...handlers)
