import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import {Detail, Heading, Select} from '@navikt/ds-react'
import {Brilleseddel} from "../types";
import {capitalize} from "../common/stringFormatting";
import {MAX_SFÆRE, MAX_SYLINDER} from "./config";
import {FormatertStyrke} from "./FormatertStyrke";
import {enhet} from "../enhet";
import {useTranslation} from "react-i18next";


export function Øye(props: { type: 'venstre' | 'høyre' }) {
    const { type } = props
    const {
        control,
        formState: { errors },
    } = useFormContext<{ brilleseddel: Brilleseddel }>()
    const { t } = useTranslation()

    return (
            <Grid>
                <ØyeEtikett>
                    <Heading level="3" size="small">
                        {// Unngår å bruke t(`kalkulator.${type}_øye`), slik at testene kan fange opp at disse er i bruk...
                            type === 'høyre' ? t(`kalkulator.høyre_øye`) : t(`kalkulator.venstre_øye`)
                        }
                    </Heading>
                </ØyeEtikett>
                <Controller
                    name={`brilleseddel.${type}Sfære`}
                    control={control}
                    rules={{
                        required: 'Mangler verdi',
                    }}
                    render={({ field }) => (
                        <Select
                            label={'Sfære (SPH)'}
                            size="small"
                            error={errors.brilleseddel?.[`${type}Sfære`]?.message}
                            {...field}
                        >
                            {range(-MAX_SFÆRE, 0).map((it) => (
                                <option key={it} value={it}>
                                    <FormatertStyrke verdi={it} />
                                </option>
                            ))}
                            <option value="" disabled>
                                Velg sfære
                            </option>
                            {range(0.25, MAX_SFÆRE).map((it) => (
                                <option key={it} value={it}>
                                    <FormatertStyrke verdi={it} />
                                </option>
                            ))}
                        </Select>
                    )}
                />

                <Controller
                    name={`brilleseddel.${type}Sylinder`}
                    control={control}
                    rules={{
                        required: 'Mangler verdi',
                    }}
                    render={({ field }) => (
                        <Select
                            label="Cylinder (CYL)"
                            size="small"
                            error={errors.brilleseddel?.[`${type}Sylinder`]?.message}
                            {...field}
                        >
                            {range(-MAX_SYLINDER, 0).map((it) => (
                                <option key={it} value={it}>
                                    <FormatertStyrke verdi={it} />
                                </option>
                            ))}
                            <option value="" disabled>
                                Velg sylinder
                            </option>
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

function range(start: number, stop: number, step = 0.25): number[] {
    const valg = []
    for (let i = start; i <= stop; i += step) {
        valg.push(i)
    }

    return valg
}
