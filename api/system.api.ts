import { instance } from './axios.instance'
import { IGetUserResponse } from '../store/slices/system/system.state'
import { ICreateUserBody, IMessage, IResendEmailMessage, IUpdateUserBody } from '../types/system.types'
import { IMessageResponse } from '../types/common.types'

export const systemApi = {
  getUser: async (address: string): Promise<IGetUserResponse> => {
    try {
      return await instance.get(`/api/v1/users/${address}`)
    } catch (e) {
      throw e
    }
  },
  async getIsTokenUserExist({ token, code }: IMessage): Promise<IMessageResponse> {
    return await instance.get(`/api/v1/messenger/verify/${token}/${code}`)
  },
  async createUser(body: ICreateUserBody) {
    try {
      return await instance.post('/api/v1/users/create', body)
    } catch (e) {
      throw e
    }
  },
  async resendEmailMessage({ address, email }: IResendEmailMessage) {
    try {
      return await instance.get(`/api/v1/messenger/resend-email?email=${email}&address=${address}`)
    } catch (e) {
      throw e
    }
  },
  async updateUser(body: IUpdateUserBody) {
    try {
      return await instance.put('/api/v1/users/update', body)
    } catch (e) {
      throw e
    }
  }
}
