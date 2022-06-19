/** @jsxRuntime classic /
 /** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC, Fragment } from 'react'
import { Header } from '../components/Header/Header'


export const BlurLayout: FC = ({ children }) => {
  return <Fragment>
    <Header isAbsolutePosition/>
    <main css={css`
      width: 100vw;
      height: 100%;
      overflow: hidden;
      position: relative;
      padding-top: 104px;

      .circle {
        display: inline-block;
        position: absolute;
        z-index: -1;
        width: 341.4px;
        height: 210.78px;
        background: #CA3CFF;
        filter: blur(84px);

        &::after {
          content: '';
          display: inline-block;
          width: 210px;
          height: 210px;
          background: #32EEFF;
          filter: blur(80px);

        }
      }

      .circle-1 {
        top: -150px;
        right: 0;
      }

      .circle-2 {
        bottom: 0;
        left: 0;
      }

      .circle-3 {
        left: 50%;
        margin: 0 auto;
        bottom: 0;
      }

    `}>
      <span className="circle circle-1" />
      <span className="circle circle-2" />
      <span className="circle circle-3" />
      {children}
    </main>
  </Fragment>
}
