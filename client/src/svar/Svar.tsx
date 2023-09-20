import {Alert, Button, Heading, Loader, Panel} from '@navikt/ds-react'
import {Trans, useTranslation} from 'react-i18next'
import {Banner} from '../components/Banner'
import {HotjarTrigger} from '../components/hotjar-trigger'
import {ScrollToTop} from '../components/ScrollToTop'
import {Avstand} from "../components/Avstand";
import {useApplicationContext} from "../state/ApplicationContext";
import React, {useEffect} from "react";
import {digihot_customevents, logCustomEvent, logVilkårsvurderingVist} from "../utils/amplitude";
import styled from "styled-components";
import {useVilkårsvurdering} from "../kalkulator/useVilkårsvurdering";

export function Svar() {
    const {t} = useTranslation()
    const {appState} = useApplicationContext()
    const vilkårsvurdering = useVilkårsvurdering()


    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        // beregnSats(beregnsSatsRequest)
        logVilkårsvurderingVist()
    }, [])

    HotjarTrigger({timeout: 10000, trigger: 'digihot_hm_brillekalkulator'})
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
                <ScrollToTop/>
                <Avstand marginTop={5} marginBottom={5}>
                    {vilkårsvurdering.loading ? (
                        <Centered>
                            <Loader size="xlarge"/>
                        </Centered>
                    ) : (
                        <>
                            {vilkårsvurdering.vurdering && (
                                <Vilkårsvurdering role="alert">
                                    <Heading level="2" spacing size="medium">
                                        {vilkårsvurdering.vurdering.overskrift}
                                    </Heading>
                                    <Vilkår>
                                        {vilkårsvurdering.vurdering.vilkår.map(({variant, beskrivelse}, index) => (
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
                                    {!vilkårsvurdering.vurdering.ok && (
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
                                </Vilkårsvurdering>
                            )}
                        </>
                    )}
                </Avstand>




            </main>
        </>
    )
}


const Vilkårsvurdering = styled(Panel)`
  background-color: var(--navds-global-color-gray-50);
`

const Vilkår = styled.div`
  display: grid;
  gap: var(--navds-spacing-3);
`

const Centered = styled.div`
  text-align: center;
`
