import { useContext } from 'react'
import { MetaMaskContext } from '../providers/MetaMaskProvider'


export const useConnected: () => { connected: boolean, setConnected: (state: boolean) => void } = () => {
  const { connected, _setConnected } = useContext(MetaMaskContext)

  const setConnected = (_connected: boolean) => {
    _setConnected(_connected)
  }
  return { connected: connected as boolean, setConnected }
}
