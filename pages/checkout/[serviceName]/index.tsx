import {GetServerSideProps, NextPage} from 'next'
import {Box} from '@mui/material'
import {BlurLayout} from '../../../layouts/BlurLayout'
import {ProductCard} from '../../../components/Cards/ProductCard'
import {IProduct} from '../../../types/common.types'
import {useRouter} from 'next/router'
import {useCallback, useEffect, useMemo} from 'react'
import {useTypedSelector} from '../../../hooks/useTypedSelector'
import {useAppDispatch} from '../../../hooks/useAppDispatch'
import {addNotification} from '../../../store/slices/notifications/notifications.slice'
import {CLink} from '../../../components/UI/CLink/CLink'
import {useConnected} from '../../../hooks/useConnected'
import {useWeb3} from '../../../hooks/useWeb3'
import Web3 from 'web3'
import {IGetTokens, IToken} from "../../../types/swap.types";
import {setTokens} from "../../../store/slices/swap/swap.slice";
import {useModalManager} from "../../../hooks/useModalManager";
import {PayWithTokens} from "../../../components/Modals/PayWithTokens";

const DOMAIN_TYPE = [
    {
        type: 'string',
        name: 'name',
    },
    {
        type: 'string',
        name: 'version',
    },
    {
        type: 'uint256',
        name: 'chainId',
    },
    {
        type: 'address',
        name: 'verifyingContract',
    },
]

interface IProps {
    data: IToken[]
}

const netflixToken: IToken = {
    address: "0x07de306FF27a2B630B1141956844eB1552B956B5",
    asset: "c60_t0x07de306FF27a2B630B1141956844eB1552B956B5",
    cAddress: "0x3f0A0EA2f86baE6362CF9799B523BA06647Da018",
    chainId: 42,
    decimals: 6,
    id: 150,
    logoURI: "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
    name: "Tether USD",
    pairs: [],
    symbol: "USDT",
    type: "ERC20",
}


const addressOfNetflix = '0xD155b2B8450B016dc399f939f0aA59D6b17C722a'


const CheckoutPage: NextPage<IProps> = ({data}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data) {
            console.log(data)
            dispatch(setTokens(data))
        }
    }, [data])


    const {isUserLogIn} = useTypedSelector(state => state.system)

    const {address} = useTypedSelector(state => state.blockchain)
    const {setCurrentModal} = useModalManager()
    const handleOnBuyClick = useCallback(() => {
        setCurrentModal('pay-with-tokens')
    }, [isUserLogIn])


    const {connected} = useConnected()

    const router = useRouter()
    const {query} = router
    const computeContent = useMemo(() => {
        const {imgSrc, price, currency, productId, productName} = query as unknown as IProduct
        const product: IProduct = {
            price: +price,
            currency,
            productId,
            serviceName: query.serviceName as string
        }
        if (imgSrc) product.imgSrc = imgSrc
        if (productName) product.productName = productName
        return <ProductCard token={netflixToken} product={product} onBuyClick={handleOnBuyClick}/>
    }, [isUserLogIn, connected, query])

    return <Box>
        <BlurLayout>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}
                 height={'100vh'}>
                {
                    computeContent
                }
            </Box>
        </BlurLayout>
        <PayWithTokens store={{addressOfStore: addressOfNetflix, symbolOfToken: netflixToken.symbol}} onChange={() => {
        }}/>
    </Box>
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


export default CheckoutPage
