import { VariantType } from 'notistack'

export interface INotification {
  message: string,
  variant: VariantType
}

interface INotificationsState {
  notifications: INotification[];
}

export const initialState: INotificationsState = {
  notifications: []
}
