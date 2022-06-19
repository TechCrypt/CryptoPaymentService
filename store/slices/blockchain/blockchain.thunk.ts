import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBuyProduct } from './blockchain.state'
import { blockchainApi } from '../../../api/blockchain.api'
import { addNotification } from '../notifications/notifications.slice'
import { ITransactionCreate } from '../../../types/blockchain.types'


export const sendTransaction = createAsyncThunk(
  'createAsyncThunk',
  async (transaction: ITransactionCreate, {
    rejectWithValue,
    dispatch
  }) => {
    try {
      return await blockchainApi.saveTransaction(transaction)
    } catch (e) {
      dispatch(addNotification({
        message: e.toString(),
        variant: 'error'
      }))
      rejectWithValue(e)
    }
  }
)


export const getTransactions = createAsyncThunk(
  'getTransactions',
  async () => {
    // return await blockchainApi.getTransactions()
  }
)
