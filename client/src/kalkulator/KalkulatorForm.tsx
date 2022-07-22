import { Alert, BodyLong, Button, Heading, Panel, Radio, RadioGroup, Select } from '@navikt/ds-react'
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
    formState: { errors },
  } = useForm<KalkulatorFormData>({
    defaultValues: {
      alder: '-1',
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
      <form>
        <Heading level="2" size="medium" spacing>
          Om barnet
        </Heading>
        <Grid>
          <Controller
            control={control}
            name="alder"
            render={({ field }) => (
              <Alder label="Barnets alder" error={errors.alder?.message} {...field}>
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
            <Vilkårsvurdering>
              <Heading level="2" spacing size="small">
                {vilkårsvurdering.overskrift}
              </Heading>
              <Vilkår>
                {vilkårsvurdering.vilkår.map(({ variant, beskrivelse }, index) => (
                  <Alert key={index} variant={variant} inline>
                    {beskrivelse}
                  </Alert>
                ))}
              </Vilkår>
              <Avstand marginTop={5} centered>
                <Button as="a" variant="secondary" href="https://www.nav.no/briller-til-barn">
                  Mer informasjon om ordningen
                </Button>
              </Avstand>
            </Vilkårsvurdering>
          </Avstand>
        )}
      </form>
    </>
  )
}

const Vilkårsvurdering = styled(Panel)`
  background-color: var(--navds-global-color-gray-50);
`

const Grid = styled.div`
  display: grid;
  gap: var(--navds-spacing-5);
  margin-bottom: var(--navds-spacing-5);
`

const Vilkår = styled.div`
  display: grid;
  gap: var(--navds-spacing-3);
`

const Alder = styled(Select)`
  max-width: 180px;
`
