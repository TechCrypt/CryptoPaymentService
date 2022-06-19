import { ITransaction } from '../../../types/common.types'
import Web3 from "web3";

export interface IBuyProduct {
  shopId: number,
  productId: number,
  price: number,
  shopAddress: string,
  fromAddress: string
}


export interface ITransactionSave {
  fromAddress: string,
  toAddress: string,
  value: number | string,
  txnHash: string,
  block: number,
  timestampString: string,
  status: string
}

export interface IBlockchainState {
  address: string | null,
  accounts: string[]
  isMetaMaskExist: boolean,
  isUserExist: boolean | null,
  error: boolean,
  transactions: ITransaction[] | null
  web3?: Web3
}


export const initialState: IBlockchainState = {
  address: null,
  accounts: [],
  isMetaMaskExist: true,
  isUserExist: null,
  error: false,
  transactions: null
}
