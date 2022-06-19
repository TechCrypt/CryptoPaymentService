import axios from 'axios'

export interface IGetSwapTokens {
    tokenFrom: string
    tokenTo: string
    tokenAmountFrom: number
    address?: string
}

export const swapApi = {
    getSwapTokens({
                      tokenFrom,
                      tokenTo,
                      tokenAmountFrom
                  }: IGetSwapTokens) {
        try {
            return axios.get(`http://80.240.28.79:90/api/v1/token/swap-amount?tokenFrom=${tokenFrom}&tokenTo=${tokenTo}&tokenAmountFrom=${tokenAmountFrom}`).then(res => res.data)
        } catch (e) {
            throw e
        }
    }
}
