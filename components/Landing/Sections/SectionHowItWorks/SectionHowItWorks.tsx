import { FC, useEffect, useRef } from 'react'
import { Box, Fade, Slide, Typography } from '@mui/material'
import { useObserver } from '../../../../hooks/useObserver'
import { Paragraph } from '../../Paragraph/Paragraph'
import styled from '@emotion/styled'
import { mqDown } from '../../../../styles/mixins'

const StyledSection = styled(Box)`
  margin-top: 100px;
  padding: 70px 30px;
  display: flex;
  justify-content: center;
  align-items: start;

  video {
    max-width: 630px;
    max-height: 500px;
    border-radius: 20px;
  }

  ${mqDown('md')} {
    flex-direction: column;
    align-items: center;

    video {
      margin-top: 30px;
      width: 100%;
      height: 100%;
    }
  }
`

export const SectionHowItWorks: FC = () => {
  const { ref, isVisible } = useObserver()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (isVisible && videoRef) {
      videoRef.current.play()
    }
  }, [isVisible])

  return <StyledSection ref={ref} component={'section'}>
    <Paragraph maxWidth={490} title={'How it works'}>
      <Fade timeout={1000} in={isVisible}>
        <div>
          <Slide direction={'right'} timeout={1000} in={isVisible}>
            <Typography variant={'body2'}>
              We are connectiong by using fast, reliable and transparent transactions with METATHESIS
              protocol
            </Typography>
          </Slide>
        </div>
      </Fade>
    </Paragraph>
    <Fade timeout={1000} in={isVisible}>
      <Box>
        <Slide direction={'left'} timeout={1000} in={isVisible}>
          <video ref={videoRef} controls autoPlay={isVisible}>
            <source type="video/mp4" src={'/assets/videos/how it works.mp4'} />
          </video>
        </Slide>
      </Box>
    </Fade>
  </StyledSection>
}
