export interface IRouterLink {
    name: string;
    path: string;
    active?: boolean
}

export type TStatus = 'success' | 'failed' | 'suspense'

export interface IUser {
    'id': 1,
    'passportId': string,
    'birthDate': string,
    'photo': string,
    'patronymic': null,
    'name': string,
    'surname': string,
    'address': string,
    'phone': null | string,
    'email': null | string
}


export interface ITransaction {
    'id': number,
    'txnHash': string,
    'block': string | number,
    'timestamp': string,
    'status': string,
    'value': string | number,
    'from': null | IUser,
    'to': null | IUser
}


export interface IMessageResponse {
    message: any
    code: number
}


export interface IProduct {
    serviceName?: string
    serviceId?: number
    productId: number
    price: string | number
    currency: string
    productName?: string
    category?: string | number
    imgSrc?: string
}
