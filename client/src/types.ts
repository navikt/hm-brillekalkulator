import type { HttpError } from './error'

export interface Resultat<T> {
  data?: T
  error?: HttpError
  loading?: boolean
}

export interface Brilleseddel {
  høyreSfære: string
  høyreSylinder: string
  venstreSfære: string
  venstreSylinder: string
  bestillingsdato?: string
}
export interface BeregnSatsRequest extends Brilleseddel {}

export interface BeregnSatsResponse {
  sats: SatsType
  satsBeskrivelse: string
  satsBeløp: number
}

export enum SatsType {
  SATS_1 = 'SATS_1',
  SATS_2 = 'SATS_2',
  SATS_3 = 'SATS_3',
  SATS_4 = 'SATS_4',
  SATS_5 = 'SATS_5',
  INGEN = 'INGEN',
}
