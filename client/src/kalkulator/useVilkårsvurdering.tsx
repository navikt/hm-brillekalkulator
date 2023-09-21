import type {AlertProps} from '@navikt/ds-react'
import React, {ReactNode, useEffect} from 'react'
import {Trans, useTranslation} from 'react-i18next'
import {Avstand} from '../components/Avstand'
import {BeregnSatsRequest, BeregnSatsResponse, KalkulatorResultatResponse, SatsType} from '../types'
import {usePost} from '../usePost'
import {useApplicationContext} from "../state/ApplicationContext";

interface Vilkår {
    variant: AlertProps['variant']
    beskrivelse: ReactNode
}

export interface Vilkårsvurdering {
    loading: boolean | undefined
    vurdering?: {
        overskrift: string
        vilkår: Vilkår[]
        ok: boolean
    }
}

export function useVilkårsvurdering(): Vilkårsvurdering {
    const {t} = useTranslation()
    const {appState} = useApplicationContext()
    const {
        post: beregnSats,
        data: beregning,
        reset,
        loading
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
    const vilkår: Vilkår[] = []

    if (!beregning) {
        return {loading}
    }

    if (alder === "nei") {
        ok = false
        vilkår.push({
            variant: 'warning',
            beskrivelse: t('kalkulator.vilkår_alder_ikke_oppfylt'),
        })
    }
    if (vedtak === "ja") {
        console.log('vedtak er ingen')
        ok = false
        vilkår.push({
            variant: 'warning',
            beskrivelse: t('kalkulator.vilkår_vedtak_ikke_oppfylt'),
        })
    }
    if (folketrygden === "nei") {
        console.log('ft er ingen')
        ok = false
        vilkår.push({
            variant: 'warning',
            beskrivelse: (
                <Trans t={t} i18nKey="kalkulator.vilkår_folketrygden_ikke_oppfylt">
                    <></>
                    <a href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden"/>
                </Trans>
            ),
        })
    }
    if (beregning.brillestøtte.sats === SatsType.INGEN) {
        console.log('sats er ingen')
        console.log(appState.brilleseddel)
        ok = false
        vilkår.push({
            variant: 'warning',
            beskrivelse: t('kalkulator.vilkår_brillestyrke_ikke_oppfylt'),
        })
    }

    if (ok) {
        vilkår.push({
            variant: 'success',
            beskrivelse: (
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
            ),
        })
    }

    return {
        loading,
        vurdering: {
            overskrift: t(ok ? 'kalkulator.vilkårsvurdering_ok' : 'kalkulator.vilkårsvurdering_ikke_ok'),
            vilkår,
            ok,
        },
    }
}

