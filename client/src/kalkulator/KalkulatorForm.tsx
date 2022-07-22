import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Avstand } from '../components/Avstand'
import { BrillestyrkeForm, BrillestyrkeFormData } from './BrillestyrkeForm'

export interface KalkulatorFormData {
  brillestyrke: BrillestyrkeFormData
}

export function KalkulatorForm() {
  const methods = useForm<KalkulatorFormData>({
    defaultValues: {
      brillestyrke: {
        høyreSfære: '',
        høyreSylinder: '',
        venstreSfære: '',
        venstreSylinder: '',
      },
    },
  })
  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log(data)
          })}
        >
          <Avstand paddingBottom={5} paddingTop={5}>
            <BrillestyrkeForm />
          </Avstand>
        </form>
      </FormProvider>
    </>
  )
}
