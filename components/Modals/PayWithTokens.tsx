/** @jsxRuntime classic /
 /* @jsx jsx */
import {css, jsx} from '@emotion/react'
import {FC, useCallback, useState, Fragment, useEffect, useRef} from 'react'
import {ModalContainer} from './ModalContainer'
import {Box, Button, Divider, List, ListItem, TextField, Typography} from '@mui/material'
import {modalStyle} from './common.style'
import {Portal} from '../Portal'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useModalManager} from '../../hooks/useModalManager'
import Image from 'next/image'
import {IGetTokens, IToken} from '../../types/swap.types'
import {InputProps as StandardInputProps} from '@mui/material/Input/Input'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {Swiper as SwiperClass} from "swiper/types";
import erc20ContractAbi from "../../blockchain/erc20Abi.json";
import {AbiItem} from "web3-utils";
import {useWeb3} from "../../hooks/useWeb3";
import {useSwapContract} from "../../hooks/useSwapContract";
import {getSwapTokenThunk} from "../../store/slices/swap/swap.thunk";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {addNotification} from "../../store/slices/notifications/notifications.slice";


interface IStore {
    addressOfStore: string
    symbolOfToken
}

interface IProps {
    onChange: (token: IToken) => void
    store: IStore
}

export const PayWithTokens: FC<IProps> = ({onChange, store}) => {

    //store
    const {tokens} = useTypedSelector(state => state.swap)

    const [filteredTokens, setFilteredTokens] = useState<IToken[] | null>(null)

    useEffect(() => {
        if (tokens) {
            setFilteredTokens(tokens)
        }
    }, [tokens])

    const handleInputChange = useCallback((event) => {
        if (!event.target.value) {
            return setFilteredTokens(tokens)
        }

        setFilteredTokens(tokens.filter(token => {
            return token.name.toLowerCase().includes(event.target.value.toLowerCase())
        }))
    }, [tokens])


    const web3 = useWeb3()
    const {address} = useTypedSelector(state => state.blockchain)

    const [balanceOfToken, setBalanceOfToken] = useState<number>(null)
    const [selectedToken, setSelectedToken] = useState<IToken>(null)

    const contract = useSwapContract()
    const dispatch = useAppDispatch()
    const {swapToken} = useTypedSelector(state => state.swap)

    //ui
    const swiperRef = useRef(null)


    const handleClickToken = useCallback((token: IToken) => {
        return () => {
            onChange(token)
            setSelectedToken(token)
            const erc20Contract = new web3.eth.Contract(erc20ContractAbi as unknown as AbiItem[], token.address)
            erc20Contract.methods.balanceOf(address).call({from: address})
                .then(async res => {
                    setBalanceOfToken(+res)
                    dispatch(getSwapTokenThunk({
                        tokenFrom: token.symbol,
                        tokenTo: store.symbolOfToken,
                        tokenAmountFrom: 0.2
                    }))
                })

            swiperRef.current.swiper!.slideNext()
        }
    }, [onChange, swiperRef, web3, address])


    const {setCurrentModal} = useModalManager()
    const handleClickBuy = useCallback(() => {
        contract.swapTokensForTokensSupportingFee({
            swapToken,
            address: address,
            addressTo: store.addressOfStore
        }).then(() => {
            dispatch(addNotification({
                message: 'Success Buy!',
                variant: 'success'
            }))
            dispatch(addNotification({
                message: 'We Send You 500 TECHC!',
                variant: 'success'
            }))
            setCurrentModal(null)
        })
    }, [store, swapToken])

    return <Portal>
        <ModalContainer name={'pay-with-tokens'}>
            <Box
                sx={{
                    ...modalStyle,
                    maxHeight: 700
                }}
                css={css`
                  overflow: auto;
                  overflow-x: hidden;
                `}
            >
                <Swiper
                    onInit={(core: SwiperClass) => {
                        swiperRef.current = core.el
                    }}
                    preventInteractionOnTransition={true}
                >
                    <SwiperSlide>
                        <Box>
                            <Typography variant={'h6'}>
                                Select Token
                            </Typography>

                            <TextField onChange={handleInputChange}/>


                            {
                                filteredTokens && Array.isArray(tokens) && <Fragment>
                                    <Typography my={2}>
                                        Tokens Count: <span style={{fontWeight: 500}}>{filteredTokens.length}</span>
                                    </Typography>

                                    <List>
                                        {
                                            filteredTokens.map(token => <ListItem key={token.id} button
                                                                                  onClick={handleClickToken(token)}>
                                                <Box mr={2}>
                                                    <Image src={token.logoURI}
                                                           loader={() => token.logoURI}
                                                           loading={'lazy'}
                                                           lang={'fill'}
                                                           width={50}
                                                           height={50}/>
                                                </Box>
                                                {
                                                    token.name
                                                }
                                            </ListItem>)
                                        }
                                    </List>
                                </Fragment>
                            }
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <h1>Netflix</h1>
                        {
                            selectedToken && <Box>

                                <Divider/>
                                <h3>Address of Token: {selectedToken.address}</h3>
                                <Divider/>
                                <h3>Address of Store: {store.addressOfStore}</h3>
                                <Divider/>
                                <h3>Balance Of: {selectedToken.symbol}</h3>
                                <h3>{balanceOfToken} {selectedToken.symbol}</h3>
                            </Box>
                        }
                        <Button onClick={handleClickBuy} css={css`width: 100%`}>
                            Buy
                        </Button>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </ModalContainer>
    </Portal>
}
