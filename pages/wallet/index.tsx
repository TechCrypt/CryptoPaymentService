import {GetServerSideProps, NextPage} from 'next'
import {DefaultLayout} from "../../layouts/DefaultLayout";
import {Box, List, ListItem} from "@mui/material";
import {IGetTokens, IToken} from "../../types/swap.types";
import {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {setTokens} from "../../store/slices/swap/swap.slice";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useWeb3} from "../../hooks/useWeb3";
import erc20Abi from '../../blockchain/erc20Abi.json'
import {AbiItem} from "web3-utils";
import {techToken} from "../../app.config";
import Image from "next/image";

interface IProps {
    data: IToken[]
}

const index: NextPage<IProps> = ({data}) => {


    const dispatch = useAppDispatch()

    const {tokens} = useTypedSelector(state => state.swap)


    const web3 = useWeb3()

    const {address} = useTypedSelector(state => state.blockchain)

    const [techCToken, setTechCToken] = useState<number>(null)

    useEffect(() => {

        if (web3 && data && address) {
            (async () => {
                console.log(data)
                const tokensAll = await Promise.all(data.map(async token => {
                    const contract = new web3.eth.Contract(erc20Abi as unknown as AbiItem, token.address)
                    const balanceOf = await contract.methods.balanceOf(address).call({from: address})
                    return {
                        ...token,
                        balanceOf: +balanceOf
                    } as IToken
                }))
                dispatch(setTokens(tokensAll))
                const contract = new web3.eth.Contract(erc20Abi as unknown as AbiItem, techToken)
                const balanceOf = await contract.methods.balanceOf(address).call({from: address})
                setTechCToken(balanceOf)
            })()
        }
    }, [web3, data, address])

    return <DefaultLayout>
        <Box>
            <h1>Wallet</h1>
            <h3>My Tokens</h3>
            {
                tokens && <List>
                    {
                        tokens.map(token => <ListItem button key={token.address} title={token.symbol}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Box>
                                    <h4>{token.symbol}</h4>
                                    <Image src={token.logoURI} loader={() => token.logoURI} width={50} height={50}/>
                                </Box>
                                <Box>
                                    Balance of {+token.balanceOf / (1 * token.decimals)}
                                </Box>
                            </Box>
                        </ListItem>)
                    }
                    <ListItem button title={'TECHC'}>
                        <Box display={'flex'} flexDirection={'column'}>
                            <h4>TECHC</h4>
                            <Box>
                                Balance of {techCToken}
                            </Box>
                        </Box>
                    </ListItem>
                </List>
            }

        </Box>
    </DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async ({res}) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const resData: Response = await fetch('http://80.240.28.79:90/api/v1/token/list')
    const data: IGetTokens = await resData.json()

    return {
        props: {
            data
        }
    }
}


export default index
