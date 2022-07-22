import type { HttpError } from './error'

export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

export interface Resultat<T> {
  data?: T
  error?: HttpError
  loading?: boolean
}

export interface Brilleseddel {
  høyreSfære: number | ''
  høyreSylinder: number | ''
  venstreSfære: number | ''
  venstreSylinder: number | ''
}

export interface BeregnSatsRequest extends Brilleseddel {}

export interface BeregnSatsResponse {
  sats: SatsType
  satsBeskrivelse: string
  satsBeløp: number
}

export interface Vilkårsgrunnlag {
  orgnr: string
  fnrBarn: string
  brilleseddel: Brilleseddel
  bestillingsdato: string
  brillepris: string
}

export interface Vilkårsvurdering {
  resultat: VilkårsgrunnlagResultat
  sats: SatsType
  satsBeskrivelse: string
  satsBeløp: number
  beløp: string
}

export enum VilkårsgrunnlagResultat {
  JA = 'JA',
  NEI = 'NEI',
  KANSKJE = 'KANSKJE',
}

export enum SatsType {
  SATS_1 = 'SATS_1',
  SATS_2 = 'SATS_2',
  SATS_3 = 'SATS_3',
  SATS_4 = 'SATS_4',
  SATS_5 = 'SATS_5',
  INGEN = 'INGEN',
}
