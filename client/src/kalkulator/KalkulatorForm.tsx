import { Alert, BodyLong, Button, Heading, Panel, Radio, RadioGroup, Select } from '@navikt/ds-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { digihot_customevents, logCustomEvent, logKalkulatorVist, logVilkårsvurderingVist } from '../utils/amplitude'
import { useVilkårsvurdering } from './useVilkårsvurdering'
import { Øye } from './Øye'

export interface KalkulatorFormData {
  alder: boolean
  vedtak: boolean
  folketrygden: boolean
  høyreSfære: number | ''
  høyreSylinder: number | ''
  venstreSfære: number | ''
  venstreSylinder: number | ''
}

export function KalkulatorForm() {
  logKalkulatorVist()

  const {
    control,
    watch,
    formState: { errors },
    getValues,
  } = useForm<KalkulatorFormData>({
    defaultValues: {
      alder: true,
      vedtak: false,
      folketrygden: true,
      høyreSfære: '',
      høyreSylinder: '',
      venstreSfære: '',
      venstreSylinder: '',
    },
  })

  const vilkårsvurdering = useVilkårsvurdering(watch)

  if (vilkårsvurdering) {
    logVilkårsvurderingVist()
  }

  return (
    <>
      <form>
        <Heading level="2" size="medium" spacing>
          Om barnet
        </Heading>
        <Grid>
          <div>
            <Controller
              control={control}
              name="alder"
              render={({ field }) => (
                <RadioGroup legend="Er barnet under 18 år?" {...field}>
                  <Radio value={false}>Nei</Radio>
                  <Radio value={true}>Ja</Radio>
                </RadioGroup>
              )}
            />
            {getValues('alder') === false && (
              <Alert variant="info">Personer over 18 år kan ikke få støtte til barnebriller</Alert>
            )}
          </div>
          <div>
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
            {getValues('vedtak') === true && (
              <Alert variant="info">
                Barnet kan bare få støtte én gang i året gjennom denne ordningen for barnebriller. Har du fått støtte
                til briller eller linser gjennom noen av{' '}
                <a
                  href="https://www.nav.no/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/hjelpemidler/syn"
                  target="_blank"
                >
                  de andre støtteordningene fra NAV
                </a>
                ? Da kan barnet likevel få støtte gjennom denne ordningen.
              </Alert>
            )}
          </div>
          <div>
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
            {getValues('folketrygden') === false && (
              <Alert variant="info">
                Hvis barnet ikke har folkeregistrert adresse i Norge, betyr det vanligvis at barnet ikke har rett på
                støtte. For å få støtte må barnet være medlem av folketrygden. Du kan lese mer om{' '}
                <a
                  href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden"
                  target="_blank"
                >
                  medlemskap i folketrygden her.
                </a>
              </Alert>
            )}
          </div>
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
              <Heading level="2" spacing size="medium">
                {vilkårsvurdering.overskrift}
              </Heading>
              <Vilkår>
                {vilkårsvurdering.vilkår.map(({ variant, beskrivelse }, index) => (
                  <Alert key={index} variant={variant} inline>
                    {beskrivelse}
                  </Alert>
                ))}
              </Vilkår>
              <Avstand marginTop={5}>
                <Button
                  as="a"
                  variant="secondary"
                  href="https://www.nav.no/briller-til-barn"
                  onClick={() => logCustomEvent(digihot_customevents.KLIKK_MER_INFORMASJON_OM_ORDNINGEN)}
                >
                  Mer informasjon om brillestøtte til barn
                </Button>
              </Avstand>
              {!vilkårsvurdering.ok && (
                <Avstand marginTop={5}>
                  Selv om du ikke har rett på støtte gjennom brilleordningen for barn, kan det være du har rett på{' '}
                  <a href="https://www.nav.no/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/hjelpemidler/syn">
                    støtte gjennom andre ordninger.
                  </a>
                </Avstand>
              )}
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
