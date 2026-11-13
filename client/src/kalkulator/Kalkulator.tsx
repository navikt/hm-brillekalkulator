import { Box, GuidePanel, Heading, VStack } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { ScrollToTop } from '../components/ScrollToTop'
import { KalkulatorForm } from './KalkulatorForm'
import React from 'react'

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
      <VStack as="main" gap="8" paddingBlock="4 0">
        <ScrollToTop />
        <GuidePanel>{t('kalkulator.informasjon_om_kalkulator')}</GuidePanel>
        <KalkulatorForm />
      </VStack>
    </>
  )
}
