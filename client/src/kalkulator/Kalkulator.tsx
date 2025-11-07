import { Alert, BodyShort, Box, GuidePanel, Heading } from "@navikt/ds-react";
import { useTranslation } from 'react-i18next'
import { ScrollToTop } from '../components/ScrollToTop'
import { KalkulatorForm } from './KalkulatorForm'
import { Avstand } from '../components/Avstand'
import React from "react";

export function Kalkulator() {
  const { t } = useTranslation()
  return (
    <>
      <header>
        <Box.New background="neutral-soft" padding="4" style={{ textAlign: 'center' }}>
          <Heading level="1" size="large">
            {t('kalkulator.overskrift')}
          </Heading>
        </Box.New>
      </header>
      <main>
        <ScrollToTop />
        {/* <Avstand marginBottom={5} marginTop={5}>
                    <Endringsvarsel
                        tittel={t('info.satsendring.tittel')}
                        tekst={t('info.satsendring.tekst')}
                        lenketekst={t('info.satsendring.lenketekst')}
                        lenke="https://www.nav.no/briller-til-barn"
                    />
                </Avstand> */}
        <Avstand marginBottom={10} marginTop={5}>
          <GuidePanel>
            {t('kalkulator.informasjon_om_kalkulator')}
          </GuidePanel>
        </Avstand>
        <KalkulatorForm />
      </main>
    </>
  )
}
