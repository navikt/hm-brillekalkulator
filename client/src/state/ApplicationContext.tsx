import React, {Dispatch, SetStateAction, useContext, useState} from 'react'
import type {Brilleseddel} from '../types'

export interface AppState {
    brilleseddel: Brilleseddel,
    alder: string,
    strabisme: string | null,
}

interface IApplicationContext {
    appState: AppState
    setAppState: Dispatch<SetStateAction<AppState>>

    resetAppState(): void
}

export const initialAppState: AppState = {
    brilleseddel: {
        høyreSfære: '',
        høyreSylinder: '',
        høyreAdd: '0',
        venstreSfære: '',
        venstreSylinder: '',
        venstreAdd: '0',
    },
    alder: '',
    strabisme: null
}

const ApplicationContext = React.createContext<IApplicationContext>({
    appState: initialAppState,
    setAppState() {
    },
    resetAppState() {
    },
})

export function ApplicationProvider({children}: { children: React.ReactNode }) {
    const [appState, setAppState] = useState(initialAppState)
    return (
        <ApplicationContext.Provider
            value={{
                appState,
                setAppState,
                resetAppState() {
                    setAppState(initialAppState)
                },
            }}
        >
            {children}
        </ApplicationContext.Provider>
    )
}

export function useApplicationContext(): IApplicationContext {
    return useContext(ApplicationContext)
}
