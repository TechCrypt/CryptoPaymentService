import { useContext } from 'react'
import Web3 from 'web3'
import { MetaMaskContext } from '../providers/MetaMaskProvider'

export const useWeb3 = (): Web3 => {
  return useContext(MetaMaskContext).web3
}
