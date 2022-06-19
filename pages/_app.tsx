import type {AppProps} from 'next/app'
import {CacheProvider, EmotionCache, ThemeProvider} from '@emotion/react'
import {CssBaseline} from '@mui/material'
import {createEmotionCache} from '../utility/createEmotionCache'
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles'
import {theme} from '../styles/theme/theme'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterMoment'
import {SnackbarProvider} from 'notistack'
import {FC} from 'react'
import '../styles/globals.css'
import {MetaMaskProvider} from '../providers/MetaMaskProvider'
import {NotistackProvider} from '../providers/NotistackProvider'
import {Provider} from 'react-redux'
import {store} from '../store/store'
import {
    DAppProvider,
    Config
} from '@usedapp/core'
import {
    AnimatePresence,
    domAnimation, LazyMotion,
} from 'framer-motion'
import {ModalProvider} from '../providers/ModalProvider'

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache()

const config: Config = {}


const MyApp: FC<MyAppProps> = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps, router} = props
    return (
        <Provider store={store}>
            <MetaMaskProvider>
                <DAppProvider config={config}>
                    <CacheProvider value={emotionCache}>
                        <MuiThemeProvider theme={theme}>
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider dateAdapter={DateAdapter}>
                                    <SnackbarProvider maxSnack={5} preventDuplicate
                                                      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
                                        <NotistackProvider>
                                            <ModalProvider>
                                                <CssBaseline/>
                                                <LazyMotion features={domAnimation}>
                                                    <AnimatePresence>
                                                        <Component {...pageProps} />
                                                    </AnimatePresence>
                                                </LazyMotion>
                                            </ModalProvider>

                                        </NotistackProvider>
                                    </SnackbarProvider>

                                </LocalizationProvider>
                            </ThemeProvider>
                        </MuiThemeProvider>
                    </CacheProvider>
                </DAppProvider>
            </MetaMaskProvider>
        </Provider>
    )
}

export default MyApp
