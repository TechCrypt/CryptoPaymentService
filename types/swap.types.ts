
export interface IToken {
    address: string
    asset: string
    decimals: number
    id: number
    logoURI: string
    name: string
    pairs: any[]
    symbol: string
    type: string
    balanceOf?: string | number
    chainId: number
    cAddress: string
}

export interface IGetTokens {
    ethereum: IToken[]
    smartChain: IToken[]
    solana: IToken[]
}
