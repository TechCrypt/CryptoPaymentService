import styled from '@emotion/styled'
import {Button} from '@mui/material'

export const CButton = styled(Button)`
  font-size: 20px;
  font-weight: 500;
  background-color: rgb(17, 153, 250) !important;
  color: rgb(255, 255, 255) !important;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 8px 0px;
  transition: background-color 0.1s;

  &:hover {
    cursor: pointer;
    background: rgb(26, 128, 203) !important;
  }
}


`
