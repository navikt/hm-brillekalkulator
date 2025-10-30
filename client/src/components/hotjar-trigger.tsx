import { useEffect } from 'react'

declare global {
  interface Window {
    hj: any
  }
}

interface HotjarTriggerProps {
  timeout: number
  trigger: string
}

export const HotjarTrigger = ({ timeout, trigger }: HotjarTriggerProps) => {
  useEffect(() => {
    setTimeout(() => {
      window.hj =
        window.hj ||
        function () {
          ; (window.hj.q = window.hj.q || []).push(arguments)
        }
      if (window.appSettings.NAIS_CLUSTER_NAME === 'prod-gcp') {
        window.hj('trigger', trigger)
      }
    }, timeout)
  }, [])
}
