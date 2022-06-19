import type {NextPage} from 'next'
import {DefaultLayout} from '../../layouts/DefaultLayout'
import Head from 'next/head'
import { CreateFreeAccountForm } from '../../components/Forms/CreateFreeAccountForm'
import { FormContainer } from '../../components/FormContainer/FormContainer'


const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Sign In</title>
            </Head>
            <DefaultLayout>
              <FormContainer title={'create a free account'} subtitle={'Welcome to Conglomerate'}>
                <CreateFreeAccountForm/>
              </FormContainer>
            </DefaultLayout>
        </>
    )
}
export default Login
