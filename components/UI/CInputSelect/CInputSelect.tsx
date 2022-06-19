/** @jsxRuntime classic /
 /* @jsx jsx */
import {css, jsx} from '@emotion/react'
import {FC} from 'react'
import {Box, TextField, Typography} from '@mui/material'
import {TextFieldProps} from '@mui/material/TextField/TextField'
import styled from '@emotion/styled'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {IToken} from '../../../types/swap.types'
import Image from 'next/image'

interface IProps {
    textFieldProps: TextFieldProps
    label: string
    onClick: () => void
    selectedToken: null | IToken
    balance?: number | null
}

const StyledTextField = styled(TextField)`
  border: none !important;
  padding: 10px 0;

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .MuiOutlinedInput-input {
    color: black !important;
  }
`

const StyledCInputButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(17, 153, 250);
  border: none;
  color: white;
  border-radius: 5px;
  transition: background-color 0.1s;
  padding: 0 10px;
  height: 40px;
  width: 200px;

  &:hover {
    cursor: pointer;
    background: rgb(26, 128, 203);
  }
`

export const CInputSelect: FC<IProps> = ({textFieldProps, label, onClick, selectedToken, balance}) => {


    return <Box padding={2}>
        <Box css={css`
          border: 1px solid rgb(247, 248, 250);
          border-radius: 20px;
          padding: 20px;
          background-color: rgb(255, 255, 255);
        `}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <label htmlFor={textFieldProps.id} css={css`
                  color: rgb(86, 90, 105);
                `}>
                    {
                        label
                    }
                </label>
                {
                    balance !== null && <Typography css={css`
                      color: rgb(86, 90, 105);
                    `}>
                        Balance: {balance}
                    </Typography>
                }
            </Box>
            <Box display={'flex'} alignItems={'center'}>
                <StyledTextField
                    {...textFieldProps}
                    InputProps={{type: 'number'}}
                    style={{color: 'black !important'}}
                />
                <StyledCInputButton
                    css={css`
                      background: ${selectedToken && 'white !important'};
                      color: ${selectedToken && 'rgb(17, 153, 250) !important'};
                      border: ${selectedToken && '1px solid rgb(17, 153, 250) !important'};
                    `}
                    type={'button'} onClick={onClick} color={'secondary'}>
                    {selectedToken ?
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Box mr={1}>
                                <Image src={selectedToken.logoURI} loader={() => selectedToken.logoURI} width={24}
                                       height={24}/>
                            </Box>
                            <span css={css`
                              max-width: 110px;
                              white-space: nowrap;
                              overflow: hidden;
                              text-overflow: ellipsis;
                            `}>
                                {
                                    selectedToken.name
                                }
                           </span>
                        </Box> :
                        <Box css={css`
                          font-size: 14px;
                          font-weight: 500;
                        `} component={'span'}>
                            Select Token
                        </Box>}
                    <ExpandMoreIcon style={{fill: selectedToken ? 'rgb(17, 153, 250)' : 'white'}}/>
                </StyledCInputButton>
            </Box>
        </Box>
    </Box>
}
