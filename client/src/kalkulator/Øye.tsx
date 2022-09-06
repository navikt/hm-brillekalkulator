import { Heading, Select } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { enhet } from '../enhet'
import { MAX_SFÆRE, MAX_STYRKE, MAX_SYLINDER, MIN_STYRKE } from './config'
import { FormatertStyrke } from './FormatertStyrke'

export interface ØyeProps {
  control: any
  errors: any
  type: 'venstre' | 'høyre'
}

export function Øye(props: ØyeProps) {
  const { control, errors, type } = props
  const { t } = useTranslation()

  const sfæreName = `${type}Sfære`
  const sylinderName = `${type}Sylinder`

  // Unngår å bruke t(`kalkulator.${type}_øye`), slik at testene kan fange opp at disse er i bruk...
  let headingTekst = t(`kalkulator.venstre_øye`)
  if (type === 'høyre') {
    headingTekst = t(`kalkulator.høyre_øye`)
  }

  return (
    <Grid>
      <ØyeEtikett>
        <Heading level="3" size="small">
          {headingTekst}
        </Heading>
      </ØyeEtikett>
      <Controller
        name={sfæreName}
        control={control}
        render={({ field }) => (
          <Select
            style={{ maxWidth: '330px' }}
            label={t('kalkulator.ledetekst_sfære')}
            size="medium"
            error={errors[sfæreName]?.message}
            {...field}
          >
            <option value="">{t('kalkulator.velg_sfære')}</option>
            {range(1, MAX_SFÆRE).map((it) => (
              <option key={it} value={it}>
                <FormatertStyrke verdi={it} type="sfære" />
              </option>
            ))}
          </Select>
        )}
      />
      <Controller
        name={sylinderName}
        control={control}
        render={({ field }) => (
          <Select
            style={{ maxWidth: '330px' }}
            label={t('kalkulator.ledetekst_sylinder')}
            size="medium"
            error={errors[sylinderName]?.message}
            {...field}
          >
            <option value="">{t('kalkulator.velg_sylinder')}</option>
            {range(1, MAX_SYLINDER).map((it) => (
              <option key={it} value={it}>
                <FormatertStyrke verdi={it} type="sylinder" />
              </option>
            ))}
          </Select>
        )}
      />
    </Grid>
  )
}

const ØyeEtikett = styled.div`
  justify-items: auto;
  align-self: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 120px 180px 180px;
  gap: var(--navds-spacing-5);
  padding-top: var(--navds-spacing-3);
  padding-bottom: var(--navds-spacing-3);
  align-items: start;
  @media ${enhet.mobil} {
    grid-template-columns: 100%;
  }
`

function range(start: number, stop: number, step: number = 0.25): number[] {
  const size = (stop - start) * 4 + 1
  const padding = 1 / step
  const valg = Array(size + padding)
    .fill(step)
    .map((x, y) => x * y)
    .slice(padding)
  return [MIN_STYRKE, ...valg, MAX_STYRKE]
}
