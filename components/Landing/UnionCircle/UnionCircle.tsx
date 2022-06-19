/** @jsxRuntime classic /
 /* @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { Box } from '@mui/material'


export const UnionCircle: FC = () => {
  return <Box width={130} height={130} position={'relative'}>
    <Box component={'span'} css={css`
      display: flex;
      align-items: center;
      width: inherit;
      height: inherit;
      justify-content: center;
      background-color: #2C4152;
      border-radius: 100px;
      position: absolute;
      z-index: 9999;

      &::before {
        content: '';
        display: inline-block;
        width: 87px;
        height: 50px;
        background: url("/assets/img/union.svg") no-repeat;
      }
    `} />
    <Box component={'span'} css={css`
      width: 130px;
      height: 130px;
      filter: blur(80px);
      background: #32EEFF;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
      top: 35%;
      z-index: 9998;
      transform: translateY(-35%) scale(1);
      animation: pulse 2s infinite;
      @keyframes pulse {
        0% {
          transform: scale(0.8);
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
        }

        70% {
          transform: scale(1);
          box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
        }

        100% {
          transform: scale(0.8);
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
      }
    `} />
  </Box>
}
