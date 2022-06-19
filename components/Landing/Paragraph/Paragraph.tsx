/** @jsxRuntime classic /
 /* @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { Box, Typography } from '@mui/material'

interface IProps {
  title?: string;
  maxWidth?: number | string;
}

export const Paragraph: FC<IProps> = ({ children, title, maxWidth }) => {
  return <Box width={'100%'} minHeight={'100%'} height={'100%'}>
    {
      title && <Typography css={css`margin-left: 25px;
        text-transform: uppercase`} variant={'h2'}>
        {title}
      </Typography>
    }
    <div css={css`
      display: flex;
      align-items: center;
      max-width: ${maxWidth ? maxWidth + 'px' : 'auto'};
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: #FFFFFF;
      margin: 30px 0;
      height: 100%;
      padding-left: -25px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 5px;
        background: #32EEFF;
        border-radius: 1px;
        margin-right: 25px;
        top: -20px;
        bottom: -20px;
      }

      .paragraph__wrapper {
        height: inherit;
        width: inherit;
        display: inline;
        padding-left: 25px;
      }

    `}>
      <div className={'paragraph__wrapper'}>
        {children}
      </div>
    </div>
  </Box>
}
