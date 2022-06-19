import {createContext, Dispatch, SetStateAction, useState} from 'react'


interface IModalContext {
    currentModal?: TModalId
    setCurrentModal?: Dispatch<SetStateAction<TModalId>>
}

export type TModalId = 'select-token' | 'pay-with-tokens' | null

export const ModalContext = createContext<IModalContext>({})

export const ModalProvider = ({children}) => {

    const [currentModal, setCurrentModal] = useState<TModalId>()

    const values: IModalContext = {
        currentModal,
        setCurrentModal
    }

    return <ModalContext.Provider value={values}>
        {
            children
        }
    </ModalContext.Provider>
}
