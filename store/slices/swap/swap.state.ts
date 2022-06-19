import {IGetTokens, IToken} from "../../../types/swap.types";


export interface ISwapToken {
    "pairAddress": string,
    "trade": {
        "outputAmount": string,
        "outputAmountFormatted": string,
        "outputAmountInvertFormatted": string,
        "inputAmount": string,
        "amountOutMin": string,
        "amountOutMax": string,
        "executionPrice": string,
        "nextMidPrice": string
    },
    "input": { "decimals": number, "chainId": number, "address": string },
    "output": { "decimals": number, "chainId": number, "address": string }
}

interface ISwapSlice {
    tokens?: IToken[]
    swapToken?: ISwapToken
    fromTokenBalance?: number
    toTokenBalance?: number
}

export const initialState: ISwapSlice = {}
