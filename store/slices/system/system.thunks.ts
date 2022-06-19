import { createAsyncThunk } from '@reduxjs/toolkit'
import { systemApi } from '../../../api/system.api'
import { addNotification } from '../notifications/notifications.slice'
import { ICreateUserBody, IMessage, IResendEmailMessage, IUpdateUserBody } from '../../../types/system.types'
import { setCreateUserCode } from './system.slice'


export const getIsUserTokenExistThunk = createAsyncThunk(
  'getIsUserExist',
  async (message: IMessage, { rejectWithValue, dispatch }) => {
    try {
      return await systemApi.getIsTokenUserExist(message)
    } catch (e) {
      dispatch(addNotification({
        message: e.data.message,
        variant: 'error'
      }))
      return rejectWithValue(e)
    }
  }
)


export const setUserThunk = createAsyncThunk(
  'setUserThunk',
  async (address: string, { rejectWithValue, dispatch }) => {
    try {
      return await systemApi.getUser(address)
    } catch (e) {
      dispatch(addNotification({
        message: e.toString(),
        variant: 'error'
      }))
      return rejectWithValue(e)
    }
  }
)

export const createUserThunk = createAsyncThunk(
  'createUser',
  async (data: ICreateUserBody, { rejectWithValue, dispatch }) => {
    try {
      return await systemApi.createUser(data).then(response => {
        dispatch(addNotification({
          message: 'User is Created',
          variant: 'success'
        }))
        return response
      })
    } catch (e) {
      dispatch(addNotification({
        message: e.data.message,
        variant: 'error'
      }))
      if (e.status === 409) dispatch(setCreateUserCode(409))

      return rejectWithValue(e)
    }
  }
)


export const resendEmailMessageThunk = createAsyncThunk(
  'resendEmailMessageThunk',
  async (data: IResendEmailMessage, { rejectWithValue, dispatch }) => {
    try {
      return await systemApi.resendEmailMessage(data)
    } catch (e) {
      dispatch(addNotification({
        message: e.data.message,
        variant: 'error'
      }))
      return rejectWithValue(e)
    }
  }
)


export const updateUserThunk = createAsyncThunk(
  'updateUserThunk',
  async (data: IUpdateUserBody, { rejectWithValue, dispatch }) => {
    try {
      return await systemApi.updateUser(data).then(response => {
        dispatch(addNotification({
          message: 'User is Updated',
          variant: 'success'
        }))
        return response
      })
    } catch (e) {
      dispatch(addNotification({
        message: e.data.message,
        variant: 'error'
      }))
      return rejectWithValue(e)
    }
  }
)

