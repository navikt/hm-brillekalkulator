import {
  BeregnSatsResponse,
  BeregnSatsResponseAmblyopi,
  Brilleseddel,
  KalkulatorResultatResponse,
  SatsTypeAmblyopi,
  SatsTypeBrillestøtte,
} from '../types'

const satser: Record<SatsTypeBrillestøtte, BeregnSatsResponse> = {
  [SatsTypeBrillestøtte.SATS_1]: {
    sats: SatsTypeBrillestøtte.SATS_1,
    satsBeskrivelse:
      'Briller med sfærisk styrke på minst ett glass ≥ 1,00D ≤ 4,00D og/eller cylinderstyrke ≥ 1,00D ≤ 4,00D',
    satsBeløp: 750,
  },
  [SatsTypeBrillestøtte.SATS_2]: {
    sats: SatsTypeBrillestøtte.SATS_2,
    satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 4,25D ≤ 6,00D og cylinderstyrke ≤ 4,00D',
    satsBeløp: 1950,
  },
  [SatsTypeBrillestøtte.SATS_3]: {
    sats: SatsTypeBrillestøtte.SATS_3,
    satsBeskrivelse:
      'Briller med sfærisk styrke på minst ett glass ≥ 6,25D ≤ 8,00D og/eller cylinderstyrke ≥ 4,25D ≤ 6,00D',
    satsBeløp: 2650,
  },
  [SatsTypeBrillestøtte.SATS_4]: {
    sats: SatsTypeBrillestøtte.SATS_4,
    satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 8,25D ≤ 10,00D og cylinderstyrke ≤ 6,00D',
    satsBeløp: 3150,
  },
  [SatsTypeBrillestøtte.SATS_5]: {
    sats: SatsTypeBrillestøtte.SATS_5,
    satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 10,25D og/eller cylinderstyrke ≥ 6,25D',
    satsBeløp: 4850,
  },
  [SatsTypeBrillestøtte.INGEN]: {
    sats: SatsTypeBrillestøtte.INGEN,
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
  [SatsTypeBrillestøtte.INGEN]: {
    sats: SatsTypeAmblyopi.INGEN,
    satsBeskrivelse: 'Briller med sfærisk styrke på minst ett glass ≥ 8,25D ≤ 10,00D og cylinderstyrke ≤ 6,00D',
    satsBeløp: 0,
  },
}

export function beregnSats(brilleseddel: Brilleseddel, alder: Boolean, strabisme: Boolean): KalkulatorResultatResponse {
  const høyreSfære = Number(brilleseddel.høyreSfære)
  const høyreSylinder = Number(brilleseddel.høyreSylinder)
  const venstreSfære = Number(brilleseddel.venstreSfære)
  const venstreSylinder = Number(brilleseddel.venstreSylinder)
  const høyreAdd = Number(brilleseddel.høyreAdd)
  const venstreAdd = Number(brilleseddel.venstreAdd)

  const sfære = Math.max(Math.abs(høyreSfære), Math.abs(venstreSfære))
  const sylinder = Math.max(Math.abs(høyreSylinder), Math.abs(venstreSylinder))
  const sylinderMin = Math.min(høyreSylinder, venstreSylinder)
  const add = Math.max(Math.abs(høyreAdd), Number(venstreAdd))

  let satsType: SatsTypeBrillestøtte = SatsTypeBrillestøtte.INGEN

  if (sfære >= 10.25 || sylinder >= 6.25) {
    satsType = SatsTypeBrillestøtte.SATS_5
  } else if (sfære >= 8.25 && sfære <= 10 && sylinder <= 6) {
    satsType = SatsTypeBrillestøtte.SATS_4
  } else if ((sfære >= 6.25 && sfære <= 8) || (sylinder >= 4.25 && sylinder <= 6)) {
    satsType = SatsTypeBrillestøtte.SATS_3
  } else if (sfære >= 4.25 && sfære <= 6 && sylinder <= 4) {
    satsType = SatsTypeBrillestøtte.SATS_2
  } else if ((sfære >= 1.25 && sfære <= 4) || (sylinder >= 1 && sylinder <= 4)) {
    satsType = SatsTypeBrillestøtte.SATS_1
  }

  let satsTypeAmblyopi = SatsTypeAmblyopi.INGEN

  if (sfære >= 6.25 || sylinderMin <= -4.0 || add >= 1.0) {
    satsTypeAmblyopi = SatsTypeAmblyopi.INDIVIDUELT
  } else if (sfære >= 4.0 && sfære <= 6.0) {
    satsTypeAmblyopi = SatsTypeAmblyopi.SATS_2
  } else if (sfære <= 3.75) {
    satsTypeAmblyopi = SatsTypeAmblyopi.SATS_1
  }

  if (!alder) {
    satsTypeAmblyopi = SatsTypeAmblyopi.INGEN
  }
  if (
    !strabisme &&
    !(Math.abs(høyreSylinder) >= 1.5) &&
    !(Math.abs(venstreSylinder) >= 1.5) &&
    !(Math.abs(høyreSfære - Math.abs(venstreSfære)) >= 1) &&
    !(høyreSfære >= 4 || venstreSfære >= 4)
  ) {
    satsTypeAmblyopi = SatsTypeAmblyopi.INGEN
  }

  const sats = satser[satsType]
  const satsAmplyopi = satserAmblyopi[satsTypeAmblyopi]
  return {
    brillestøtte: {
      ...sats,
    },
    amblyopistøtte: {
      ...satsAmplyopi,
    },
  }
}
