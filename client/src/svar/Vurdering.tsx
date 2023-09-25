import { Alert, Button, Heading, Panel } from '@navikt/ds-react'
import { Trans, useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import React from 'react'
import { digihot_customevents, logCustomEvent } from '../utils/amplitude'
import styled from 'styled-components'
import { Vilkårsvurdering } from '../kalkulator/useVilkårsvurdering'

export function Vurdering(props: { type: 'brillestøtte' | 'amblyopi'; vurdering: Vilkårsvurdering }) {
  const { t } = useTranslation()

  return (
    <>
      <VilkårsvurderingPanel role="alert">
        <Heading level="2" spacing size="medium">
          {props.vurdering.overskrift}
        </Heading>
        <Vilkår>
          {props.vurdering.vilkår.map(({ variant, beskrivelse }, index) => (
            <Alert key={index} variant={variant} inline>
              {beskrivelse}
            </Alert>
          ))}
        </Vilkår>
        <Avstand marginTop={5}>
          <Button
            as="a"
            variant="secondary"
            href="https://www.nav.no/briller-til-barn"
            onClick={() => logCustomEvent(digihot_customevents.KLIKK_MER_INFORMASJON_OM_ORDNINGEN)}
            target="_blank"
          >
            {t('kalkulator.knapp_mer_informasjon')}
          </Button>
        </Avstand>
        {!props.vurdering.ok && (
          <Avstand marginTop={5}>
            <Trans t={t} i18nKey="kalkulator.vilkår_ikke_oppfylt" role="alert">
              <></>
              <a
                href="https://www.nav.no/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/hjelpemidler/syn"
                target="_blank"
              />
            </Trans>
          </Avstand>
        )}
      </VilkårsvurderingPanel>
    </>
  )
}

const VilkårsvurderingPanel = styled(Panel)`
  background-color: var(--a-gray-100);
  border-radius: 10px;
`

const Vilkår = styled.div`
  display: grid;
  gap: var(--a-spacing-3);
`
