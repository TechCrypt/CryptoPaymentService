/** @jsxRuntime classic /
 /** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { NextPage } from 'next'
import Head from 'next/head'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import { TransactionsTable } from '../../components/TransactionsTable/TransactionsTable'
import { Typography } from '@mui/material'
import { Fragment } from 'react'


export const Transactions: NextPage = () => {
  return <Fragment>
    <Head>
      <title>
        Transactions
      </title>
    </Head>
    <DefaultLayout withAnimation>
      <div style={{ width: '100%', height: '100%' }}>
        <Typography css={css`
          display: inline-flex;
          justify-content: center;
          align-items: center;

          &::before {
            content: '';
            display: inline-block;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            background: #32EEFF;
            margin-right: 15px;
          }
        `} variant={'h2'}>TRANSACTIONS</Typography>

        <TransactionsTable />
      </div>
    </DefaultLayout>
  </Fragment>
}
export default Transactions
