import { Heading, Link, Panel } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import React from 'react'
import { digihot_customevents, logCustomEvent } from '../utils/amplitude'
import styled from 'styled-components'
import { Vilkårsvurdering } from '../kalkulator/useVilkårsvurdering'
import { BrillerIkon } from '../resources/svg/Briller'

export function VurderingAvslag(props: { type: 'brillestøtte' | 'amblyopi'; vurdering: Vilkårsvurdering }) {
  const { t } = useTranslation()

  return (
    <>
      <VurderingPanel role="alert">
        <BrillerIkon />
        <div>
          <Heading level="2" spacing size="medium">
            {props.vurdering.overskrift}
          </Heading>
          <Vilkår>
            {props.vurdering.tekst.map((tekst, index) => (
              <div>{tekst}</div>
            ))}
          </Vilkår>
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
      </VurderingPanel>
    </>
  )
}

const VurderingPanel = styled(Panel)`
  background-color: var(--a-gray-100);
  border-radius: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: var(--a-spacing-3);
`

const Vilkår = styled.div`
  display: grid;
  gap: var(--a-spacing-3);
`
