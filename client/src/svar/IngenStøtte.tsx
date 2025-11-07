import { Heading, HGrid } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { InformationSquareFillIcon, XMarkOctagonFillIcon } from '@navikt/aksel-icons'

export function IngenStøtte() {
  const { t } = useTranslation()

  return (
    <>
      <HGrid gap="0 space-12" marginBlock="space-12" columns="auto 1fr" align="center">
        <XMarkOctagonFillIcon aria-label="advarsel" title="advarsel" fontSize="1.5rem" color="#F68282" />
        <Heading level="2" size="medium">
          {t('kalkulator.vilkårsvurdering_ikke_ok')}
        </Heading>
        <div style={{ gridColumnStart: 2, display: 'flex', justifyContent: 'flex-start', padding: '1rem 0' }}>
          <InformationSquareFillIcon aria-label="informasjon" title="informasjon" fontSize="1.5rem" color="#236B7D" />
          <div style={{ width: '80%', paddingLeft: '0.5rem' }}>{t('kalkulator.informasjon_om_veiledende_svar')}</div>
        </div>
      </HGrid>
    </>
  )
}