import { FC } from 'react'
import Link from 'next/link'
import { styled, Typography } from '@mui/material'
import { OverridableStringUnion } from '@mui/types'
import { Variant } from '@mui/material/styles/createTypography'

interface IProps {
  to: string;
  variant?: OverridableStringUnion<Variant | 'inherit'>,
  color?: string
}

const StyledTypography = styled(Typography)((props: { color: string }) => ({
  ':hover': {
    cursor: 'pointer'
  },
  color: props.color
}))

export const CLink: FC<IProps> = ({ to, color, variant, children }) => {
  return <Link href={to}>
    <StyledTypography color={color ? color : '#32eeff'}
                      variant={variant ? variant : 'caption'}>{children}</StyledTypography>
  </Link>
}
