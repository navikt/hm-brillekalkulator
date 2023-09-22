import type {HttpError} from './error'

export interface Resultat<T> {
    data?: T
    error?: HttpError
    loading?: boolean
}

export interface Brilleseddel {
    høyreSfære: string
    høyreSylinder: string
    høyreAdd: string
    venstreSfære: string
    venstreSylinder: string
    venstreAdd: string
    bestillingsdato?: string
}

export interface BeregnSatsRequest extends Brilleseddel {
    alder: boolean
    vedtak: boolean
    folketrygden: boolean
    strabisme: boolean

}

export interface BeregnSatsResponse {
    sats: SatsType
    satsBeskrivelse: string
    satsBeløp: number
}

export interface BeregnSatsResponseAmblyopi {
    sats: SatsTypeAmblyopi
    satsBeskrivelse: string
    satsBeløp: number
}

export interface KalkulatorResultatResponse {
    brillestøtte: BeregnSatsResponse
    amblyopistøtte: BeregnSatsResponseAmblyopi
}
export enum SatsType {
    SATS_1 = 'SATS_1',
    SATS_2 = 'SATS_2',
    SATS_3 = 'SATS_3',
    SATS_4 = 'SATS_4',
    SATS_5 = 'SATS_5',
    INGEN = 'INGEN',
}

export enum SatsTypeAmblyopi {
    SATS_1 = 'SATS_1',
    SATS_2 = 'SATS_2',
    INDIVIDUELT = 'INDIVIDUELT',
    INGEN = 'INGEN',
}