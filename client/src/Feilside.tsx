import { Accordion, BodyShort, Heading, HStack } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { AppLink } from './components/AppLink'
import { Avstand } from './components/Avstand'
import { Pipe } from './components/Pipe'
import { hentUtviklerinformasjon } from './error'

export interface FeilsideProps {
  status: number
  error?: Error
}

export function Feilside(props: FeilsideProps) {
  const { status, error } = props
  const { t } = useTranslation()
  const utviklerinformasjon = hentUtviklerinformasjon(error)
  return (
    <main>
      <Avstand paddingLeft={3} paddingRight={3}>
        <Heading level="1" size="large" spacing>
          <HStack align="center">
            {t(overskrift[status] || 'Teknisk feil')}
            <Pipe />
            <BodyShort size="large">{t('feilside.feilkode', { status })}</BodyShort>
          </HStack>
        </Heading>
        {{
          401: <IkkeLoggetInn />,
          404: <IkkeFunnet />,
        }[status] || <TekniskFeil />}
      </Avstand>
      {utviklerinformasjon && (
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Informasjon til utviklere</Accordion.Header>
            <Accordion.Content>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '75%' }}>{utviklerinformasjon}</pre>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      )}
    </main>
  )
}

function IkkeLoggetInn() {
  const { t } = useTranslation()
  return (
    <>
      <BodyShort spacing>{t('feilside.ikke_logget_inn')}</BodyShort>
      <BodyShort spacing>
        <AppLink href="/">{t('feilside.gå_til_innloggingssiden')}</AppLink>.
      </BodyShort>
    </>
  )
}

function IkkeFunnet() {
  const { t } = useTranslation()
  return (
    <>
      <BodyShort spacing>{t('feilside.ikke_funnet')}</BodyShort>
      <BodyShort spacing>
        <AppLink href="/">{t('feilside.gå_til_forsiden')}</AppLink>.
      </BodyShort>
    </>
  )
}

function TekniskFeil() {
  const { t } = useTranslation()
  return (
    <>
      <BodyShort spacing>{t('feilside.teknisk_feil')}</BodyShort>
      <BodyShort spacing>
        <AppLink href="/">{t('feilside.gå_til_forsiden')}</AppLink>.
      </BodyShort>
    </>
  )
}

const overskrift: Record<number, string> = {
  401: 'Ikke logget inn',
  404: 'Fant ikke siden',
}
