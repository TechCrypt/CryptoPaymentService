import { instance } from './axios.instance'
import { ITransactionSave } from '../store/slices/blockchain/blockchain.state'
import { ITransactionCreate } from '../types/blockchain.types'

export const blockchainApi = {
  saveTransaction: (data: ITransactionCreate) => {
    return instance.post('/transactions', data)
  },
  getTransactions: () => {
    return instance.get('/transactions')
  },
}
