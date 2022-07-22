import { useEffect } from 'react'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType } from '../types'
import { usePost } from '../usePost'

export interface Vilkårsvurdering {
  ok: boolean
  overskrift: string
  vilkår: string[]
}

export function useVilkårsvurdering(watch: any): Vilkårsvurdering | undefined {
  const sats = useSats(watch)

  const alder = Number(watch('alder'))
  const vedtak = watch('vedtak')
  const folketrygden = watch('folketrygden')

  let ok = true
  const vilkår: string[] = []

  if (!sats) {
    return
  }
  if (alder < 0 || alder > 18) {
    ok = false
    vilkår.push('Barnet må være under 18 år')
  }
  if (vedtak) {
    ok = false
    vilkår.push('Barnet kan kun få ett par briller per kalenderår')
  }
  if (!folketrygden) {
    ok = false
    vilkår.push('Barnet må ha folkeregistrert adresse i Norge')
  }
  if (sats.sats === SatsType.INGEN) {
    ok = false
    vilkår.push('Vilkår om brillestyrke og/eller sylinderstyrke er ikke oppfylt')
  }

  if (ok) {
    vilkår.push(`Barnet kan få støtte fra sats ${sats.sats.replace('SATS_', '')}: ${sats.satsBeskrivelse}`)
  }

  return {
    ok,
    overskrift: ok ? `Brillestøtte på opp til ${sats.satsBeløp} kroner` : 'Vilkårene er ikke oppfylt',
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
