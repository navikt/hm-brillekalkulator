import "@navikt/ds-css/darkside";
import { Theme } from "@navikt/ds-react";
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { GlobalStyle } from './GlobalStyle'
import { baseUrl } from './http'
import './i18n'
import { initMSW } from './mocks/initMSW'
import { initAmplitude } from './utils/amplitude'

initMSW().then(() => {
  const container = document.getElementById('root')!
  createRoot(container).render(
    <React.StrictMode>
      <GlobalStyle />
      <BrowserRouter basename={baseUrl()}>
        <Theme>
          <App />
        </Theme>
      </BrowserRouter>
    </React.StrictMode>
  )
})

initAmplitude()
