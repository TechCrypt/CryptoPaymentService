import { NextPage } from 'next'
import { Box } from '@mui/material'
import { BlurLayout } from '../../../layouts/BlurLayout'
import { ProductCard } from '../../../components/Cards/ProductCard'
import { IProduct } from '../../../types/common.types'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { addNotification } from '../../../store/slices/notifications/notifications.slice'
import { CLink } from '../../../components/UI/CLink/CLink'
import { useConnected } from '../../../hooks/useConnected'
import { useWeb3 } from '../../../hooks/useWeb3'
import Web3 from 'web3'

const Types721 = {
  Part: [
    { name: 'account', type: 'address' },
    { name: 'value', type: 'uint96' }
  ],
  Mint721: [
    { name: 'tokenId', type: 'uint256' },
    { name: 'tokenURI', type: 'string' },
    { name: 'creators', type: 'Part[]' },
    { name: 'royalties', type: 'Part[]' }
  ]
}

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

function createTypeData (domainData: any, primaryType: any, message: any, types: any) {
  return {
    types: Object.assign({
      EIP712Domain: DOMAIN_TYPE,
    }, types),
    domain: domainData,
    primaryType: primaryType,
    message: message
  }
}




const CheckoutPage: NextPage = () => {
  const { isUserLogIn } = useTypedSelector(state => state.system)

  useEffect(() => {
    // if (isUserLogIn === false) {
    //   router.push('/')
    // }
  }, [isUserLogIn])




  const dispatch = useAppDispatch()
  const {address} = useTypedSelector(state => state.blockchain)
  const handleOnBuyClick = useCallback(() => {
    // if (!isUserLogIn || !connected) {
    //   dispatch(addNotification({
    //     message: !isUserLogIn ? 'Please sign-in' : 'Please Connect MetaMask',
    //     variant: 'error'
    //   }))
    // }
    const web3 = new Web3(window['ethereum'])
    const cb = () => {
        dispatch(addNotification({
          message: 'Success',
          variant: 'success'
        }))
    }
    if(web3) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      web3.currentProvider!.sendAsync(
        {
          jsonrpc: '2.0',
          method: 'eth_signTypedData_v4',
          params: [address, JSON.stringify({
            none: 50
          })],
          id: new Date().getTime(),
        },
        cb
      )
    }
    }, [isUserLogIn])

  const { connected } = useConnected()

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
    if(imgSrc) product.imgSrc = imgSrc
    if(productName) product.productName = productName
    return <ProductCard product={product} onBuyClick={handleOnBuyClick} />
  }, [isUserLogIn, connected, query])

  return <Box>
    <BlurLayout>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} height={'100vh'}>
        {
          computeContent
        }
      </Box>
    </BlurLayout>
  </Box>
}


export default CheckoutPage
