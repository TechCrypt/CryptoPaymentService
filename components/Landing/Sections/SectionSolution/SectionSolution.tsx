/** @jsxRuntime classic /
 /* @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC, useEffect, useState } from 'react'
import { Box, Button, Fade, Slide, Typography } from '@mui/material'
import { Paragraph } from '../../Paragraph/Paragraph'
import { UnionCircle } from '../../UnionCircle/UnionCircle'
import { useObserver } from '../../../../hooks/useObserver'
import { UnionCircleContainer } from '../../UnionCircleContainer/UnionCircleContainer'
import { mqDown } from '../../../../styles/mixins'

export const SectionSolution: FC = () => {

  const { ref, isVisible } = useObserver()
  const [isVisibleEasyTransaction, setIsVisibleEasyTransaction] = useState<boolean>(false)

  useEffect(() => {
    if (isVisible && !isVisibleEasyTransaction) setTimeout(() => {
      setIsVisibleEasyTransaction(true)
    }, 2000)
  }, [isVisible])

  return <Box ref={ref} component={'section'} css={css`
    background: linear-gradient(180deg, rgba(9, 33, 52, 1) 1%, transparent 100%);
    padding: 80px 0;
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${mqDown('md')} {
      flex-direction: column-reverse;
    }

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: url("/assets/img/web.svg") no-repeat bottom;
      left: 0;
      right: 0;
      z-index: -1;
    }
  `}>
    <Box css={css`
      padding-left: 30px;

      ${mqDown('md')} {
        margin-top: 90px;
      }
    `}>
      <Paragraph title={'solution'} maxWidth={490}>
        <Fade timeout={1000} in={isVisible}>
          <div>
            <Slide direction={'right'} timeout={1000} in={isVisible}>
              <Typography variant={'body2'}>
                We offer the solution to transactions connected with the digital assets you hold. Conglomerate connects
                entities, individuals and blockchain projects by being the credible provider of the exchange of goods
                and
                services
                between them.
              </Typography>
            </Slide>
          </div>
        </Fade>
      </Paragraph>
      <Button css={css`margin-top: 30px;`}>
        read more
      </Button>
    </Box>
    <Box position={'relative'} css={css`

      .any-payment-method {
        display: inline-block;
        background: url("/assets/img/any-payment-method.svg") no-repeat center;
        width: 430px;
        height: 190px;
        position: absolute;
        z-index: 99;
        right: 0;
        top: -40px;
      }

      .security {
        display: inline-block;
        background: url("/assets/img/security.svg") no-repeat center;
        width: 182px;
        height: 250px;
        position: absolute;
        z-index: 99;
        right: 10px;
        bottom: 70px;
      }

      .speed {
        display: inline-block;
        background: url("/assets/img/speed.svg") no-repeat center;
        width: 182px;
        height: 150px;
        position: absolute;
        z-index: 99;
        right: 10px;
        bottom: -70px;
      }

      .easy-transactions {
        display: inline-block;
        background: url("/assets/img/easy-transactions.svg") no-repeat center;
        width: 380px;
        height: 390px;
        position: absolute;

        &.easy-transactions-1 {
          z-index: 101;
          left: -60px;
          bottom: -120px;
        }

        &.easy-transactions-2 {
          z-index: 100;
          left: -40px;
          bottom: -100px;
        }

        &.easy-transactions-3 {
          z-index: 99;
          left: -30px;
          bottom: -80px;
        }
      }

      ${mqDown('md')} {

        .any-payment-method, .speed, .security, .easy-transactions {
          transform: scale(0.7) !important;
        }

        .any-payment-method {
          right: -50px !important;
        }

        .security, .speed {
          right: -10px !important;
        }


        .easy-transactions {

          &.easy-transactions-1 {
            left: 0 !important;
          }

          &.easy-transactions-2 {
            left: 20px !important;
          }

          &.easy-transactions-3 {
            left: 30px !important;
          }
        }
      }

      ${mqDown('sm')} {
        .any-payment-method, .speed, .security, .easy-transactions {
          transform: scale(0.5) !important;
        }

        .any-payment-method {
          right: -100px !important;
        }

        .security, .speed {
          right: -30px !important;
        }

        .security {
          bottom: 130px;
        }

        .speed {
          bottom: 60px;
        }


        .easy-transactions {

          &.easy-transactions-1 {
            left: -70px !important;
          }

          &.easy-transactions-2 {
            left: -50px !important;
          }

          &.easy-transactions-3 {
            left: -40px !important;
          }
        }
      }

    `}>
      <Slide direction={'left'} timeout={3500} in={isVisible}>
        <div className="any-payment-method" />
      </Slide>

      <Fade timeout={7000} in={isVisible}>
        <div>
          <Slide direction={'up'} timeout={1000} in={isVisible}>
            <span className="security" />
          </Slide>
        </div>
      </Fade>

      <Fade timeout={4000} in={isVisible}>
        <div>
          <Slide direction={'right'} timeout={1000} in={isVisible}>
            <span className="speed" />
          </Slide>
        </div>
      </Fade>

      <Fade timeout={3000} in={isVisible}>
        <div>
          <Slide direction={'up'} timeout={1000} in={isVisible}>
            <span className="easy-transactions easy-transactions-1" />
          </Slide>
        </div>
      </Fade>


      <Fade timeout={4000} in={isVisibleEasyTransaction}>
        <div>
          <Slide direction={'up'} timeout={1000} in={isVisibleEasyTransaction}>
            <span className="easy-transactions easy-transactions-2" />
          </Slide>
        </div>
      </Fade>

      <Fade timeout={5000} in={isVisibleEasyTransaction}>
        <div>
          <Slide direction={'up'} timeout={1000} in={isVisibleEasyTransaction}>
            <span className="easy-transactions easy-transactions-3" />
          </Slide>
        </div>
      </Fade>

      <div css={css`padding-right: 30px`}>
        <UnionCircleContainer>
          <UnionCircle />
        </UnionCircleContainer>
      </div>
    </Box>
  </Box>
}
