export interface IMessage {
  code: string;
  token: string;
}

export interface ICreateUserBody {
  address: string;
  phone?: string;
  email?: string;
  password: string;
  referralId?: string;
  phoneCode?: string
  termsCheckbox?: boolean
}

export interface IResendEmailMessage {
  address: string
  email: string
}

export interface IUpdateUserBody {
  country: string;
  name: string;
  surname: string;
  middle: string;
  birthDate: string;
  street?: string;
  index?: number | string;
  city: string;
  phone: number | string;
  photo: string;
  token?: string;
  code?: string;
  passportId?: string
}
