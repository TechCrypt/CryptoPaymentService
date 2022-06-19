/** @jsxRuntime classic /
 /* @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { TStatus } from '../../../types/common.types'


interface IProps {
  status: TStatus;
}

const computeColor = (color: TStatus): string => {
  switch (color) {
    case 'success':
      return '#4CAF50'
    case 'failed':
      return '#FF3D00'
    case 'suspense':
      return '#FFC107'
  }
}

export const CBadge: FC<IProps> = ({ status }) => {
  return <span css={css`
    width: 110px;
    height: 30px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    color: #FFFFFF;
    border-radius: 4px;
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
    background: ${computeColor(status)};
  `}>{status}</span>
}
