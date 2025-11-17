import "@navikt/ds-css/darkside";
import { Theme } from "@navikt/ds-react";
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { baseUrl } from './http'
import './i18n'
import { initMSW } from './mocks/initMSW'
import { initAmplitude } from './utils/amplitude'
import "./main.css"

initMSW().then(() => {
  const container = document.getElementById('root')!
  createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter basename={baseUrl()}>
        <Theme>
          <App />
        </Theme>
      </BrowserRouter>
    </React.StrictMode>
  )
})

initAmplitude()
