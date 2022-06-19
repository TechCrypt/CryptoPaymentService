import { FC } from 'react'
import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { ITokenomicItem } from '../../../types/landing.types'
import { mqDown } from '../../../styles/mixins'


interface IProps {
  items: ITokenomicItem[]
}

const StyledTokenomicProgress = styled('div')`
  width: 100vw;
  height: 100%;

  ${mqDown('sm')} {
    width: 200vw;
  }

  .line-container {
    width: inherit;
    display: flex;
    justify-content: space-around;
    background: transparent;
    height: 20px;
    align-items: center;

    .line {
      display: inline-block;
      height: 4px;
      position: relative;
      background: #2c4152;

      &::before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 100%;
        background: #32EEFF;
        position: absolute;
        top: -4px;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
      }

      &.passed {
        background: #32EEFF;
      }

      &.processing {
        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #32EEFF 0%, rgba(50, 238, 255, 0) 100%);
        }
      }


    }


  }
`

export const TokenomicProgress: FC<IProps> = ({ items }) => {
  return <StyledTokenomicProgress>
    <div className="line-container">
      {
        items.map((item, index) => <span style={{ width: `${100 / items.length}%` }} key={index}
                                         className={`line ${item.stage}`} />)
      }
    </div>
    <Box width={'100%'} display={'flex'} justifyContent={'space-around'}>
      {
        items.map(item => <Box key={item.title} display={'flex'} flexDirection={'column'} alignItems={'center'}
                               width={'33.3%'} component={'span'} mt={5}>
          <Typography variant={'h4'} textAlign={'center'}>
            {item.title}
          </Typography>
          {
            item.description && <Typography mt={2} variant={'body1'} maxWidth={350} textAlign={'center'}>
              {
                item.description
              }
            </Typography>
          }
        </Box>)
      }
    </Box>
  </StyledTokenomicProgress>
}
