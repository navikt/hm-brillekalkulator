import { Controller, useFormContext } from 'react-hook-form'
import { Heading, HGrid, Select } from '@navikt/ds-react'
import { Brilleseddel } from "../types";
import { MAX_ADD, MAX_SFÆRE, MAX_SYLINDER } from "./config";
import { FormatertStyrke } from "./FormatertStyrke";
import { useTranslation } from "react-i18next";


export function Øye(props: { type: 'venstre' | 'høyre' }) {
    const { type } = props
    const {
        control,
        formState: { errors },
    } = useFormContext<{ brilleseddel: Brilleseddel }>()
    const { t } = useTranslation()

    return (
        <HGrid columns={{ xs: '1fr', sm: '100px 130px 140px 130px' }} gap="5" align="start" paddingBlock="3">
            <div style={{ alignSelf: 'center' }}>
                <Heading level="3" size="small">
                    {// Unngår å bruke t(`kalkulator.${type}_øye`), slik at testene kan fange opp at disse er i bruk...
                        type === 'høyre' ? t(`kalkulator.høyre_øye`) : t(`kalkulator.venstre_øye`)
                    }
                </Heading>
            </div>
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

            <Controller
                name={`brilleseddel.${type}Add`}
                control={control}
                render={({ field }) => (
                    <Select
                        label={'Addisjon (ADD)'}
                        size="small"
                        error={errors.brilleseddel?.[`${type}Add`]?.message}
                        {...field}
                    >
                        <option value="0">
                            -
                        </option>
                        {range(0.75, MAX_ADD).map((it) => (
                            <option key={it} value={it}>
                                <FormatertStyrke verdi={it} />
                            </option>
                        ))}
                    </Select>
                )}
            />
        </HGrid>
    )
}

export function range(start: number, stop: number, step = 0.25): number[] {
    const valg = []
    for (let i = start; i <= stop; i += step) {
        valg.push(i)
    }

    return valg
}
