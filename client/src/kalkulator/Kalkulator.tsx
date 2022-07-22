import { Heading, Panel } from '@navikt/ds-react'
import { Avstand } from '../components/Avstand'
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
        <Panel>
          <Heading level="2" size="medium" spacing>
            Om barnet
          </Heading>
          <Avstand marginTop={5} marginBottom={5}>
            <Avstand marginTop={5}>
              <KalkulatorForm />
            </Avstand>
          </Avstand>
        </Panel>
      </main>
    </>
  )
}
