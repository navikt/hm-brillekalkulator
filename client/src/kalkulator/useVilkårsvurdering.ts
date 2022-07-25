import type { AlertProps } from '@navikt/ds-react'
import { useEffect } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType } from '../types'
import { usePost } from '../usePost'
import type { KalkulatorFormData } from './KalkulatorForm'

interface Vilkår {
  variant: AlertProps['variant']
  beskrivelse: string
}

export interface Vilkårsvurdering {
  overskrift: string
  vilkår: Vilkår[]
}

export function useVilkårsvurdering(watch: UseFormWatch<KalkulatorFormData>): Vilkårsvurdering | undefined {
  const beregning = useBeregning(watch)

  const alder = Number(watch('alder'))
  const vedtak = watch('vedtak')
  const folketrygden = watch('folketrygden')

  let ok = true
  const vilkår: Vilkår[] = []

  if (!beregning || alder === -1) {
    return
  }
  if (alder < 0 || alder > 18) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: 'Barnet må være under 18 år',
    })
  }
  if (vedtak) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: 'Barnet kan kun få ett par briller per kalenderår',
    })
  }
  if (!folketrygden) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: 'Barnet må ha folkeregistrert adresse i Norge',
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
      beskrivelse: `Brillestyrken gir sats ${beregning.sats.replace('SATS_', '')}, inntil ${
        beregning.satsBeløp
      } kroner`,
    })
  }

  return {
    overskrift: ok ? `Du kan ha rett til brillestøtte` : 'Vilkårene for brillestøtte er ikke oppfylt',
    vilkår,
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
      }).catch(() => {
        reset()
      })
    } else if (data) {
      reset()
    }
  }, [høyreSfære, høyreSylinder, venstreSfære, venstreSylinder])

  return data
}
