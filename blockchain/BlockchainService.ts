import Web3 from 'web3'
// import shopAbi from '../abi/shop_abi.json'
// import { AbiItem } from 'web3-utils'


export const contractAddress = '0x43d49aBe9887e5b5282Fd12df041624f4adaEA6d'



// const contract = new web3.eth.Contract(shopAbi as unknown as AbiItem, contractAddress)


export class BlockchainService {

  private windowEthereum:any
  web3: Web3

  constructor(windowEthereum: any) {
    this.windowEthereum = windowEthereum
    this.web3 = new Web3(window['ethereum'])
  }

  public async isConnected(): Promise<boolean> {
    const accounts: string[] = await this.windowEthereum.request({ method: 'eth_accounts' })
    return !!accounts.length
  }

  public async getMetaMaskAccounts(): Promise<string[]> {
    return await this.web3.eth.getAccounts()
  }

}
