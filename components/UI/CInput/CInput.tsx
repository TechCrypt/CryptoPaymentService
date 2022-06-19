/** @jsxRuntime classic /
 /* @jsx jsx */
import { FC, HTMLInputTypeAttribute, useCallback, useState } from 'react'
import { css, jsx } from '@emotion/react'
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { InputBaseProps } from '@mui/material/InputBase'
import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete/Autocomplete'

interface IProps {
    id: string;
    name: string;
    label: string;
    value: any;
    placeholder?: string;
    onChange?: StandardInputProps['onChange'];
    onBlur?: InputBaseProps['onBlur'];
    type?: HTMLInputTypeAttribute;
    hardOfPassword?: number;
    error?: boolean;
    helperText?: string | boolean;
    readonly?: boolean;
    autoCompleteProps?: AutocompleteRenderInputParams
}

export const CInput: FC<IProps> = ({
                                       label, id, name, readonly,
                                       value, type, onChange, error,
                                       helperText, onBlur, autoCompleteProps
                                   }) => {
    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false)
    const InputProps: Partial<StandardInputProps> = {
        endAdornment: (<InputAdornment position={'end'}>
            <IconButton
              onClick={() => setIsEyeOpen(!isEyeOpen)}
              aria-label="toggle password visibility"
              edge={'end'}
            >
                {isEyeOpen ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
        </InputAdornment>)
    }

    return <div css={css`
    display: flex;
    flex-direction: column`}>
        <Box mb={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography component={'label'} css={css`
        color: #FFFFFF;
        text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
      `} htmlFor={id}>{label}</Typography>
            {
                type === 'password' && <Box display={'flex'} alignItems={'center'}>
                    <Box display={'flex'} alignItems={'center'} mr={1.2}>
                        {
                            [...Array(5).keys()].map((i) => <span key={i} css={css`
                width: 6px;
                height: 6px;
                display: inline-block;
                border-radius: 50%;
                margin-right: 4px;
                background: #FFC107;`} />)
                        }
                    </Box>

                    <Typography color={'#FFC107'}>
                        Normal
                    </Typography>
                </Box>
            }
        </Box>

        <TextField onChange={onChange} type={type} name={name}
                   disabled={!!readonly}
                   error={!!error}
                   value={value}
                   {...(type === 'password' ? { InputProps } : {})}
                   {...(onBlur && { onBlur: onBlur })}
                   {...(helperText && { helperText: helperText })}
                   {...(autoCompleteProps && {...autoCompleteProps})}
        />
    </div>
}
