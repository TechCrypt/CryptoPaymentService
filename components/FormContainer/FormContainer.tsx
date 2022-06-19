/** @jsxRuntime classic /
 /* @jsx jsx */
import { FC } from 'react'
import { Typography } from '@mui/material'
import { css, jsx } from '@emotion/react'
import { Box } from '@mui/system'

interface IProps {
  title: string,
  subtitle: string
}

export const FormContainer: FC<IProps> = ({ title, subtitle, children }) => {

  return <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
    <Typography css={css`
      text-transform: uppercase;
      text-align: center;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
      margin-bottom: 10px;
    `} variant={'h2'}>
      {title}
    </Typography>
    <Typography variant={'subtitle1'} css={css`
      text-align: center;
      color: #FFFFFF;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
      margin-bottom: 30px;
    `}>
      {subtitle}
    </Typography>
    <Box css={css`
      background: #092134;
      border-radius: 15px;
      padding: 20px 30px 30px 30px;
      max-width: 410px;
    `}>
      {children}
    </Box>
  </Box>
}
