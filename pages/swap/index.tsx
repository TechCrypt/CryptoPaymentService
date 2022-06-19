import {GetServerSideProps, NextPage} from 'next'
import {DefaultLayout} from '../../layouts/DefaultLayout'
import {IGetTokens, IToken} from '../../types/swap.types'
import {SwapForm} from '../../components/Forms/SwapForm'
import {useEffect} from 'react'
import {useAppDispatch} from '../../hooks/useAppDispatch'
import {setTokens} from '../../store/slices/swap/swap.slice'
import {Box} from '@mui/material'

interface IProps {
    data: IToken[]
}

const index: NextPage<IProps> = ({data}) => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (data) {
            dispatch(setTokens(data))
        }
    }, [data])

    return <DefaultLayout>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <SwapForm/>
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
