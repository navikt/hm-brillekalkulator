import {useEffect} from 'react'

declare global {
    interface Window {
        hj: any
    }
}

interface HotjarTriggerProps {
    timeout: number
    trigger: string
}

export const HotjarTrigger = ({timeout, trigger}: HotjarTriggerProps) => {

    useEffect(() => {
        setTimeout(() => {
            window.hj =
                window.hj ||
                function () {
                    ;(window.hj.q = window.hj.q || []).push(arguments)
                }
            if (window.appSettings.MILJO === 'prod-gcp' || window.appSettings.MILJO === 'dev-gcp') {
                console.log('HotJar trigger', trigger)
                window.hj('trigger', trigger)
            }
        }, timeout)
    }, [])
}
