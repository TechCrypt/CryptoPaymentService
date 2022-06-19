import { FC, useMemo } from 'react'
import { useTable } from 'react-table'
import styled from '@emotion/styled'
import { CBadge } from '../UI/CBadge/CBadge'
import { Button, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import SearchIcon from '@mui/icons-material/Search'

interface IProps {
  transaction?: string[];
}

const Styled = styled.div`
  width: 100%;

  .value {
    color: #32EEFF;
  }

  .table {
    width: inherit;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 30px;
      margin: 30px 0;

      &__paginator {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
      }
    }


    .table-wrapper {
      width: 100%;
      background: #092134;
      padding: 20px 0;
      border-radius: 10px;
      overflow:auto;

      &__title {
        padding: 0 30px;
        border-bottom: 1px solid #2C4152;
        h5 {
          padding-bottom: 15px;
        }
      }

      table {
        width: 100%;
        padding: 10px 30px;

        p {
          margin: 0;
        }

        thead {
          width: 100%;

          &::after {
            content: '';
            width: 100%;
            display: block;
            height: 1px;
            background: #2C4152;
          }
        }

        tr {
          height: 60px;

          .company {
            display: flex;
            align-items: center;

            &__img {
              margin-right: 20px;
            }

            &__name {
              font-size: 18px;
            }

            &__transaction-date {
              font-weight: 400;
              font-size: 14px;
              line-height: 17px;
              color: #808080;
            }
          }
        }
      }
    }
  }
`

const StyledButton = styled(Button)`
  background: #092134;
  border-radius: 10px;
  border: none;
  font-weight: 700 !important;
  font-size: 12px !important;
  line-height: 17px !important;
  height: 40px !important;
  margin-left: 10px;

  svg {
    color: white !important;
  }
`

export const TransactionsTable: FC<IProps> = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1' // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2'
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World'
      },
      {
        col1: 'react-table',
        col2: 'rocks'
      },
      {
        col1: 'whatever',
        col2: 'you want'
      }
    ],
    []
  )

  const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps
  } = tableInstance

  return (
    <Styled>
      <div className="table">
        <div className={'table__header'}>
          <Typography>
            More than {'>'} 1,485,282,004 transactions found (Showing the last 500k records)
          </Typography>
          <div className="table__header__paginator">
            <StyledButton>First</StyledButton>

            <StyledButton>
              <ArrowBackIosIcon />
            </StyledButton>

            <StyledButton>Page 1 of 10000</StyledButton>

            <StyledButton>
              <ArrowForwardIosIcon />
            </StyledButton>

            <StyledButton>
              Last
            </StyledButton>

            <StyledButton>
              <SearchIcon />
            </StyledButton>


          </div>
        </div>
        <div className="table-wrapper">
          <div className={'table-wrapper__title'}>
            <Typography variant={'h5'}>
              Latest Transactions
            </Typography>
          </div>
          <table {...getTableProps()}>
            <tbody {...getTableBodyProps()}>
            <tr>
              <td className={'company'}>
                <div className={'company__img'}>
                  <img src="/assets/img/apple.svg" />
                </div>
                <div>
                  <p className={'company__name'}>Apple</p>
                  <p className={'company__transaction-date'}>24sec</p>
                </div>
              </td>
              <td>
                <div>
                  <p>From: <span className={'value'}>0x1e47F6F9805Ac8264b14eA1013f866F0e6a28424</span></p>
                  <p>To: <span className={'value'}>0x1e47F6F9805Ac8264b14eA1013f866F0e6a28424</span></p>
                </div>
              </td>
              <td>
                <div>
                  <p>ID: <span className={'value'}>002344</span></p>
                  <p className={'value'}>Apple Watch Series 7, 4...</p>
                </div>
              </td>
              <td>
                <div>
                  <p>Value: <span className={'value'}>002344</span></p>
                  <p className={'value'}>USA. NY. Qee...</p>
                </div>
              </td>
              <td>
                <CBadge status={'success'} />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Styled>
  )
}
