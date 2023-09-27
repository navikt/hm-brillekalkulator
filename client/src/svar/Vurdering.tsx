import { BodyShort, Button, Heading, Link, Panel, Popover } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import React, { useRef, useState } from 'react'
import { digihot_customevents, logCustomEvent } from '../utils/amplitude'
import styled from 'styled-components'
import { Vilkårsvurdering } from '../kalkulator/useVilkårsvurdering'
import { BrillerIkon } from '../resources/svg/Briller'
import { SatsTypeAmblyopi } from '../types'
import { QuestionmarkIcon } from '@navikt/aksel-icons'

export function Vurdering(props: { type: 'brillestøtte' | 'amblyopi'; vurdering: Vilkårsvurdering }) {
  const { t } = useTranslation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [openState, setOpenState] = useState(false)

  return (
    <YtrePanel>
      {props.type === 'brillestøtte' && props.vurdering.flereOrdninger && (
        <>
          <div style={{ padding: '1rem' }}>
            <BodyShort>{t('kalkulator.støtte_to_ordninger')}</BodyShort>
          </div>
          <hr style={{borderTop: '1px solid #CBCFD5', marginBottom: '1.5rem'}}/>
        </>
      )}
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
        <div>
          {props.vurdering.satsType === SatsTypeAmblyopi.INDIVIDUELT ? (
            <div>
              <Heading level="2" size="xsmall" style={{ alignContent: 'center' }}>
                (Individuell sats)
              </Heading>
              <Button
                ref={buttonRef}
                onClick={() => {
                  setOpenState(true)
                }}
                style={{ border: 'none', backgroundColor: 'transparent', margin: 0, padding: 0 }}
              >
                <QuestionmarkIcon
                  title="a11y-title"
                  fontSize="1.5rem"
                  color="#236B7D"
                  style={{ border: 'solid', borderWidth: '2px', borderRadius: '1rem' }}
                />
              </Button>
              <Popover
                placement="right"
                open={openState}
                onClose={() => setOpenState(false)}
                anchorEl={buttonRef.current}
              >
                <Popover.Content>{t('kalkulator.om_individuell_sats')}</Popover.Content>
              </Popover>
            </div>
          ) : (
            <Heading level="2" spacing size="small">
              {props.vurdering.satsbeløp} kr ({props.vurdering.ok && props.vurdering.satsType.replace('SATS_', 'sats ')}
              )
            </Heading>
          )}
        </div>
      </VurderingPanel>
    </YtrePanel>
  )
}

const YtrePanel = styled(Panel)`
  background-color: var(--a-gray-100);
  border-radius: 10px;
  overflow: hidden;
`
const VurderingPanel = styled.div`
  background-color: var(--a-gray-100);
  display: grid;
  grid-template-columns: auto 1fr 0.15fr;
  column-gap: var(--a-spacing-3);
`
const Vilkår = styled.div`
  display: grid;
  gap: var(--a-spacing-3);
`
