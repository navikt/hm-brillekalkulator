import type { AlertProps } from '@navikt/ds-react'
import React, { ReactNode, useEffect } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType } from '../types'
import { usePost } from '../usePost'
import type { KalkulatorFormData } from './KalkulatorForm'

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

export function useVilkårsvurdering(watch: UseFormWatch<KalkulatorFormData>): Vilkårsvurdering {
  const { beregning, loading } = useBeregning(watch)
  const { t } = useTranslation()

  const alder = watch('alder')
  const vedtak = watch('vedtak')
  const folketrygden = watch('folketrygden')

  let ok = true
  const vilkår: Vilkår[] = []

  if (!beregning) {
    return { loading }
  }

  if (alder === false) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: t('kalkulator.vilkår_alder_ikke_oppfylt'),
    })
  }
  if (vedtak === true) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: t('kalkulator.vilkår_vedtak_ikke_oppfylt'),
    })
  }
  if (folketrygden === false) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: (
        <Trans t={t} i18nKey="kalkulator.vilkår_folketrygden_ikke_oppfylt">
          <></>
          <a href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden" />
        </Trans>
      ),
    })
  }
  if (beregning.sats === SatsType.INGEN) {
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
              sats: beregning.sats.replace('SATS_', 'sats '),
              satsBeløp: beregning.satsBeløp,
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

function useBeregning(watch: UseFormWatch<KalkulatorFormData>) {
  const alder = watch('alder')
  const vedtak = watch('vedtak')
  const folketrygden = watch('folketrygden')
  const høyreSfære = watch('høyreSfære')
  const høyreSylinder = watch('høyreSylinder')
  const venstreSfære = watch('venstreSfære')
  const venstreSylinder = watch('venstreSylinder')

  const { post, data, reset, loading } = usePost<BeregnSatsRequest, BeregnSatsResponse>('/brillesedler')

  useEffect(() => {
    if (alder === null || vedtak === null || folketrygden === null) {
      return
    }

    if (høyreSfære && høyreSylinder && venstreSfære && venstreSylinder) {
      post({
        høyreSfære,
        høyreSylinder,
        venstreSfære,
        venstreSylinder,
      }).catch(() => reset())
    } else if (data) {
      reset()
    }
  }, [høyreSfære, høyreSylinder, venstreSfære, venstreSylinder, alder, vedtak, folketrygden])

  return { beregning: data, loading }
}
