/** @jsxRuntime classic /
 /* @jsx jsx */
import {css, jsx} from '@emotion/react'
import {FC, useCallback, useState, Fragment, useEffect} from 'react'
import {ModalContainer} from './ModalContainer'
import {Box, List, ListItem, TextField, Typography} from '@mui/material'
import {modalStyle} from './common.style'
import {Portal} from '../Portal'
import {useTypedSelector} from '../../hooks/useTypedSelector'
import {useModalManager} from '../../hooks/useModalManager'
import Image from 'next/image'
import {IGetTokens, IToken} from '../../types/swap.types'
import {InputProps as StandardInputProps} from '@mui/material/Input/Input'


interface IProps {
    onChange: (token: IToken) => void
}

export const SelectTokenModal: FC<IProps> = ({onChange}) => {

    //store
    const {tokens} = useTypedSelector(state => state.swap)

    const [filteredTokens, setFilteredTokens] = useState<IToken[] | null>(null)

    useEffect(() => {
        if (tokens) {
            setFilteredTokens(tokens)
        }
    }, [tokens])

    const handleInputChange = useCallback((event) => {
        if (!event.target.value) {
            return setFilteredTokens(tokens)
        }

        setFilteredTokens(tokens.filter(token => {
            return token.name.toLowerCase().includes(event.target.value.toLowerCase())
        }))
    }, [tokens])


    //ui
    const {setCurrentModal} = useModalManager()

    const handleClickToken = useCallback((token: IToken) => {
        return () => {
            onChange(token)
            setCurrentModal(null)
        }
    }, [onChange])

    return <Portal>
        <ModalContainer name={'select-token'}>
            <Box
                sx={{
                    ...modalStyle,
                    maxHeight: 700
                }}
                css={css`
                  overflow: auto;
                  overflow-x: hidden;
                `}
            >
                <Typography variant={'h6'}>
                    Select Token
                </Typography>

                <TextField onChange={handleInputChange}/>


                {
                    filteredTokens && Array.isArray(tokens) && <Fragment>
                        <Typography my={2}>
                            Tokens Count: <span style={{fontWeight: 500}}>{filteredTokens.length}</span>
                        </Typography>

                        <List>
                            {
                                filteredTokens.map(token => <ListItem key={token.id} button
                                                                      onClick={handleClickToken(token)}>
                                    <Box mr={2}>
                                        <Image src={token.logoURI}
                                               loader={() => token.logoURI}
                                               loading={'lazy'}
                                               lang={'fill'}
                                               width={50}
                                               height={50}/>
                                    </Box>
                                    {
                                        token.name
                                    }
                                </ListItem>)
                            }
                        </List>
                    </Fragment>
                }

            </Box>
        </ModalContainer>
    </Portal>
}
