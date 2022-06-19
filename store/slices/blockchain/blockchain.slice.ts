import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialState} from './blockchain.state'
import {getTransactions} from './blockchain.thunk'
import {setLoading} from '../system/system.slice'
import Web3 from "web3";


export const blockchainSlice = createSlice({
    name: 'blockchain',
    initialState,
    reducers: {
        setIsMetaMaskExist(state, action: PayloadAction<boolean>) {
            state.isMetaMaskExist = action.payload
        },
        setMetaMaskAccounts(state, action: PayloadAction<string[]>) {
            state.accounts = action.payload
            state.address = action.payload[0]
        },
        setWeb3(state, action: PayloadAction<Web3>) {
            state.web3 = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(getTransactions.pending, (state, action) => {
            state.error = false
            setLoading(true)
        })
        builder.addCase(getTransactions.fulfilled, (state, action: PayloadAction<any>) => {
            state.error = false
            setLoading(false)
            state.transactions = action.payload.data.message.items
        })
        builder.addCase(getTransactions.rejected, (state, action) => {
            state.error = true
            setLoading(false)
        })

    })
})

export const {setIsMetaMaskExist, setMetaMaskAccounts, setWeb3} = blockchainSlice.actions

export default blockchainSlice.reducer
