import { Alert, BodyLong, Button, Heading, Radio, RadioGroup, Select } from '@navikt/ds-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { useVilkårsvurdering } from './useVilkårsvurdering'
import { Øye } from './Øye'

export interface KalkulatorFormData {
  alder: string
  vedtak: boolean
  folketrygden: boolean
  høyreSfære: number | ''
  høyreSylinder: number | ''
  venstreSfære: number | ''
  venstreSylinder: number | ''
}

export function KalkulatorForm() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KalkulatorFormData>({
    defaultValues: {
      alder: '',
      vedtak: false,
      folketrygden: true,
      høyreSfære: '',
      høyreSylinder: '',
      venstreSfære: '',
      venstreSylinder: '',
    },
  })

  const vilkårsvurdering = useVilkårsvurdering(watch)

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data)
        })}
      >
        <Heading level="2" size="medium" spacing>
          Om barnet
        </Heading>
        <Grid>
          <Controller
            control={control}
            name="alder"
            render={({ field }) => (
              <Alder label="Barnets alder" {...field}>
                <option value="-1">Velg alder</option>
                {[...Array(19).keys()].map((alder) => (
                  <option key={alder} value={alder}>
                    {alder}
                  </option>
                ))}
                <option value={99}>Over 18</option>
              </Alder>
            )}
          />
          <Controller
            control={control}
            name="vedtak"
            render={({ field }) => (
              <RadioGroup legend="Har barnet mottatt brillestøtte i dette kalenderåret?" {...field}>
                <Radio value={false}>Nei</Radio>
                <Radio value={true}>Ja</Radio>
              </RadioGroup>
            )}
          />
          <Controller
            control={control}
            name="folketrygden"
            render={({ field }) => (
              <RadioGroup legend="Har barnet folkeregistrert adresse i Norge?" {...field}>
                <Radio value={false}>Nei</Radio>
                <Radio value={true}>Ja</Radio>
              </RadioGroup>
            )}
          />
        </Grid>
        <Heading level="2" size="medium" spacing>
          Brillestyrke
        </Heading>
        <Avstand>
          <BodyLong>Du trenger bare å legge inn sfære og sylinder for å se hvilken støttesats barnet kan få.</BodyLong>
          <Øye control={control} errors={errors} type="høyre" />
          <Øye control={control} errors={errors} type="venstre" />
        </Avstand>
        {vilkårsvurdering && (
          <Avstand marginTop={5} marginBottom={5}>
            <Alert variant={vilkårsvurdering.ok ? 'info' : 'warning'}>
              <Heading level="2" spacing size="small">
                {vilkårsvurdering.overskrift}
              </Heading>
              {vilkårsvurdering.vilkår.map((v) => (
                <BodyLong key={v}>{v}</BodyLong>
              ))}
            </Alert>
          </Avstand>
        )}
        <Button type="submit" loading={isSubmitting}>
          Beregn
        </Button>
      </form>
    </>
  )
}

const Grid = styled.div`
  display: grid;
  gap: var(--navds-spacing-5);
  margin-bottom: var(--navds-spacing-5);
`

const Alder = styled(Select)`
  max-width: 180px;
`
