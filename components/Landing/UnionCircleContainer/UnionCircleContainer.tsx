/** @jsxRuntime classic /
 /* @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { Box } from '@mui/material'
import { mqDown } from '../../../styles/mixins'
import { theme } from '../../../styles/theme/theme'


export const UnionCircleContainer: FC = ({ children }) => {
  return <Box sx={{
    width: 530,
    height: 530,
    borderRadius: 30,
    background: '#050A1D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100vw',
      height: 450,
    }
  }}>
    <Box css={css`
      background: url("/assets/img/opportunity-circle.svg") no-repeat;
      width: 410px;
      height: 410px;
      display: flex;
      justify-content: center;
      align-items: center;

      ${mqDown('sm')} {
        width: 80vw;
        height: 80vw;
        background-size: 80vw;
      }
    `}>
      {
        children
      }
    </Box>
  </Box>
}
