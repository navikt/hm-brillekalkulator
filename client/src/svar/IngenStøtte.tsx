import { Heading } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import React from "react";
import styled from "styled-components";
import { Vilkårsvurdering } from "../kalkulator/useVilkårsvurdering";
import {
  CheckmarkCircleFillIcon,
  InformationSquareFillIcon,
  XMarkOctagonFillIcon,
  XMarkOctagonIcon
} from "@navikt/aksel-icons";

export function IngenStøtte() {
  const { t } = useTranslation()

  return (
    <>
      <FailureTop>
        <XMarkOctagonFillIcon title="a11y-title" fontSize="1.5rem" color="#F68282"/>
        <Heading level="2" size="medium">
          {t('kalkulator.vilkårsvurdering_ikke_ok')}
        </Heading>
        <div style={{ gridColumnStart: 2, display: 'flex', justifyContent: 'flex-start', padding: '1rem 0' }}>
          <InformationSquareFillIcon title="a11y-title" fontSize="1.5rem" color="#236B7D" />
          <div style={{ width: '80%', paddingLeft: '0.5rem' }}>
            Dette er kun et veiledende svar. Endelig svar får du etter et besøk hos optiker eller etter at NAV
            har behandlet innsendt søknad.
          </div>
        </div>
      </FailureTop>
    </>
  )
}

const FailureTop = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: var(--a-spacing-3);
  margin-bottom: var(--a-spacing-3);
`