import { FC, MouseEventHandler, useCallback, useEffect, useRef } from 'react'
import { Box, ToggleButton, useMediaQuery } from '@mui/material'
import { TokenomicProgress } from '../TokenomicProgress/TokenomicProgress'
import styled from '@emotion/styled'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper/types'
import 'swiper/css'
import { useLanding } from '../../../hooks/useLanding'
import { Theme } from '../../../styles/theme/theme'

const StyledIconButton = styled(ToggleButton)`
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  background: #2E2A39;

  &:first-of-type {
    margin-right: 30px;
  }

  &.Mui-disabled {
    background: transparent;
  }
`

export const RoadmapSlider: FC = () => {

  const { currentQuartIndex, setCurrentQuartIndex, tokenomicPages } = useLanding()

  const swiperRefTokenomic = useRef(null)

  const handleTokenomicButton = useCallback((to: 'left' | 'right'): MouseEventHandler => {
    return () => {
      if (to === 'right') {

        setCurrentQuartIndex(currentPage => currentPage + 1)
        return
      }
      if (to === 'left') {
        setCurrentQuartIndex(currentPage => currentPage - 1)
      }

    }
  }, [currentQuartIndex])

  useEffect(() => {
    swiperRefTokenomic?.current.swiper.slideTo(currentQuartIndex)
  }, [currentQuartIndex])

  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  useEffect(() => {
    if (swiperRefTokenomic) {
      swiperRefTokenomic.current.querySelectorAll('.swiper-slide').forEach((elem: HTMLElement) => {
        elem.style.overflowX = 'auto'
      })
    }
  }, [isSm])

  return <Box>
    <Swiper
      noSwiping={true}
      noSwipingClass={'swiper-slide'}
      onInit={(core: SwiperClass) => {
        swiperRefTokenomic.current = core.el
      }}>
      {
        tokenomicPages.map(({ tokenomics, quartType }) => <SwiperSlide key={quartType}>
          <TokenomicProgress items={tokenomics} />
        </SwiperSlide>)
      }
    </Swiper>
    <Box mt={8.75} pb={4.56} display={'flex'} justifyContent={'end'} pr={3.75}>
      <StyledIconButton value={'left'} onClick={handleTokenomicButton('left')} disabled={currentQuartIndex === 0}>
        <ChevronLeftIcon />
      </StyledIconButton>
      <StyledIconButton value={'right'} onClick={handleTokenomicButton('right')}
                        disabled={tokenomicPages.length - 1 === currentQuartIndex}>
        <ChevronRightIcon />
      </StyledIconButton>
    </Box>
  </Box>


}
