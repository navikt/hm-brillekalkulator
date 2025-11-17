import { BodyLong, Button, Heading, Radio, RadioGroup, Select } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import { logKalkulatorVist } from '../utils/amplitude'
import { useNavigate } from 'react-router-dom'
import { range, Øye } from './Øye'
import { Brilleseddel } from '../types'
import { useApplicationContext } from '../state/ApplicationContext'

export interface KalkulatorFormData {
  alder: string
  strabisme: string | null
  brilleseddel: Brilleseddel
}

export function KalkulatorForm() {
  const { t } = useTranslation()
  logKalkulatorVist()
  const [venterPåVilkårsvurdering] = useState(false)
  const { appState, setAppState } = useApplicationContext()
  const navigate = useNavigate()

  const methods = useForm<KalkulatorFormData>({
    defaultValues: {
      alder: appState.alder,
      strabisme: appState.strabisme,
      brilleseddel: {
        høyreSfære: appState.brilleseddel?.høyreSfære || '',
        høyreSylinder: appState.brilleseddel?.høyreSylinder || '',
        venstreSfære: appState.brilleseddel?.venstreSfære || '',
        venstreSylinder: appState.brilleseddel?.venstreSylinder || '',
        venstreAdd: appState.brilleseddel?.venstreAdd || '',
        høyreAdd: appState.brilleseddel?.høyreAdd || '',
      },
    },
  })

  const {
    formState: { errors },
  } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          setAppState((prev) => ({
            ...prev,
            ...data,
          }))
          navigate('/svar')
        })}
      >
        <Heading level="2" size="medium" spacing>
          {t('kalkulator.om_barnet')}
        </Heading>
        <div>
          <Controller
            control={methods.control}
            name="alder"
            rules={{ required: 'Velg en verdi' }}
            render={({ field }) => (
              <Select
                label={t('kalkulator.ledetekst_vilkår_alder')}
                size="small"
                error={errors.alder?.message}
                {...field}
                style={{ width: '8rem' }}
              >
                {range(0, 17, 1).map((it) => (
                  <option key={it} value={it}>
                    {it}
                  </option>
                ))}
                <option value="" disabled>
                  Velg alder
                </option>
              </Select>
            )}
          />
        </div>

        <Avstand marginTop={12}>
          <Heading level="2" size="medium" spacing>
            {t('kalkulator.brillestyrke')}
          </Heading>
        </Avstand>
        <Avstand>
          <BodyLong>{t('kalkulator.informasjon_om_brilleseddel')}</BodyLong>
          <Øye type="høyre" />
          <hr />
          <Øye type="venstre" />
        </Avstand>

        <Avstand marginTop={12}>
          <div>
            <Controller
              control={methods.control}
              name="strabisme"
              rules={{ required: 'Velg en verdi' }}
              render={({ field }) => (
                <RadioGroup
                  legend={t('kalkulator.ledetekst_vilkår_strabisme')}
                  description={t('kalkulator.vilkår_strabisme_forklaring')}
                  {...field}
                  error={errors.strabisme?.message}
                >
                  <Radio value="ja">{t('felles.ja')}</Radio>
                  <Radio value="nei">{t('felles.nei')}</Radio>
                  <Radio value="usikker">{t('felles.vet_ikke')}</Radio>
                </RadioGroup>
              )}
            />
          </div>
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