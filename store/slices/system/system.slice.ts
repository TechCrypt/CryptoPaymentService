import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGetUserResponse, initialState, IUser } from './system.state'
import { createUserThunk, setUserThunk, updateUserThunk } from './system.thunks'

const systemSlice = createSlice({
  name: 'systemSlice',
  initialState,
  reducers: {
    routeToSign(state, action) {
      state.isRouteToSign = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setCreateUserCode(state, action: PayloadAction<number>) {
      state.createUserCode = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUserThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(setUserThunk.fulfilled, (state, action: PayloadAction<IGetUserResponse>) => {
      state.isUserLogIn = action.payload.status === 200
      state.user = action.payload.message as IUser
      state.isLoading = false
    })
    builder.addCase(setUserThunk.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })

    builder.addCase(createUserThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createUserThunk.fulfilled, (state) => {
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(createUserThunk.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUserThunk.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
  }
})

export const { routeToSign, setLoading, setCreateUserCode } = systemSlice.actions

export default systemSlice.reducer
