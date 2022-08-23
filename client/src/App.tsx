import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { baseUrl } from './http'
import { Kalkulator } from './kalkulator/Kalkulator'

export function App() {
  const { t } = useTranslation()
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    setBreadcrumbs([
      { url: 'https://www.nav.no/briller-til-barn', title: t('brødsmuler.1') },
      { url: baseUrl('/'), title: t('brødsmuler.2') },
    ])
  }, [])

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (isHttpError(error)) {
          return <Feilside status={error.status} error={error} />
        } else {
          return <Feilside status={500} error={error} />
        }
      }}
    >
      <Routes>
        <Route path="/" element={<Kalkulator />} />
        <Route path="*" element={<Feilside status={404} />} />
      </Routes>
    </ErrorBoundary>
  )
}
