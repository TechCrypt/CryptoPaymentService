export interface IGetUserResponse {
  message: IUser | string,
  status: number
}

export interface IUser {
  id?: number,
  passportId: string,
  birthDate: string,
  photo?: string | null,
  patronymic?: null | string,
  name: string,
  surname: string,
  address: string,
  phone?: string | null,
  email: string,
  confirmed?: boolean
}


export interface IConfirmAccountData {
  token: string,
  code: string,
  address: string
}

interface ISystemState {
  isUserLogIn: boolean | null,
  isLoading: boolean,
  isError: boolean,
  user: null | IUser,
  createUserCode?: number
  isRouteToSign?: boolean,
  token?: string
}

export const initialState: ISystemState = {
  isUserLogIn: null,
  isError: false,
  isLoading: false,
  user: null,
}
