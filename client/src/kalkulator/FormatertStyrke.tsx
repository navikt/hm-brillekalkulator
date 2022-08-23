import { TFunction, useTranslation } from 'react-i18next'
import { MAX_SFÆRE, MAX_STYRKE, MAX_SYLINDER, MIN_STYRKE } from './config'

interface FormatertStyrkeProps {
  verdi?: number | string
  type: 'sfære' | 'sylinder'
}

export function FormatertStyrke(props: FormatertStyrkeProps) {
  const { verdi, type } = props
  const { t } = useTranslation()
  if (verdi == null || verdi === '') {
    return null
  }
  switch (type) {
    case 'sfære':
      return <>{formater(t, +Number(verdi), +1, +MAX_SFÆRE)}</>
    case 'sylinder':
      return <>{formater(t, -Number(verdi), -1, -MAX_SYLINDER)}</>
    default:
      return null
  }
}

function formater(t: TFunction, verdi: number, min: number, max: number) {
  const styrke = Math.abs(verdi)
  if (styrke === MIN_STYRKE) {
    return t('kalkulator.styrke_under', { min: formatter.format(min) })
  }
  if (styrke === MAX_STYRKE) {
    return t('kalkulator.styrke_over', { max: formatter.format(max) })
  }
  return formatter.format(verdi)
}

const formatter = new Intl.NumberFormat('nb', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
