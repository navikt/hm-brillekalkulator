import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { Kalkulator } from './kalkulator/Kalkulator'

export function App() {
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
