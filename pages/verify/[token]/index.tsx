import { NextPage } from 'next'
import Head from 'next/head'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { FormContainer } from '../../../components/FormContainer/FormContainer'
import { VerificationAccountForm } from '../../../components/Forms/VerificationAccountForm'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { getIsUserTokenExistThunk } from '../../../store/slices/system/system.thunks'
import { IMessageResponse } from '../../../types/common.types'


const VerifyAccount: NextPage = () => {

  const router = useRouter()
  const { token, code } = router.query


  const [isTokenCorrect, setIsTokenCorrect] = useState<boolean | null>(true)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token && code) {
      dispatch(getIsUserTokenExistThunk({
        token: token as string,
        code: code as string
      })).then((res) => {
        if (res.payload && (res.payload as IMessageResponse).message as boolean) {
          setIsTokenCorrect(true)
        }
      })
    }
  }, [token])
  return (
    <>
      <Head>
        <title>Verify Account</title>
      </Head>
      <DefaultLayout>
        <FormContainer title={'verification'} subtitle={'Confidentional by Conglomerate'}>
          <VerificationAccountForm isTokenValid={!!isTokenCorrect} token={token as string} code={code as string} />
        </FormContainer>
      </DefaultLayout>
    </>
  )
}
export default VerifyAccount
