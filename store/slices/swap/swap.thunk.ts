import {createAsyncThunk} from '@reduxjs/toolkit'
import {addNotification} from '../notifications/notifications.slice'
import {IGetSwapTokens, swapApi} from "../../../api/swap.api";
import {RootState} from "../../store";
import erc20ContractAbi from '../../../blockchain/erc20Abi.json'
import {AbiItem} from "web3-utils";


export interface IBalanceOf {
    tokenAddress: string
    address: string
}

export const getSwapTokenThunk = createAsyncThunk(
    'getSwapTokenThunk',
    async (data: IGetSwapTokens, {dispatch, getState}) => {
        try {
            return swapApi.getSwapTokens(data)
        } catch (e) {
            dispatch(addNotification({
                message: e.message.data,
                variant: 'error'
            }))

        }
    }
)


export const allTokensBalanceOf = createAsyncThunk(
    'allTokensBalanceOf',
    async (_, {getState, dispatch}) => {
        try {
            const state = getState() as unknown as RootState
            return await Promise.all([...state.swap.tokens.map(async token => {
                const contract = new state.blockchain.web3.eth.Contract(erc20ContractAbi as unknown as AbiItem, token.address)
                const balanceOf = await contract.methods.balanceOf(state.blockchain.address).call({from: state.blockchain.address})
                return {
                    ...token,
                    balanceOf
                }
            })])
        } catch (e) {
            dispatch(addNotification({
                message: e.message.data,
                variant: 'error'
            }))
        }
    }
)


export const balanceOfThunk = createAsyncThunk(
    'balanceOfThunk',
    async (data: IBalanceOf, {dispatch, getState}) => {
        const state: RootState = getState() as unknown as RootState
        if (data.address) {
            try {
                const contract = new state.blockchain.web3.eth.Contract(erc20ContractAbi as unknown as AbiItem, data.tokenAddress)
                return await contract.methods.balanceOf(data.address).call({from: data.address})
            } catch (e) {
                dispatch(addNotification({
                    message: e.message.data,
                    variant: 'error'
                }))
            }
        }
    }
)
