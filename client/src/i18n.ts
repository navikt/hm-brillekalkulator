import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from './resources.json'

// noinspection JSIgnoredPromiseFromCall
i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  resources: {
    nb: {
      translation: resources,
    },
    nn: {
      translation: resources,
    },
  },
  lng: 'nb',
  fallbackLng: false,
  supportedLngs: ['nb', 'nn'],
  keySeparator: false,
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
