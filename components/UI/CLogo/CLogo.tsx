/** @jsxRuntime classic /
 /* @jsx jsx */
import {css, jsx} from '@emotion/react'
import styled from '@emotion/styled'


const CLogoStyled = styled('span')`
  display: inline-block;
  width: 133.4px;
  height: 64px;

  &:hover {
    cursor: pointer;
  }
`

export const CLogo = () => {
    return <h2 css={css`
      display: inline-block;
      width: 133.4px;
      height: 64px;

      &:hover {
        cursor: pointer;
      }
    `}>
        COMM
    </h2>
}
