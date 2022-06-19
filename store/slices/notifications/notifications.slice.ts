import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialState, INotification } from './notifications.state'

const notificationsSlice = createSlice({
  name: 'notificationsSlice',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<INotification>) {
      state.notifications.push(action.payload)
    },
    removeNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter((_, i) => i !== action.payload)
    }
  }
})

export const { addNotification, removeNotification } = notificationsSlice.actions

export default notificationsSlice.reducer
