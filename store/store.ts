import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import blockchainReducer  from './slices/blockchain/blockchain.slice'
import systemReducer  from './slices/system/system.slice'
import notificationReducer  from './slices/notifications/notifications.slice'
import swapReducer from "./slices/swap/swap.slice";


const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const combineReducer = combineReducers({
    blockchain: blockchainReducer,
    system: systemReducer,
    notifications: notificationReducer,
    swap: swapReducer
})


export const store = configureStore({
    reducer: combineReducer,
    middleware: customizedMiddleware
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
