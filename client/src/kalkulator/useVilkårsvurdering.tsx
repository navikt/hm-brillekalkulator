import React, { ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import {
  BeregnSatsRequest,
  KalkulatorResultatResponse,
  SatsType,
  SatsTypeAmblyopi,
  SatsTypeBrillestøtte,
} from '../types'
import { usePost } from '../usePost'
import { useApplicationContext } from '../state/ApplicationContext'
import { BodyShort } from '@navikt/ds-react'

export interface Vilkårsvurdering {
  overskrift: string
  tekst: ReactNode[]
  satsType: SatsType
  satsbeløp: number
  ok: boolean
  flereOrdninger: boolean
}

export interface KalkulatorResultat {
  loading: boolean | undefined
  vurderingBrillestøtte?: Vilkårsvurdering
  vurderingAmblyopi?: Vilkårsvurdering
}

export function useVilkårsvurdering(): KalkulatorResultat {
  const { t } = useTranslation()
  const { appState } = useApplicationContext()
  const {
    post: beregnSats,
    data: beregning,
    reset,
    loading,
  } = usePost<BeregnSatsRequest, KalkulatorResultatResponse>('/kalkulator/beregningsgrunnlag')

  const alder = Number(appState.alder)
  const alderUnder18 = alder < 18
  const alderUnder10 = alder < 10

  if (appState.brilleseddel === null) {
    return { loading: true }
  }

  const beregnSatsRequest: BeregnSatsRequest = {
    høyreSfære: appState.brilleseddel.høyreSfære,
    høyreSylinder: appState.brilleseddel.høyreSylinder,
    venstreSfære: appState.brilleseddel.venstreSfære,
    venstreSylinder: appState.brilleseddel.venstreSylinder,
    venstreAdd: appState.brilleseddel.venstreAdd,
    høyreAdd: appState.brilleseddel.høyreAdd,
    alder: alderUnder18,
    strabisme: appState.strabisme === 'ja',
  }

  useEffect(() => {
    beregnSats(beregnSatsRequest)
  }, [])

  let ok = true
  let okAmblyopi = true
  const tekst: ReactNode[] = []
  const tekstAmblyopi: ReactNode[] = []

  if (!beregning) {
    return { loading }
  }

  if (!alderUnder18) {
    ok = false
    tekst.push(t('kalkulator.vilkår_alder_ikke_oppfylt'))
  }
  if (!alderUnder10) {
    okAmblyopi = false
    tekstAmblyopi.push(t('kalkulator.vilkår_alder_amblyopi_ikke_oppfylt'))
  }

  if (beregning.brillestøtte.sats === SatsTypeBrillestøtte.INGEN && ok) {
    ok = false
    tekst.push(t('kalkulator.vilkår_brillestyrke_ikke_oppfylt'))
  }

  if (beregning.amblyopistøtte.sats === SatsTypeAmblyopi.INGEN && okAmblyopi) {
    okAmblyopi = false
    tekstAmblyopi.push(t('kalkulator.vilkår_brillestyrke_ikke_oppfylt'))
  }

  if (ok) {
    tekst.push(
      <>
        <Avstand marginTop={5}>
          <h3 style={{ fontWeight: 700 }}>{t('kalkulator.hvordan_få_støtte')}</h3>
        </Avstand>
        <Avstand marginTop={4}>{t('kalkulator.hvordan_få_støtte_brillestøtte')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_brillepris')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.vilkår_vedtak_forklaring')}</Avstand>
      </>
    )
  }

  if (okAmblyopi && beregning.amblyopistøtte.sats === SatsTypeAmblyopi.INDIVIDUELT) {
    tekstAmblyopi.push(
      <>
        <Avstand marginTop={5}>
          <h3 style={{ fontWeight: 700 }}>{t('kalkulator.hvordan_få_støtte')}</h3>
        </Avstand>
        <Avstand marginTop={4}>{t('kalkulator.hvordan_få_støtte_amblyopi')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.hva_dekkes_individuell_sats')}</Avstand>
      </>
    )
  } else if (okAmblyopi && beregning.amblyopistøtte.sats !== SatsTypeAmblyopi.INDIVIDUELT) {
    tekstAmblyopi.push(
      <>
        <Avstand marginTop={5}>
          <h3 style={{ fontWeight: 700 }}>{t('kalkulator.hvordan_få_støtte')}</h3>
        </Avstand>
        <Avstand marginTop={4}>{t('kalkulator.hvordan_få_støtte_amblyopi')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_brillepris_amblyopi')}</Avstand>
      </>
    )
  }

  return {
    loading,
    vurderingBrillestøtte: {
      overskrift: t('kalkulator.overskrift_brillestøtte'),
      tekst,
      satsType: beregning.brillestøtte.sats,
      satsbeløp: beregning.brillestøtte.satsBeløp,
      ok,
      flereOrdninger: ok && okAmblyopi,
    },
    vurderingAmblyopi: {
      overskrift: t('kalkulator.vilkårsvurdering_amblyopi'),
      tekst: tekstAmblyopi,
      satsType: beregning.amblyopistøtte.sats,
      satsbeløp: beregning.amblyopistøtte.satsBeløp,
      ok: okAmblyopi,
      flereOrdninger: ok && okAmblyopi,
    },
  }
}
