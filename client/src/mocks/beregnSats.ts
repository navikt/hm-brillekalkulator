import {
    BeregnSatsResponse,
    BeregnSatsResponseAmblyopi,
    Brilleseddel,
    KalkulatorResultatResponse,
    SatsType,
    SatsTypeAmblyopi
} from '../types'

const satser: Record<SatsType, BeregnSatsResponse> = {
    [SatsType.SATS_1]: {
        sats: SatsType.SATS_1,
        satsBeskrivelse:
            'Briller med sfærisk styrke på minst ett glass ≥ 1,00D ≤ 4,00D og/eller cylinderstyrke ≥ 1,00D ≤ 4,00D',
        satsBeløp: 750,
    },
    [SatsType.SATS_2]: {
        sats: SatsType.SATS_2,
        satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 4,25D ≤ 6,00D og cylinderstyrke ≤ 4,00D',
        satsBeløp: 1950,
    },
    [SatsType.SATS_3]: {
        sats: SatsType.SATS_3,
        satsBeskrivelse:
            'Briller med sfærisk styrke på minst ett glass ≥ 6,25D ≤ 8,00D og/eller cylinderstyrke ≥ 4,25D ≤ 6,00D',
        satsBeløp: 2650,
    },
    [SatsType.SATS_4]: {
        sats: SatsType.SATS_4,
        satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 8,25D ≤ 10,00D og cylinderstyrke ≤ 6,00D',
        satsBeløp: 3150,
    },
    [SatsType.SATS_5]: {
        sats: SatsType.SATS_5,
        satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 10,25D og/eller cylinderstyrke ≥ 6,25D',
        satsBeløp: 4850,
    },
    [SatsType.INGEN]: {
        sats: SatsType.INGEN,
        satsBeskrivelse: 'N/A',
        satsBeløp: 0,
    },
}

const satserAmblyopi: Record<SatsTypeAmblyopi, BeregnSatsResponseAmblyopi> = {
    [SatsTypeAmblyopi.SATS_1]: {
        sats: SatsTypeAmblyopi.SATS_1,
        satsBeskrivelse:
            'Briller med sfærisk styrke på minst ett glass ≥ 1,00D ≤ 4,00D og/eller cylinderstyrke ≥ 1,00D ≤ 4,00D',
        satsBeløp: 1230,
    },
    [SatsTypeAmblyopi.SATS_2]: {
        sats: SatsTypeAmblyopi.SATS_2,
        satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 4,25D ≤ 6,00D og cylinderstyrke ≤ 4,00D',
        satsBeløp: 2460,
    },
    [SatsTypeAmblyopi.INDIVIDUELT]: {
        sats: SatsTypeAmblyopi.INDIVIDUELT,
        satsBeskrivelse:
            'Briller med sfærisk styrke på minst ett glass ≥ 6,25D ≤ 8,00D og/eller cylinderstyrke ≥ 4,25D ≤ 6,00D',
        satsBeløp: 0,
    },
    [SatsType.INGEN]: {
        sats: SatsTypeAmblyopi.INGEN,
        satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 8,25D ≤ 10,00D og cylinderstyrke ≤ 6,00D',
        satsBeløp: 0,
    },
}

export function beregnSats(brilleseddel: Brilleseddel): KalkulatorResultatResponse {
    const høyreSfære = Number(brilleseddel.høyreSfære)
    const høyreSylinder = Number(brilleseddel.høyreSylinder)
    const venstreSfære = Number(brilleseddel.venstreSfære)
    const venstreSylinder = Number(brilleseddel.venstreSylinder)

    const sfære = Math.max(Math.abs(høyreSfære), Math.abs(venstreSfære))
    const sylinder = Math.max(Math.abs(høyreSylinder), Math.abs(venstreSylinder))

    let satsType: SatsType = SatsType.INGEN
    let satsTypeAmblyopi = SatsTypeAmblyopi.INGEN
    if (sfære >= 10.25 || sylinder >= 6.25) {
        satsType = SatsType.SATS_5
        satsTypeAmblyopi = SatsTypeAmblyopi.INDIVIDUELT
    } else if (sfære >= 8.25 && sfære <= 10 && sylinder <= 6) {
        satsType = SatsType.SATS_4
        satsTypeAmblyopi = SatsTypeAmblyopi.INDIVIDUELT
    } else if ((sfære >= 6.25 && sfære <= 8) || (sylinder >= 4.25 && sylinder <= 6)) {
        satsType = SatsType.SATS_3
        satsTypeAmblyopi = SatsTypeAmblyopi.INDIVIDUELT
    } else if (sfære >= 4.25 && sfære <= 6 && sylinder <= 4) {
        satsTypeAmblyopi = SatsTypeAmblyopi.SATS_2
        satsType = SatsType.SATS_2
    } else if ((sfære >= 1 && sfære <= 4) || (sylinder >= 1 && sylinder <= 4)) {
        satsType = SatsType.SATS_1
        satsTypeAmblyopi = SatsTypeAmblyopi.SATS_1
    }

    const sats = satser[satsType]
    const satsAmplyopi = satserAmblyopi[satsTypeAmblyopi]
    return {
        brillestøtte: {
            ...sats,
        },
        amblyopistøtte: {
            ...satsAmplyopi,
        }

    }
}
