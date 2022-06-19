/** @jsxRuntime classic /
 /* @jsx jsx */
import {FC, Fragment} from 'react'
import {Header} from '../components/Header/Header'
import {m, Variants} from 'framer-motion'
import {css, jsx} from '@emotion/react'

const slideTransition = {
    name: 'slideTransition',
    variants: {
        hidden: {
            x: '100vw',
            position: 'fixed'
        },
        enter: {
            x: 0,
            position: 'static'
        },
        exit: {
            x: 0,
            opacity: 1
        }
    } as Variants,
    transition: {
        duration: 0.5,
        delay: 0
    }
}

interface IProps {
    withAnimation?: boolean
}

export const DefaultLayout: FC<IProps> = ({children}) => {
    return <Fragment>
        <Header/>
        <main css={css`
          min-height: 100%;
        `}>
            {children}
        </main>
    </Fragment>
}
