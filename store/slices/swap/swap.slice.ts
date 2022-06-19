import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {initialState, ISwapToken} from './swap.state'
import {setLoading} from '../system/system.slice'
import {IGetTokens, IToken} from "../../../types/swap.types";
import {allTokensBalanceOf, getSwapTokenThunk} from "./swap.thunk";


export const swapSlice = createSlice({
    name: 'blockchain',
    initialState,
    reducers: {
        setTokens(state, action: PayloadAction<IToken[]>) {
            state.tokens = action.payload
        },
        setSwapToken(state, action: PayloadAction<ISwapToken>) {
            state.swapToken = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(getSwapTokenThunk.fulfilled, (state, action: PayloadAction<ISwapToken>) => {
            if (action.payload && action.payload.trade) {
                console.log(action.payload)
                state.swapToken = action.payload
            }
        })

        builder.addCase(allTokensBalanceOf.fulfilled, (state, action: PayloadAction<IToken[]>) => {
            console.log(action.payload)
            state.tokens = action.payload
        })

    })
})

export const {setTokens, setSwapToken} = swapSlice.actions

export default swapSlice.reducer
