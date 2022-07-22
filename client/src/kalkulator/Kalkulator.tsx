import { Heading } from '@navikt/ds-react'
import { Banner } from '../components/Banner'
import ScrollToTop from '../components/ScrollToTop'
import { KalkulatorForm } from './KalkulatorForm'

export function Kalkulator() {
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
