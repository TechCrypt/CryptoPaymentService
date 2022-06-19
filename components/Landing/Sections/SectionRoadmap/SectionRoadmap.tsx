import { FC, MouseEventHandler, useCallback, useState } from 'react'
import { Box, Fade, Slide, ToggleButton, Typography } from '@mui/material'
import { Paragraph } from '../../Paragraph/Paragraph'
import { useObserver } from '../../../../hooks/useObserver'
import { RoadmapSlider } from '../../RoadmapSlider/RoadmapSlider'
import { RoadmapRange } from '../../RoadmapRange/RoadmapRange'
import { useLanding } from '../../../../hooks/useLanding'
import { theme } from '../../../../styles/theme/theme'


const sxToggleButton = {
  mr: 8,
  width: 160,
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'space-between',
    mr: 0,
    width: 120
  }
}

export const SectionRoadmap: FC = () => {
  const { isVisible, ref } = useObserver()


  const { currentYear, setCurrentYear } = useLanding()

  const handleYearButton = useCallback((year: 2022 | 2023): MouseEventHandler => {
    return () => {
      if (currentYear === year) return
      setCurrentYear(year)
    }
  }, [currentYear])

  return <Box ref={ref} component={'section'} width={'100%'} height={'100%'} minHeight={'100vh'} display={'flex'}
              justifyContent={'center'} alignItems={'center'}>
    <Box mt={7.5} width={'inherit'} height={'inherit'}>
      <Paragraph maxWidth={490} title={'Roadmap'}>
        <Fade timeout={1000} in={isVisible}>
          <div>
            <Slide direction={'right'} timeout={1000} in={isVisible}>
              <Typography variant={'body2'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis eu sit eu pretium nisl diam aenean
                cras
              </Typography>
            </Slide>
          </div>
        </Fade>
      </Paragraph>
      <Box sx={{
        mt: 4,
        px: 3.75,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          px: 0,
          flexDirection: 'column'
        }
      }}>
        <Box sx={{
          display: 'flex',
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            justifyContent: 'space-evenly',
            my: 3
          }
        }}>
          <ToggleButton selected={currentYear === 2022} value={2022} onClick={handleYearButton(2022)}
                        sx={sxToggleButton}>
            2022
          </ToggleButton>
          <ToggleButton selected={currentYear === 2023} value={2023} onClick={handleYearButton(2023)}
                        sx={sxToggleButton}>
            2023
          </ToggleButton>
        </Box>
        <RoadmapRange />
      </Box>
      <RoadmapSlider />
    </Box>
  </Box>
}
