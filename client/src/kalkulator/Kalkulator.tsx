import { Heading } from '@navikt/ds-react'
import { Banner } from '../components/Banner'
import { HotjarTrigger } from '../components/hotjar-trigger'
import ScrollToTop from '../components/ScrollToTop'
import { KalkulatorForm } from './KalkulatorForm'

export function Kalkulator() {

  HotjarTrigger({timeout: 10000, trigger: 'digihot_hm_brillekalkulator'})

  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            Kan barnet få brillestøtte?
          </Heading>
        </Banner>
      </header>
      <main>
        <ScrollToTop />
        <KalkulatorForm />
      </main>
    </>
  )
}
