import { Button, Heading, Loader } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { Banner } from '../components/Banner'
import { HotjarTrigger } from '../components/hotjar-trigger'
import { ScrollToTop } from '../components/ScrollToTop'
import { Avstand } from '../components/Avstand'
import React, { useEffect } from 'react'
import { logVilkårsvurderingVist } from '../utils/amplitude'
import styled from 'styled-components'
import { useVilkårsvurdering } from '../kalkulator/useVilkårsvurdering'
import { useNavigate } from 'react-router-dom'
import { CheckmarkCircleFillIcon, InformationSquareFillIcon } from '@navikt/aksel-icons'
import { Vurdering } from './Vurdering'

export function Svar() {
  const { t } = useTranslation()
  const vilkårsvurdering = useVilkårsvurdering()
  const navigate = useNavigate()

  useEffect(() => {
    logVilkårsvurderingVist()
  }, [])

  HotjarTrigger({ timeout: 10000, trigger: 'digihot_hm_brillekalkulator' })
  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            {t('kalkulator.overskrift')}
          </Heading>
        </Banner>
      </header>
      <main>
        <ScrollToTop />
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          Tilbake
        </Button>
        <Avstand marginTop={10} marginBottom={5}>
          {vilkårsvurdering.loading ? (
            <Centered>
              <Loader size="xlarge" />
            </Centered>
          ) : (
            <>
              {(vilkårsvurdering.vurderingAmblyopi?.ok || vilkårsvurdering.vurderingBrillestøtte?.ok) && (
                <SuccessTop>
                  <CheckmarkCircleFillIcon title="a11y-title" fontSize="1.5rem" color="green" />
                  <Heading level="2" size="medium">
                    {t('kalkulator.vilkårsvurdering_ok')}
                  </Heading>
                  <div style={{ gridColumnStart: 2, display: 'flex', justifyContent: 'flex-start', padding: '1rem 0' }}>
                    <InformationSquareFillIcon title="a11y-title" fontSize="1.5rem" color="#236B7D" />
                    <div style={{ width: '80%', paddingLeft: '0.5rem' }}>
                      Dette er kun et veiledende svar. Endelig svar får du etter et besøk hos optiker eller etter at NAV
                      har behandlet innsendt søknad.
                    </div>
                  </div>
                </SuccessTop>
              )}
              {vilkårsvurdering.vurderingAmblyopi && (
                <Vurdering type="amblyopi" vurdering={vilkårsvurdering.vurderingAmblyopi} />
              )}
              {vilkårsvurdering.vurderingAmblyopi && vilkårsvurdering.vurderingBrillestøtte && (
                <Avstand marginTop={5} />
              )}
              {vilkårsvurdering.vurderingBrillestøtte && (
                <Vurdering type="brillestøtte" vurdering={vilkårsvurdering.vurderingBrillestøtte} />
              )}
            </>
          )}
        </Avstand>
      </main>
    </>
  )
}

const Centered = styled.div`
  text-align: center;
`

const SuccessTop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: var(--a-spacing-3);
  margin-bottom: var(--a-spacing-3);
`
