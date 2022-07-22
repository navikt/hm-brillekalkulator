import type { AlertProps } from '@navikt/ds-react'
import { useEffect } from 'react'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType } from '../types'
import { usePost } from '../usePost'

interface Vilkår {
  variant: AlertProps['variant']
  beskrivelse: string
}

export interface Vilkårsvurdering {
  overskrift: string
  vilkår: Vilkår[]
}

export function useVilkårsvurdering(watch: any): Vilkårsvurdering | undefined {
  const sats = useSats(watch)

  const alder = Number(watch('alder'))
  const vedtak = watch('vedtak')
  const folketrygden = watch('folketrygden')

  let ok = true
  const vilkår: Vilkår[] = []

  if (!sats || alder === -1) {
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
  if (sats.sats === SatsType.INGEN) {
    ok = false
    vilkår.push({
      variant: 'warning',
      beskrivelse: 'Vilkår om brillestyrke og/eller sylinderstyrke er ikke oppfylt',
    })
  }

  if (ok) {
    vilkår.push({
      variant: 'success',
      beskrivelse: `Brillestyrken gir sats ${sats.sats.replace('SATS_', '')}, inntil ${sats.satsBeløp} kroner`,
    })
  }

  return {
    overskrift: ok ? `Du kan ha rett til brillestøtte` : 'Vilkårene for brillestøtte er ikke oppfylt',
    vilkår,
  }
}

function useSats(watch: any) {
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
