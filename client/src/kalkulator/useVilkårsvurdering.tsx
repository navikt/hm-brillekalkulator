import type { AlertProps } from '@navikt/ds-react'
import React, { useEffect, ReactNode } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import { Avstand } from '../components/Avstand'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType } from '../types'
import { usePost } from '../usePost'
import type { KalkulatorFormData } from './KalkulatorForm'

interface Vilkår {
  variant: AlertProps['variant']
  beskrivelse: ReactNode
}

export interface Vilkårsvurdering {
  overskrift: string
  vilkår: Vilkår[]
  ok: boolean
}

export function useVilkårsvurdering(watch: UseFormWatch<KalkulatorFormData>): Vilkårsvurdering | undefined {
  const beregning = useBeregning(watch)

  const alder = watch('alder')
  const vedtak = watch('vedtak')
  const folketrygden = watch('folketrygden')

  let ok = true
  const vilkår: Vilkår[] = []

  if (!beregning) {
    return
  }
  if (!alder) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: 'Personer over 18 år kan ikke få støtte til barnebriller.',
    })
  }
  if (vedtak) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse:
        'Barnet har allerede fått støtte til barnebriller i år. Du kan bare få støtte én gang i året gjennom denne ordningen.',
    })
  }
  if (!folketrygden) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: (
        <>
          Barnet har ikke folkeregistrert adresse i Norge. Det betyr vanligvis at barnet ikke er medlem av folketrygden
          og derfor ikke har rett på støtte. Du kan lese mer om{' '}
          <a href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden">
            medlemskap i folketrygden her.
          </a>
        </>
      ),
    })
  }
  if (beregning.sats === SatsType.INGEN) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: 'Vilkår om brillestyrke og/eller sylinderstyrke er ikke oppfylt',
    })
  }

  if (ok) {
    vilkår.push({
      variant: 'success',
      beskrivelse: (
        <>
          <Avstand>
            Barnet kan få inntil ${beregning.satsBeløp} kroner i støtte (${beregning.sats.replace('SATS_', 'sats ')}).
          </Avstand>
          <Avstand marginTop={4}>
            Hvis brillene koster mindre enn satsen, får du dekket det brillene koster. Hvis brillene koster mer enn
            satsen, må du betale resten selv.
          </Avstand>
        </>
      ),
    })
  }

  return {
    overskrift: ok ? `Barnet kan ha rett til brillestøtte` : 'Det ser ut som barnet ikke har rett til brillestøtte',
    vilkår,
    ok,
  }
}

function useBeregning(watch: UseFormWatch<KalkulatorFormData>) {
  const høyreSfære = watch('høyreSfære')
  const høyreSylinder = watch('høyreSylinder')
  const venstreSfære = watch('venstreSfære')
  const venstreSylinder = watch('venstreSylinder')

  const { post, data, reset } = usePost<BeregnSatsRequest, BeregnSatsResponse>('/brillesedler')

  useEffect(() => {
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
  }, [høyreSfære, høyreSylinder, venstreSfære, venstreSylinder])

  return data
}
