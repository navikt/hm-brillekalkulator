import { Heading, Link, Box, HGrid } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import React from 'react'
import { digihot_customevents, logCustomEvent } from '../utils/amplitude'
import { Vilkårsvurdering } from '../kalkulator/useVilkårsvurdering'
import { BrillerIkon } from '../resources/svg/Briller'

export function VurderingAvslag(props: { type: 'brillestøtte' | 'amblyopi'; vurdering: Vilkårsvurdering }) {
  const { t } = useTranslation()

  return (
    <>
      <Box.New role="alert" padding="4" borderRadius="large" background="neutral-moderate">
        <HGrid columns="auto 1fr" gap="space-12">
          <BrillerIkon />
          <div>
            <Heading level="2" spacing size="medium">
              {props.vurdering.overskrift}
            </Heading>
            <HGrid gap="space-12">
              {props.vurdering.tekst.map((tekst, index) => (
                <div key={index}>{tekst}</div>
              ))}
            </HGrid>
            <Avstand marginTop={5}>
              <Link
                href={
                  props.type === 'brillestøtte' ? 'https://www.nav.no/briller-til-barn' : 'https://www.nav.no/amblyopi'
                }
                onClick={() => logCustomEvent(digihot_customevents.KLIKK_MER_INFORMASJON_OM_ORDNINGEN)}
                underline={false}
                target="_blank"
                style={{ fontSize: '1.15rem' }}
              >
                {t('kalkulator.knapp_mer_informasjon')}
              </Link>
            </Avstand>
          </div>
        </HGrid>
      </Box.New>
    </>
  )
}