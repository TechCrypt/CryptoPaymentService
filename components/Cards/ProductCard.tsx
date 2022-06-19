/** @jsxRuntime classic /
 /* @jsx jsx */
import { css, jsx } from '@emotion/react'
import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { ImageLoaderProps } from 'next/dist/client/image'
import { IProduct } from '../../types/common.types'

interface IProps {
  product: IProduct;
  onBuyClick: () => void
}


const imgLoader = ({ src }: ImageLoaderProps): string => {
  return src
}
export const ProductCard: FC<IProps> = ({ product, onBuyClick }) => {
  return <Box css={css`
    max-width: 280px;
    width: 100%;
    height: 420px;
    background: #092134;
    border-radius: 10px;

    img {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  `}>
    {
      product.imgSrc && <Image
        loader={imgLoader}
        src={product.imgSrc}
        alt={''}
        width={280}
        height={200}
      />
    }
    <Box pb={2} px={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Typography variant={'h4'}>
        {product.serviceName}
      </Typography>
      <Typography variant={'h4'}>
        {product.productName}
      </Typography>

      <Box my={3} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Typography variant={'h5'}>
          {`Price ${product.price} ${product.currency}`}
        </Typography>
      </Box>

      <Button
        onClick={onBuyClick}
        css={css`
        border: 1px solid #153956;
        box-sizing: border-box;
        border-radius: 6px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        text-transform: uppercase;
        color: #FFFFFF;
        width: 100%;
      `}>
        Buy
      </Button>
    </Box>
  </Box>
}
