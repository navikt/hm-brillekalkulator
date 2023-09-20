import {Heading} from '@navikt/ds-react'
import {useTranslation} from 'react-i18next'
import {Banner} from '../components/Banner'
import {HotjarTrigger} from '../components/hotjar-trigger'
import {ScrollToTop} from '../components/ScrollToTop'
import {KalkulatorForm} from './KalkulatorForm'

export function Kalkulator() {
    const {t} = useTranslation()
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
                {/* <Avstand marginBottom={5} marginTop={5}>
                    <Endringsvarsel
                        tittel={t('info.satsendring.tittel')}
                        tekst={t('info.satsendring.tekst')}
                        lenketekst={t('info.satsendring.lenketekst')}
                        lenke="https://www.nav.no/briller-til-barn"
                    />
                </Avstand> */}
                <KalkulatorForm/>
            </main>
        </>
    )
}
