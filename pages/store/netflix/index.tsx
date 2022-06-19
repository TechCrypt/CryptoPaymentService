/** @jsxRuntime classic /
 /** @jsx jsx */
import {NextPage} from 'next'
import {Box} from '@mui/material'
import {css, jsx} from '@emotion/react'
import Image from 'next/image'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {IProduct} from '../../../types/common.types'
import Link from 'next/link'

const shop: IProduct = {
    serviceName: 'netflix',
    serviceId: 12,
    productName: 'Netflix 1 year Sub!',
    productId: 59,
    imgSrc: 'https://play-lh.googleusercontent.com/384jx3OL4_tqtCGZrfIB6Q5TehM0Q7TLYFsenRPfeT8f-3vicWH2BYbvaEAneaPFMMM',
    currency: 'ETH',
    price: 0.7
}

const NetflixPage: NextPage = () => {

    const router = useRouter()

    const handleClickBuy = () => {
        // router.push({
        //   pathname: `/checkout/${shop.serviceName}`,
        //   query: {
        //     productId: shop.productId,
        //     imgSrc: shop.imgSrc,
        //     category: shop.category,
        //     currency: shop.currency,
        //     price: shop.price,
        //     productName: shop.productName
        //   }
        // })
    }

    return <Box css={css`
      width: 100%;
      height: 100%;
      min-height: 100vh;
      background: white;
      color: black !important;

      * {
        margin: 0;
      }

      header {
        width: 100%;
        padding: 1px 55px 0 55px;
        border-bottom: 1px solid #e6e6e6;

        .logo {
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            min-width: 167px !important;
            width: 167px !important;
            height: 45px !important;
            min-height: 45px !important;
          }

          .sign-in {
            font-weight: 700;
            font-size: 19px;
            line-height: 90px;
          }
        }
      }

      main {
        form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .lock {
            display: inline-block;
            width: 50px;
            height: 50px;
            background: url("/assets/img/Lock.png") no-repeat center;
            background-size: 50px;
            margin: 20px 0;
          }

          .step-title-desc {
            font-size: 13px;
          }

          .step-title {
            font-size: 32px;
            font-weight: 700;
          }

          .step-decs {
            margin: 20px 0;
            font-size: 18px;
            max-width: 205px;
            text-align: center;
          }

          .step-pay-desc {
            text-align: center;
            font-weight: 700;
            max-width: 205px;
            font-size: 18px;
          }

          .selections {
            max-width: 500px;
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 30px;

            .selection {
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-radius: 7px;
              border: 2px solid #e6e6e6;
              font-size: 17px;
              padding: 15px;
              width: 100%;
              cursor: pointer;
              margin-top: 20px;

              .content {
                display: flex;
                align-items: center;

                .placeholder {
                  margin-right: 20px;
                }

                .cards {
                  max-height: 25px;

                  span {
                    margin-right: 10px !important;
                  }
                }
              }
            }
          }
        }
      }
    `}>
        <Head>
            <title>Netflix</title>
            <link rel="icon" href="/assets/img/favicon.ico"/>
        </Head>
        <header>
            <div className="logo">
                <Image
                    src={'/assets/img/Netflix_2015_logo.svg'}
                    width={'100%'}
                    height={'100%'}
                />
                <span className="sign-in">Sign in</span>
            </div>
        </header>
        <main>
            <form className={'step-pay'}>
                <span className="lock"/>
                <p className="step-title-desc">ШАГ 3 ИЗ 3</p>
                <h3 className="step-title">Настройте оплату</h3>
                <p className="step-decs">Ваша подписка начнется, как только вы введете данные для оплаты.</p>
                <p className="step-pay-desc">Никаких обязательств.</p>
                <p className="step-pay-desc">Отменить подписку можно в любое время.</p>
                <div className="selections">

                    <div className="selection">
                        <div className="content">
                            <span className={'placeholder'}>Банковская карта</span>
                            <div className="cards">
                                <Image className={'card-img'} src={'/assets/img/mastercard-v2.svg'} width={40}
                                       height={25}/>
                                <Image className={'card-img'} src={'/assets/img/Netflix_2015_logo.svg'} width={40}
                                       height={25}/>
                                <Image className={'card-img'} src={'/assets/img/visa-v3.svg'} width={40} height={25}/>
                            </div>
                        </div>
                        <ChevronRightIcon/>
                    </div>

                    <div className="selection">
                        <Link href={{
                            pathname: `/checkout/${shop.serviceName}`,
                            query: {
                                productId: shop.productId,
                                imgSrc: shop.imgSrc,
                                category: shop.category,
                                currency: shop.currency,
                                price: shop.price,
                                productName: shop.productName
                            }
                        }}>
                            <div onClick={handleClickBuy} className="content">
                                <span className={'placeholder'}>COMM Pay</span>
                                <div className="cards">
                                    <Image className={'card-img'} src={'/assets/img/com-pay.svg'} width={40}
                                           height={25}/>
                                </div>
                            </div>
                        </Link>
                        <ChevronRightIcon/>
                    </div>

                </div>
            </form>
        </main>
    </Box>
}


export default NetflixPage
