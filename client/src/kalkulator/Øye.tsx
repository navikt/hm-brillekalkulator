import { Heading, Select } from '@navikt/ds-react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { capitalize } from '../common/stringFormatting'
import { MAX_SFÆRE, MAX_STYRKE, MAX_SYLINDER, MIN_STYRKE } from './config'
import { FormatertStyrke } from './FormatertStyrke'
import {enhet} from "../enhet";

export interface ØyeProps {
  control: any
  errors: any
  type: 'venstre' | 'høyre'
}

export function Øye(props: ØyeProps) {
  const { control, errors, type } = props

  const sfæreName = `${type}Sfære`
  const sylinderName = `${type}Sylinder`

  return (
    <Grid>
      <ØyeEtikett>
        <Heading level="3" size="small">
          {`${capitalize(type)} øye`}
        </Heading>
      </ØyeEtikett>
      <Controller
        name={sfæreName}
        control={control}
        render={({ field }) => (
          <Select style={{maxWidth: '330px'}} label="Sfære (SPH)" size="medium" error={errors[sfæreName]?.message} {...field}>
            <option value="">Velg sfære</option>
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
          <Select style={{maxWidth: '330px'}} label="Sylinder (CYL)" size="medium" error={errors[sylinderName]?.message} {...field}>
            <option value="">Velg sylinder</option>
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
