import { Alert, BodyLong, Button, Heading, Loader, Panel, Radio, RadioGroup } from '@navikt/ds-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { digihot_customevents, logCustomEvent, logKalkulatorVist, logVilkårsvurderingVist } from '../utils/amplitude'
import { useVilkårsvurdering } from './useVilkårsvurdering'
import { Øye } from './Øye'

export interface KalkulatorFormData {
  alder: boolean | null
  vedtak: boolean | null
  folketrygden: boolean | null
  høyreSfære: number | ''
  høyreSylinder: number | ''
  venstreSfære: number | ''
  venstreSylinder: number | ''
}

export function KalkulatorForm() {
  const { t } = useTranslation()
  logKalkulatorVist()

  const {
    control,
    watch,
    formState: { errors },
    getValues,
  } = useForm<KalkulatorFormData>({
    defaultValues: {
      alder: null,
      vedtak: null,
      folketrygden: null,
      høyreSfære: '',
      høyreSylinder: '',
      venstreSfære: '',
      venstreSylinder: '',
    },
  })

  const vilkårsvurdering = useVilkårsvurdering(watch)

  if (vilkårsvurdering.vurdering) {
    logVilkårsvurderingVist()
  }

  return (
    <form>
      <Heading level="2" size="medium" spacing>
        {t('kalkulator.om_barnet')}
      </Heading>
      <Grid>
        <div>
          <Controller
            control={control}
            name="alder"
            render={({ field }) => (
              <RadioGroup legend={t('kalkulator.ledetekst_vilkår_alder')} {...field}>
                <Radio value={true}>{t('felles.ja')}</Radio>
                <Radio value={false}>{t('kalkulator.nei_over_18_år')}</Radio>
              </RadioGroup>
            )}
          />
          {getValues('alder') === false && <Alert variant="info">{t('kalkulator.vilkår_alder_nei')}</Alert>}
        </div>
        <div>
          <Controller
            control={control}
            name="vedtak"
            render={({ field }) => (
              <RadioGroup
                legend={t('kalkulator.ledetekst_vilkår_vedtak')}
                description={t('kalkulator.vilkår_vedtak_forklaring')}
                {...field}
              >
                <Radio value={true}>{t('felles.ja')}</Radio>
                <Radio value={false}>{t('felles.nei')}</Radio>
              </RadioGroup>
            )}
          />
          {getValues('vedtak') === true && (
            <Alert variant="info">
              <Trans t={t} i18nKey="kalkulator.vilkår_vedtak_ja">
                <></>
                <a
                  href="https://www.nav.no/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/hjelpemidler/syn"
                  target="_blank"
                />
                <></>
              </Trans>
            </Alert>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="folketrygden"
            render={({ field }) => (
              <RadioGroup legend={t('kalkulator.ledetekst_vilkår_folketrygden')} {...field}>
                <Radio value={true}>{t('felles.ja')}</Radio>
                <Radio value={false}>{t('felles.nei')}</Radio>
              </RadioGroup>
            )}
          />
          {getValues('folketrygden') === false && (
            <Alert variant="info">
              <Trans t={t} i18nKey="kalkulator.vilkår_folketrygden_nei">
                <></>
                <a
                  href="https://www.nav.no/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden"
                  target="_blank"
                />
              </Trans>
            </Alert>
          )}
        </div>
      </Grid>
      <Heading level="2" size="medium" spacing>
        {t('kalkulator.brillestyrke')}
      </Heading>
      <Avstand>
        <BodyLong>{t('kalkulator.informasjon_om_brilleseddel')}</BodyLong>
        <Øye control={control} errors={errors} type="høyre" />
        <Øye control={control} errors={errors} type="venstre" />
      </Avstand>

      <Avstand marginTop={5} marginBottom={5}>
        {vilkårsvurdering.loading ? (
          <Centered>
            <Loader size="xlarge" />
          </Centered>
        ) : (
          <>
            {vilkårsvurdering.vurdering && (
              <Vilkårsvurdering>
                <Heading level="2" spacing size="medium">
                  {vilkårsvurdering.vurdering.overskrift}
                </Heading>
                <Vilkår>
                  {vilkårsvurdering.vurdering.vilkår.map(({ variant, beskrivelse }, index) => (
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
                    target="_blank"
                  >
                    {t('kalkulator.knapp_mer_informasjon')}
                  </Button>
                </Avstand>
                {!vilkårsvurdering.vurdering.ok && (
                  <Avstand marginTop={5}>
                    <Trans t={t} i18nKey="kalkulator.vilkår_ikke_oppfylt">
                      <></>
                      <a
                        href="https://www.nav.no/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/hjelpemidler/syn"
                        target="_blank"
                      />
                    </Trans>
                  </Avstand>
                )}
              </Vilkårsvurdering>
            )}
          </>
        )}
      </Avstand>
    </form>
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

const Centered = styled.div`
  text-align: center;
`
