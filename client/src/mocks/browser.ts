import { RequestHandler, rest, setupWorker } from 'msw'
import { apiUrl } from '../http'
import { BeregnSatsRequest, KalkulatorResultatResponse } from '../types'
import { beregnSats } from './beregnSats'

const handlers: RequestHandler[] = [
  rest.post<BeregnSatsRequest, {}, KalkulatorResultatResponse>(
    apiUrl('/kalkulator/beregningsgrunnlag'),
    (req, res, ctx) => {
      return res(
        ctx.delay(700),
        ctx.json(
          beregnSats(
            {
              høyreSfære: req.body.høyreSfære,
              høyreSylinder: req.body.høyreSylinder,
              høyreAdd: req.body.høyreAdd,
              venstreSfære: req.body.venstreSfære,
              venstreSylinder: req.body.venstreSylinder,
              venstreAdd: req.body.venstreAdd,
            },
            req.body.alder,
            req.body.strabisme
          )
        )
      )
    }
  ),
]

export const worker = setupWorker(...handlers)
