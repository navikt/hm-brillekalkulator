import { Alert, BodyShort, Heading } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { Banner } from '../components/Banner'
import { ScrollToTop } from '../components/ScrollToTop'
import { KalkulatorForm } from './KalkulatorForm'
import { Avstand } from '../components/Avstand'

export function Kalkulator() {
  const { t } = useTranslation()
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
        {/* <Avstand marginBottom={5} marginTop={5}>
                    <Endringsvarsel
                        tittel={t('info.satsendring.tittel')}
                        tekst={t('info.satsendring.tekst')}
                        lenketekst={t('info.satsendring.lenketekst')}
                        lenke="https://www.nav.no/briller-til-barn"
                    />
                </Avstand> */}
        <Avstand marginBottom={5} marginTop={5}>
          <Alert variant="info">
            <BodyShort>{t('kalkulator.informasjon_om_kalkulator')}</BodyShort>
          </Alert>
        </Avstand>
        <KalkulatorForm />
      </main>
    </>
  )
}
