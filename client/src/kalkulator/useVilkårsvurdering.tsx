import React, { ReactNode, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import {
  BeregnSatsRequest,
  KalkulatorResultatResponse,
  SatsTypeBrillestøtte,
  SatsTypeAmblyopi,
  SatsType,
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
  const vedtak = appState.vedtak
  const folketrygden = appState.folketrygden

  const beregnSatsRequest: BeregnSatsRequest = {
    høyreSfære: appState.brilleseddel.høyreSfære,
    høyreSylinder: appState.brilleseddel.høyreSylinder,
    venstreSfære: appState.brilleseddel.venstreSfære,
    venstreSylinder: appState.brilleseddel.venstreSylinder,
    venstreAdd: appState.brilleseddel.venstreAdd,
    høyreAdd: appState.brilleseddel.høyreAdd,
    alder: alderUnder18,
    vedtak: appState.vedtak === 'ja',
    folketrygden: appState.folketrygden === 'ja',
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
    tekstAmblyopi.push(t('kalkulator.vilkår_alder_ikke_oppfylt'))
  }
  if (vedtak === 'ja') {
    ok = false
    tekst.push(t('kalkulator.vilkår_vedtak_ikke_oppfylt'))
    if (folketrygden === 'nei') {
      ok = false
      okAmblyopi = false
      tekst.push(
        <Trans t={t} i18nKey="kalkulator.vilkår_folketrygden_ikke_oppfylt">
          <></>
          <a href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden" />
        </Trans>
      )
      tekstAmblyopi.push(
        <Trans t={t} i18nKey="kalkulator.vilkår_folketrygden_ikke_oppfylt">
          <></>
          <a href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden" />
        </Trans>
      )
    }
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
          <BodyShort style={{ fontWeight: 700 }}>{t('kalkulator.hvordan_få_støtte')}</BodyShort>
        </Avstand>
        <Avstand marginTop={4}>{t('kalkulator.hvordan_få_støtte_brillestøtte')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_brillepris')}</Avstand>
      </>
    )
  }

  if (okAmblyopi) {
    tekstAmblyopi.push(
      <>
        <Avstand marginTop={5}>
          <BodyShort style={{ fontWeight: 700 }}>{t('kalkulator.hvordan_få_støtte')}</BodyShort>
        </Avstand>
        <Avstand marginTop={4}>{t('kalkulator.hvordan_få_støtte_amblyopi')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_brillepris')}</Avstand>
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
