import { Alert, Button, Heading, Link, Panel } from '@navikt/ds-react'
import { Trans, useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import React from 'react'
import { digihot_customevents, logCustomEvent } from '../utils/amplitude'
import styled from 'styled-components'
import { Vilkårsvurdering } from '../kalkulator/useVilkårsvurdering'
import { BrillerIkon } from '../resources/svg/Briller'

export function Vurdering(props: { type: 'brillestøtte' | 'amblyopi'; vurdering: Vilkårsvurdering }) {
  const { t } = useTranslation()

  return (
    <>
      <VurderingPanel role="alert">
        <BrillerIkon />
        <div>
          <Heading level="2" spacing size="medium">
            {props.vurdering.overskrift}
          </Heading>
          <Vilkår2>
            {props.vurdering.tekst.map((tekst, index) => (
              <div>{tekst}</div>
            ))}
          </Vilkår2>
          <Avstand marginTop={5}>
            <Link
              href="https://www.nav.no/briller-til-barn"
              onClick={() => logCustomEvent(digihot_customevents.KLIKK_MER_INFORMASJON_OM_ORDNINGEN)}
              underline={false}
              target="_blank"
              style={{fontSize: '1.15rem'}}
            >
              {t('kalkulator.knapp_mer_informasjon')}
            </Link>
          </Avstand>
        </div>
        <div>beløp</div>
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
      </VurderingPanel>
    </>
  )
}

const VurderingPanel = styled(Panel)`
  background-color: var(--a-gray-100);
  border-radius: 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: var(--a-spacing-3);
`

const Vilkår2 = styled.div`
  display: grid;
  gap: var(--a-spacing-3);
`
