import {BodyLong, Button, Heading, Radio, RadioGroup} from '@navikt/ds-react'
import React, {useState} from 'react'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {Avstand} from '../components/Avstand'
import {logKalkulatorVist} from '../utils/amplitude'
import {useNavigate} from 'react-router-dom'

import {Øye} from './Øye'
import {useApplicationContext} from "../state/ApplicationContext";
import {Brilleseddel} from "../types";

export interface KalkulatorFormData {
    alder: string | null
    vedtak: string | null
    folketrygden: string | null
    brilleseddel: Brilleseddel
}

export function KalkulatorForm() {
    const {t} = useTranslation()
    logKalkulatorVist()
    const [venterPåVilkårsvurdering, setVenterPåVilkårsvurdering] = useState(false)
    const {appState, setAppState} = useApplicationContext()
    const navigate = useNavigate()

    const methods = useForm<KalkulatorFormData>({
        defaultValues: {
            alder: appState.alder,
            vedtak: appState.vedtak,
            folketrygden: appState.folketrygden,
            brilleseddel: {
                høyreSfære: appState.brilleseddel.høyreSfære,
                høyreSylinder: appState.brilleseddel.høyreSylinder,
                venstreSfære: appState.brilleseddel.venstreSfære,
                venstreSylinder: appState.brilleseddel.venstreSylinder,
            }
        },
    })


    const {
        formState: {errors},
    } = methods

    methods.watch('alder')
    methods.watch('folketrygden')
    methods.watch('vedtak')

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit((data) => {
                    setAppState((prev) => ({
                        ...prev,
                        ...data,
                    }))
                    navigate('/svar')
                })}>
                <Heading level="2" size="medium" spacing>
                    {t('kalkulator.om_barnet')}
                </Heading>
                <Grid>
                    <div>
                        <Controller
                            control={methods.control}
                            name="alder"
                            rules={{required: 'Velg en verdi'}}
                            render={({field}) => (
                                <RadioGroup legend={t('kalkulator.ledetekst_vilkår_alder')} {...field}
                                            error={errors.alder?.message}>
                                    <Radio value="ja">{t('felles.ja')}</Radio>
                                    <Radio value="nei">{t('kalkulator.nei_over_18_år')}</Radio>
                                </RadioGroup>
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            control={methods.control}
                            name="vedtak"
                            rules={{required: 'Velg en verdi'}}
                            render={({field}) => (
                                <RadioGroup
                                    legend={t('kalkulator.ledetekst_vilkår_vedtak')}
                                    description={t('kalkulator.vilkår_vedtak_forklaring')}
                                    {...field}
                                    error={errors.alder?.message}
                                >
                                    <Radio value="ja">{t('felles.ja')}</Radio>
                                    <Radio value="nei">{t('felles.nei')}</Radio>
                                </RadioGroup>
                            )}
                        />
                    </div>
                    <div>
                        <Controller
                            control={methods.control}
                            name="folketrygden"
                            rules={{required: 'Velg en verdi'}}
                            render={({field}) => (
                                <RadioGroup legend={t('kalkulator.ledetekst_vilkår_folketrygden')} {...field}
                                            error={errors.alder?.message}>
                                    <Radio value="ja">{t('felles.ja')}</Radio>
                                    <Radio value="nei">{t('felles.nei')}</Radio>
                                </RadioGroup>
                            )}

                        />
                    </div>
                </Grid>
                <Heading level="2" size="medium" spacing>
                    {t('kalkulator.brillestyrke')}
                </Heading>
                <Avstand>
                    <BodyLong>{t('kalkulator.informasjon_om_brilleseddel')}</BodyLong>
                    <Øye type="høyre"/>
                    <Øye type="venstre"/>
                </Avstand>

                <Avstand marginTop={6}>
                    <Button
                        type="submit"
                        variant="primary"
                        size="medium"
                        disabled={venterPåVilkårsvurdering}
                        loading={venterPåVilkårsvurdering}
                    >
                        Beregn
                    </Button>
                </Avstand>
            </form>
        </FormProvider>
    )
}

const Grid = styled.div`
  display: grid;
  gap: var(--navds-spacing-5);
  margin-bottom: var(--navds-spacing-5);
`
