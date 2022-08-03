import amplitude from 'amplitude-js'

export enum amplitude_taxonomy {
    SKJEMA_START = 'skjema startet',
    SKJEMA_ÅPEN = 'skjema åpnet',
    SKJEMASTEG_FULLFØRT = 'skjemasteg fullført',
    SKJEMAVALIDERING_FEILET = 'skjemavalidering feilet',
    SKJEMAINNSENDING_FEILET = 'skjemainnsending feilet',
    SKJEMA_FULLFØRT = 'skjema fullført',
    NAVIGERE = 'navigere',
}

//Events som ikke er i NAV sin taxonomi
export enum digihot_customevents {
    VISNING_KALKULATOR = 'visning kalkulator',
    VISNING_VILKÅRSVURDERING = 'visning vilkårsvurdering',
    KLIKK_MER_INFORMASJON_OM_ORDNINGEN = 'klikk mer informasjon om ordningen',
}

const SKJEMANAVN = 'hm-brillekalkulator'


export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        })
    }
}

export function logAmplitudeEvent(eventName: string, data?: any) {
    setTimeout(() => {
        data = {
            app: SKJEMANAVN,
            team: 'teamdigihot',
            ...data,
        }
        try {
            if (amplitude) {
                amplitude.getInstance().logEvent(eventName, data)
            }
        } catch (error) {
            console.error(error)
        }
    })
}

export function logCustomEvent(event: digihot_customevents, data?: any) {
    logAmplitudeEvent(event, {
        skjemanavn: SKJEMANAVN,
        ...data,
    })
}

let kalkulatorVist = false // Vil kun logge 1 gang per sidevisning

export function logKalkulatorVist() {
    if (!kalkulatorVist) {
        logCustomEvent(digihot_customevents.VISNING_KALKULATOR)
        kalkulatorVist = true
    }
}

let vilkårsvurderingVist = false // Vil kun logge 1 gang per sidevisning

export function logVilkårsvurderingVist() {
    if (!vilkårsvurderingVist) {
        logCustomEvent(digihot_customevents.VISNING_VILKÅRSVURDERING)
        vilkårsvurderingVist = true
    }
}