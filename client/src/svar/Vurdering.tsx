import { BodyShort, Box, Heading, HelpText, HGrid, Link } from "@navikt/ds-react";
import { useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import React from 'react'
import { digihot_customevents, logCustomEvent } from '../utils/amplitude'
import { Vilkårsvurdering } from '../kalkulator/useVilkårsvurdering'
import { BrillerIkon } from '../resources/svg/Briller'
import { SatsTypeAmblyopi } from '../types'

export function Vurdering(props: { type: 'brillestøtte' | 'amblyopi'; vurdering: Vilkårsvurdering }) {
  const { t } = useTranslation()

  return (
    <Box.New background="neutral-moderate" borderRadius="large" padding="4">
      {props.type === 'brillestøtte' && props.vurdering.flereOrdninger && (
        <>
          <div style={{ padding: '1rem' }}>
            <BodyShort>{t('kalkulator.støtte_to_ordninger')}</BodyShort>
          </div>
          <hr style={{ borderTop: '1px solid #CBCFD5', marginBottom: '1.5rem' }} />
        </>
      )}
      <Box.New role="alert" borderRadius="large" background="neutral-moderate">
        <HGrid gap="space-12" columns="auto 1fr 0.15fr">
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
          <div>
            {props.vurdering.satsType === SatsTypeAmblyopi.INDIVIDUELT ? (
              <div>
                <Heading level="2" size="xsmall" style={{ alignContent: 'center' }}>
                  (Individuell sats)
                </Heading>
                <HelpText title="Hva betyr dette?">
                  {t('kalkulator.om_individuell_sats')}
                </HelpText>
              </div>
            ) : (
              <Heading level="2" spacing size="small">
                {props.vurdering.satsbeløp} kr ({props.vurdering.ok && props.vurdering.satsType.replace('SATS_', 'sats ')}
                )
              </Heading>
            )}
          </div>
        </HGrid>
      </Box.New>
    </Box.New>
  )
}
