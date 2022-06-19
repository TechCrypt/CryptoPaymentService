import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import {useEthers} from '@usedapp/core'
import {BlockchainService} from '../blockchain/BlockchainService'
import {useAppDispatch} from '../hooks/useAppDispatch'
import {setIsMetaMaskExist, setMetaMaskAccounts, setWeb3} from '../store/slices/blockchain/blockchain.slice'
import {setUserThunk} from '../store/slices/system/system.thunks'
import {useTypedSelector} from '../hooks/useTypedSelector'
import Web3 from 'web3'


interface IMetaMaskContext {
    connected: boolean,
    _setConnected: Dispatch<SetStateAction<boolean>>
    web3: Web3
}

export const MetaMaskContext = createContext<Partial<IMetaMaskContext>>({})


export const MetaMaskProvider: FC = ({children}) => {

    const [connected, setConnected] = useState<boolean>(false)
    const {account, active} = useEthers()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (active && account) {
            setConnected(true)
        }
    }, [active, account])

    const [web3, setWeb3State] = useState<Web3>(null)

    useEffect(() => {
        const web3 = new Web3(window['ethereum'])
        setWeb3State(web3)
        dispatch(setWeb3(web3))
    }, [])

    useEffect(() => {
        const blockchainService = new BlockchainService(window['ethereum'])
        if (!window['ethereum']) {
            dispatch(setIsMetaMaskExist(false))
        } else {
            dispatch(setIsMetaMaskExist(true))

            blockchainService.isConnected().then(value => {
                if (value && web3) {
                    web3.eth.getAccounts().then(accounts => {
                        dispatch(setMetaMaskAccounts(accounts))
                    })
                }
                setConnected(value)
            })

            window['ethereum'].on('accountsChanged', (accounts: string[]) => {
                if (accounts.length && web3) {
                    web3.eth.getAccounts().then(accounts => {
                        dispatch(setMetaMaskAccounts(accounts))
                    })
                }
                setConnected(!!accounts.length)
            })

        }
        return () => window.removeEventListener('accountsChanged', () => {
        })
    }, [web3])


    const value: IMetaMaskContext = useMemo(() => {
        return {
            connected,
            _setConnected: setConnected,
            web3
        }
    }, [connected, web3])


    return <MetaMaskContext.Provider value={value}>
        {children}
    </MetaMaskContext.Provider>
}
