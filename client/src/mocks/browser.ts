import { RequestHandler, http, HttpResponse } from "msw";
import { apiUrl } from '../http'
import { BeregnSatsRequest, KalkulatorResultatResponse } from '../types'
import { beregnSats } from './beregnSats'
import { setupWorker } from "msw/browser";

const handlers: RequestHandler[] = [
  http.post< {}, BeregnSatsRequest, KalkulatorResultatResponse>(
    apiUrl('/kalkulator/beregningsgrunnlag'),
    async ({request}) => {
      const req = await request.json()
      return HttpResponse.json(
          beregnSats(
            {
              høyreSfære: req.høyreSfære,
              høyreSylinder: req.høyreSylinder,
              høyreAdd: req.høyreAdd,
              venstreSfære: req.venstreSfære,
              venstreSylinder: req.venstreSylinder,
              venstreAdd: req.venstreAdd,
            },
            req.alder,
            req.strabisme
          )
      )
    }
  ),
]

export const worker = setupWorker(...handlers)
