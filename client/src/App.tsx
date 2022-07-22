import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { baseUrl } from './http'
import { Kalkulator } from './kalkulator/Kalkulator'

export function App() {
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    setBreadcrumbs([
      { url: 'https://www.nav.no/briller-til-barn', title: 'Briller til barn' },
      { url: baseUrl('/'), title: 'Kan barnet få brillestøtte?' },
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
