import {useWeb3} from "./useWeb3";
import swapAbi from '../blockchain/swapAbi.json'
import erc20Abi from '../blockchain/erc20Abi.json'
import {AbiItem} from "web3-utils";
import {swapContractAddress} from "../app.config";
import {ISwapToken} from "../store/slices/swap/swap.state";

export interface ISwapTokens {
    address: string
    swapToken: ISwapToken
}

export const useSwapContract = () => {
    const web3 = useWeb3()
    if (!web3) return null

    const contract = new web3.eth.Contract(swapAbi as unknown as AbiItem[], swapContractAddress)

    const swapTokensForTokensSupportingFee = async ({address, swapToken}: ISwapTokens) => {

        const tokenAddress = new web3.eth.Contract(erc20Abi as unknown as AbiItem[], swapToken.input.address)
        if (address) {
            await tokenAddress.methods.approve(address, '115792089237316195423570985008687907853269984665640564039457584007913129639935')
                .send({from: address})
        }
        const timestamp = Math.floor(new Date(new Date().getTime() + 15 * 60000).getTime() / 1000);
        contract.methods.swapTokensForTokensSupportingFee(swapToken.trade.inputAmount, swapToken.trade.amountOutMin,
            [swapToken.input.address, swapToken.output.address], '0xD155b2B8450B016dc399f939f0aA59D6b17C722a', timestamp).send({
            from: address
        })
    }
    return {
        swapTokensForTokensSupportingFee
    }
}
