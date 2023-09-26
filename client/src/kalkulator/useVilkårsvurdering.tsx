import React, { ReactNode, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import { BeregnSatsRequest, KalkulatorResultatResponse, SatsType, SatsTypeAmblyopi } from '../types'
import { usePost } from '../usePost'
import { useApplicationContext } from '../state/ApplicationContext'

export interface Vilkårsvurdering {
  overskrift: string
  tekst: ReactNode[]
  ok: boolean
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

  const alder = appState.alder
  const vedtak = appState.vedtak
  const folketrygden = appState.folketrygden

  const beregnSatsRequest: BeregnSatsRequest = {
    høyreSfære: appState.brilleseddel.høyreSfære,
    høyreSylinder: appState.brilleseddel.høyreSylinder,
    venstreSfære: appState.brilleseddel.venstreSfære,
    venstreSylinder: appState.brilleseddel.venstreSylinder,
    venstreAdd: appState.brilleseddel.venstreAdd,
    høyreAdd: appState.brilleseddel.høyreAdd,
    alder: appState.alder === 'ja',
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

  if (alder === 'nei') {
    ok = false
    okAmblyopi = false
    tekst.push(t('kalkulator.vilkår_alder_ikke_oppfylt'))
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
    }
  }
  if (beregning.brillestøtte.sats === SatsType.INGEN) {
    ok = false
    tekst.push(t('kalkulator.vilkår_brillestyrke_ikke_oppfylt'))
  }

  if (beregning.amblyopistøtte.sats === SatsTypeAmblyopi.INGEN) {
    okAmblyopi = false
    tekst.push(t('kalkulator.vilkår_brillestyrke_ikke_oppfylt'))
  }

  if (ok) {
    tekst.push(
      <>
        <Avstand>
          {t('kalkulator.informasjon_om_sats', {
            sats: beregning.brillestøtte.sats.replace('SATS_', 'sats '),
            satsBeløp: beregning.brillestøtte.satsBeløp,
          })}
        </Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_brillepris')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_veiledende_svar')}</Avstand>
      </>
    )
  }

  if (okAmblyopi) {
    tekstAmblyopi.push(
      <>
        <Avstand>
          {t('kalkulator.informasjon_om_sats', {
            sats: beregning.amblyopistøtte.sats.replace('SATS_', 'sats '),
            satsBeløp: beregning.amblyopistøtte.satsBeløp,
          })}
        </Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_brillepris')}</Avstand>
        <Avstand marginTop={4}>{t('kalkulator.informasjon_om_veiledende_svar')}</Avstand>
      </>
    )
  }

  return {
    loading,
    vurderingBrillestøtte: {
      overskrift: t(ok ? 'kalkulator.vilkårsvurdering_ok' : 'kalkulator.vilkårsvurdering_ikke_ok'),
      tekst,
      ok,
    },
    vurderingAmblyopi: {
      overskrift: t(okAmblyopi ? 'kalkulator.vilkårsvurdering_amblyopi' : 'kalkulator.vilkårsvurdering_ikke_ok'),
      tekst: tekstAmblyopi,
      ok: okAmblyopi,
    },
  }
}
