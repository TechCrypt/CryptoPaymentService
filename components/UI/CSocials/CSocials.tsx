import {FC, useMemo} from 'react'
import {IconButton} from '@mui/material'
import {Facebook, Instagram, Telegram, Twitter} from '@mui/icons-material'
import styled from '@emotion/styled'

interface IProps {
    social: 'facebook' | 'twitter' | 'telegram' | 'insta'
}

const StyledIconButton = styled(IconButton)`
  min-width: 50px;
  min-height: 50px;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #050A1D;
  border: 2px solid #2E2A39;
  box-sizing: border-box;
  border-radius: 4px;
`

export const CSocials: FC<IProps> = ({social}) => {

    const computeIconComponent = useMemo(() => {
        switch (social) {
            case 'facebook':
                return <Facebook  style={{fill: '#ffff'}} width={20} height={20} fill={'#ffff'}/>
            case 'insta':
                return <Instagram  style={{fill: '#ffff'}} width={20} height={20} fill={'#ffff'}/>
            case 'telegram':
                return <Telegram  style={{fill: '#ffff'}} width={20} height={20} fill={'#ffff'}/>
            case 'twitter':
                return <Twitter  style={{fill: '#ffff'}} width={20} height={20} fill={'#ffff'}/>
        }
    }, [])


    return <StyledIconButton>
        {
            computeIconComponent
        }
    </StyledIconButton>
}
