/** @jsxRuntime classic /
 /* @jsx jsx */
import { FC } from 'react'
import { css, jsx } from '@emotion/react'
import { Box, Button, Fade, Slide, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import { Paragraph } from '../../Paragraph/Paragraph'
import { useObserver } from '../../../../hooks/useObserver'
import { mqDown } from '../../../../styles/mixins'
import { theme, Theme } from '../../../../styles/theme/theme'
import { SxProps } from '@mui/system'
import { apiBaseUrl } from '../../../../app.config'

const indicators = [
  {
    value: '47.497.110.109 USDT',
    name: 'Total Transaction'
  },
  {
    value: '53.621.000 USDT',
    name: 'Average Transactions Volume (24h)'
  },
  {
    value: '7.32 sec',
    name: 'Speed of Transaction'
  }
]

const sxButton: SxProps = {
  '&:first-of-type': {
    mr: 5
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: 400,
    width: '100%',
    mr: '0 !important',
    mt: 5
  }
}

export const SectionHomePage: FC = () => {

  const { isVisible, ref } = useObserver()
  const indicatorsObserver = useObserver()

  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return <Box ref={ref} overflow={'hidden'} component={'section'} width={'100%'} height={'100%'}>
    <Box css={css`
      padding: 105px 30px;
      min-height: 100vh;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;

      ${mqDown('md')} {
        flex-direction: column;
        justify-content: center;
      }
    `}>
      <Box overflow={'hidden'}>
        <Typography css={css`
          display: flex;
          align-items: center;
          max-width: 542px;
          height: 190px;
          position: relative;
          text-transform: uppercase;

          &::before {
            content: '';
            display: inline-block;
            position: absolute;
            background: url("/assets/img/purpleDecorBlock.svg") no-repeat center;
            border-radius: 6px;
            background-size: 190px;
            width: 50px;
            height: 190px;
            z-index: -1;
          }

        `} variant={'h1'}>
          <Box component={'span'} pl={3.75}>
            A solution for
            digital assets in the
            payment infrastructure
          </Box>
        </Typography>

        <Box my={6.50}>
          <Paragraph>
            <Fade timeout={1000} in={isVisible}>
              <div>
                <Slide direction={'right'} timeout={1000} in={isVisible}>
                  <Typography variant={'body2'}>
                    We exist to make everything simpler and accelerate the global transition to
                    cryptocurrency
                  </Typography>
                </Slide>
              </div>
            </Fade>
          </Paragraph>

        </Box>
        <Box sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }
        }}>
          <Button sx={sxButton}>join us</Button>
          <Button sx={sxButton}>Buy Token</Button>
        </Box>
      </Box>
      <Fade in={isVisible} timeout={1000}>

        <Box css={css`
          border: 1px solid #0f2a3d;
          background: linear-gradient(121.19deg, rgba(5, 10, 29, 0.4) 0%, rgba(5, 10, 29, 0.1) 100%);
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 20px;

          ${mqDown('md')} {
            margin: 50px 0 90px 0;
          }
        `}>
          <a target={'_blank'} href={'/store/netflix'} rel="noreferrer">
            <Image
              src={'/assets/img/netflix.png'}
              width={630}
              height={370}
            />
          </a>

        </Box>
      </Fade>
    </Box>

    {
      isMd ? <Box css={css`
                display: flex;
                align-items: center;
                justify-content: space-around;
                background: #092134;
                height: 130px;
        `}>
          {
            indicators.map(indicator => <Box key={indicator.value} display={'flex'} flexDirection={'column'}
                                             alignItems={'center'}>
              <Typography variant={'h4'}>{indicator.value}</Typography>
              <Typography variant={'subtitle2'}>{indicator.name}</Typography>
            </Box>)
          }
        </Box>
        :
        <Box ref={indicatorsObserver.ref}
             sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', px: 3, mb: 10 }}>
          {
            indicators.map((indicator, i) => <Slide key={indicator.name} in={indicatorsObserver.isVisible}
                                                    direction={i % 2 === 0 ? 'left' : 'right'} timeout={(i + 1) * 1000}>
              <Box>
                <Fade in={indicatorsObserver.isVisible} timeout={(i + 1) * 1000}>
                  <Box>
                    <Box sx={{
                      background: '#092134',
                      borderRadius: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      py: 5,
                      mb: 3
                    }} key={indicator.value}>
                      <Typography variant={'h4'}>{indicator.value}</Typography>
                      <Typography variant={'subtitle2'}>{indicator.name}</Typography>
                    </Box>
                  </Box>
                </Fade>
              </Box>
            </Slide>)
          }
        </Box>
    }
  </Box>
}
