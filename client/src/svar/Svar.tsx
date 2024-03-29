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
import { IngenStøtte } from './IngenStøtte'
import { VurderingAvslag } from './VurderingAvslag'
import { useApplicationContext } from '../state/ApplicationContext'

export function Svar() {
  const { t } = useTranslation()
  const vilkårsvurdering = useVilkårsvurdering()
  const navigate = useNavigate()
  const { appState } = useApplicationContext()

  useEffect(() => {
    logVilkårsvurderingVist()
    if (appState.brilleseddel === null) {
      navigate('/')
    }
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
              {vilkårsvurdering.vurderingAmblyopi?.ok || vilkårsvurdering.vurderingBrillestøtte?.ok ? (
                <SuccessTop>
                  <CheckmarkCircleFillIcon aria-label="suksess" title="suksess" fontSize="1.5rem" color="green" />
                  <Heading level="2" size="large">
                    {t('kalkulator.vilkårsvurdering_ok')}
                  </Heading>
                  <div style={{ gridColumnStart: 2, display: 'flex', justifyContent: 'flex-start', padding: '1rem 0' }}>
                    <InformationSquareFillIcon aria-label="informasjon" title="informasjon" fontSize="1.5rem" color="#236B7D" />
                    <div style={{ width: '80%', paddingLeft: '0.5rem' }}>
                      {t('kalkulator.informasjon_om_veiledende_svar')}
                    </div>
                  </div>
                </SuccessTop>
              ) : (
                <>
                  <IngenStøtte />
                  {vilkårsvurdering.vurderingAmblyopi && vilkårsvurdering.vurderingBrillestøtte && (
                    <>
                      <VurderingAvslag type="amblyopi" vurdering={vilkårsvurdering.vurderingAmblyopi} />
                      <Avstand marginTop={5} />
                      <VurderingAvslag type="brillestøtte" vurdering={vilkårsvurdering.vurderingBrillestøtte} />
                    </>
                  )}
                </>
              )}
              {vilkårsvurdering.vurderingAmblyopi?.ok && (
                <Vurdering type="amblyopi" vurdering={vilkårsvurdering.vurderingAmblyopi} />
              )}
              {vilkårsvurdering.vurderingAmblyopi?.ok && vilkårsvurdering.vurderingBrillestøtte?.ok && (
                <Avstand marginTop={5} />
              )}
              {vilkårsvurdering.vurderingBrillestøtte?.ok && (
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
