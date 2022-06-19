/** @jsxRuntime classic /
 /* @jsx jsx */
import {css, jsx} from '@emotion/react'
import {ChangeEventHandler, FC, SyntheticEvent, useCallback, useEffect, useMemo, useState} from 'react'
import {Box, Button, Divider, Tab, Tabs, TextField} from '@mui/material'
import {useFormik} from 'formik'
import * as yup from 'yup'
import styled from '@emotion/styled'
import * as React from 'react'
import {CInputSelect} from '../UI/CInputSelect/CInputSelect'
import {CButton} from '../UI/CButtons/CButtons'
import {useModalManager} from '../../hooks/useModalManager'
import {SelectTokenModal} from '../Modals/SelectTokenModal'
import {IToken} from '../../types/swap.types'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useWeb3} from '../../hooks/useWeb3'
import erc20ContractAbi from '../../blockchain/erc20Abi.json'
import paymentAbi from '../../blockchain/paymentAbi.json'
import {AbiItem} from 'web3-utils'
import {useAppDispatch} from '../../hooks/useAppDispatch'
import {swapApi} from '../../api/swap.api'
import {addNotification} from '../../store/slices/notifications/notifications.slice'
import {useSwapContract} from '../../hooks/useSwapContract'
import {getSwapTokenThunk} from '../../store/slices/swap/swap.thunk'
import {paymentContractAddress} from "../../app.config";

interface IProps {
}


interface IForm {
    from: string
    to: string
}

const validationSchema = yup.object({
    from: yup.string(),
    to: yup.string()
})

const initialValues: IForm = {
    from: '',
    to: ''
}


const StyledTextField = styled(TextField)`
  border: none !important;
  padding: 10px 0;

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .MuiOutlinedInput-input {
    color: black !important;
  }
`


interface ISelectedToken {
    address: string
    value: number
}

export const SwapForm: FC<IProps> = ({}) => {

    const contract = useSwapContract()


    // Form

    const {swapToken} = useTypedSelector(state => state.swap)

    const formik = useFormik<IForm>({
        initialValues,
        validationSchema,
        onSubmit: () => {
            contract.swapTokensForTokensSupportingFee({
                swapToken,
                address,
                addressTo: selectedTab === 1 && addressTo
            }).then(() => {
                dispatch(addNotification({
                    message: 'Success',
                    variant: 'success'
                }))
                const fromTokenContract = new web3.eth.Contract(erc20ContractAbi as unknown as AbiItem, fromToken.address)
                const toTokenContract = new web3.eth.Contract(erc20ContractAbi as unknown as AbiItem, toToken.address)
                fromTokenContract.methods.balanceOf(address).call(address).then(res => {
                    console.log(res)
                    setFromToken({
                        ...fromToken,
                        value: +res
                    })
                })
                toTokenContract.methods.balanceOf(address).call(address).then(res => {
                    console.log(res)
                    setToToken({
                        ...toToken,
                        value: +res
                    })
                })
            })
        }
    })
    const {handleSubmit, touched, errors, values, setFieldValue} = formik


    //Store

    const dispatch = useAppDispatch()
    const {address} = useTypedSelector(state => state.blockchain)

    //UI

    const [selectedTab, setSelectedTab] = useState<number>(0)
    const handleChangeTab = useCallback((_: SyntheticEvent, value: number) => {
        setSelectedTab(value)
    }, [selectedTab])

    const [currentModalType, setCurrentModalType] = useState<string>()

    const {setCurrentModal} = useModalManager()
    const handleOnClickSelectToken = useCallback((type: 'from' | 'to') => {
        return () => {
            setCurrentModalType(type)
            setCurrentModal('select-token')
        }
    }, [])


    const [selectedTokenFrom, setSelectedTokenFrom] = useState<IToken>(null)
    const [selectedTokenTo, setSelectedTokenTo] = useState<IToken>(null)


    const [fromToken, setFromToken] = useState<ISelectedToken>(null)
    const [toToken, setToToken] = useState<ISelectedToken>(null)


    const web3 = useWeb3()
    const handleSelectToken = useCallback((token: IToken) => {
        if (!currentModalType && !web3) return

        const erc20Contract = new web3.eth.Contract(erc20ContractAbi as unknown as AbiItem[], token.address)
        if (currentModalType === 'from') {

            if (address) {
                erc20Contract.methods.balanceOf(address).call({from: address}).then(res => {
                    setFromToken({
                        address: token.address,
                        value: +res
                    })
                })
            }
            if (token && selectedTokenTo) {
                dispatch(getSwapTokenThunk({
                    tokenFrom: selectedTokenTo.symbol,
                    tokenTo: token.symbol,
                    tokenAmountFrom: Number(values.from || values.to)
                })).then((res) => {
                    if (res && res.payload.trade) {
                        setFieldValue('from', +res.payload.trade.outputAmount / (10 * (token.decimals)))
                    }
                })
            }
            return setSelectedTokenFrom(token)
        }
        if (currentModalType === 'to') {
            if (address) {
                erc20Contract.methods.balanceOf(address).call({from: address}).then(res => {
                    setToToken({
                        address: token.address,
                        value: +res
                    })
                })
            }
            if (token && selectedTokenFrom) {
                dispatch(getSwapTokenThunk({
                    tokenFrom: selectedTokenFrom.symbol,
                    tokenTo: token.symbol,
                    tokenAmountFrom: Number(values.to || values.from)
                })).then((res) => {
                    if (res && res.payload.trade) {
                        setFieldValue('to', +res.payload.trade.outputAmount / (10 * (token.decimals)))
                    }
                })
            }
            return setSelectedTokenTo(token)
        }

    }, [currentModalType, web3, values, selectedTokenTo, selectedTokenFrom, address])


    //Swap API

    const handleChangeInputFrom = useCallback((event: any) => {
        const val = event.target.value
        setFieldValue('from', val)
        if (val && selectedTokenFrom && selectedTokenTo) {
            dispatch(getSwapTokenThunk({
                tokenFrom: selectedTokenFrom.symbol,
                tokenTo: selectedTokenTo.symbol,
                tokenAmountFrom: val
            })).then((res) => {
                if (res && res.payload.trade) {
                    setFieldValue('to', +res.payload.trade.outputAmount / (10 * (selectedTokenTo.decimals)))
                }
            })
        }
    }, [values, selectedTokenTo, selectedTokenFrom])

    const handleChangeInputTo = useCallback((event: any) => {
        const val = event.target.value
        setFieldValue('to', val)
        if (val && selectedTokenFrom && selectedTokenTo) {
            dispatch(getSwapTokenThunk({
                tokenFrom: selectedTokenTo.symbol,
                tokenTo: selectedTokenFrom.symbol,
                tokenAmountFrom: val
            })).then((res) => {
                if (res && res.payload.trade) {
                    setFieldValue('from', res.payload.trade.outputAmount / (10 * selectedTokenFrom.decimals))
                }
            })
        }
    }, [values, selectedTokenTo, selectedTokenFrom])

    const [addressTo, setAddressTo] = useState<string>('')


    return <StyledContainer>
        <Tabs value={selectedTab} onChange={handleChangeTab} css={css`width: 100%`}>
            {
                tabItems.map(({label}) => (<Tab key={label} css={css`width: 50%`} label={label}/>))
            }
        </Tabs>
        <form
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 0 40px 40px 40px;
            `}
            onSubmit={handleSubmit}>
            <CInputSelect
                selectedToken={selectedTokenFrom}
                label={'From'}
                balance={fromToken ? (fromToken.value / (10 * (selectedTokenFrom.decimals))) : null}
                onClick={handleOnClickSelectToken('from')}
                textFieldProps={{
                    value: values.from,
                    onChange: handleChangeInputFrom,
                    id: 'from',
                    name: 'from',
                    error: touched.from && Boolean(errors.from),
                    helperText: touched.from && errors.from,
                    placeholder: '0.0'
                }}/>
            <Divider/>
            <Box display={'flex'} alignItems={'center'}>
                {
                    selectedTab === 1 &&
                    <StyledTextField value={addressTo} onChange={(e) => setAddressTo(e.target.value)}
                                     placeholder={'Address To'}/>
                }
                <CInputSelect
                    selectedToken={selectedTokenTo}
                    balance={toToken ? (toToken.value / (10 * selectedTokenTo.decimals)) : null}
                    onClick={handleOnClickSelectToken('to')}
                    label={selectedTab === 1 ? 'To Token' : 'To'}
                    onlyToken={selectedTab === 1}
                    textFieldProps={{
                        value: values.to,
                        onChange: handleChangeInputTo,
                        id: 'to',
                        name: 'to',
                        error: touched.to && Boolean(errors.to),
                        helperText: touched.to && errors.to,
                        placeholder: '0.0'
                    }}/>
            </Box>

            {
                address ? <CButton type={'submit'} css={css`width: 100%`}>
                        Swap
                    </CButton>
                    :
                    <CButton css={css`width: 100%`}>
                        Wallet Connect
                    </CButton>
            }
        </form>
        <SelectTokenModal onChange={handleSelectToken}/>
    </StyledContainer>
}


interface ITabItem {
    label: string
    value: number
}

const tabItems: ITabItem[] = [
    {
        label: 'Swap',
        value: 0
    },
    {
        label: 'Send',
        value: 1
    }
]

const StyledContainer = styled.div`
  max-width: 650px;
  width: 100%;
  height: 100%;
  background: white;
`
