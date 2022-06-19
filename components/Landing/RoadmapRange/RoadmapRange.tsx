import { FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Box, ToggleButton } from '@mui/material'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { IQuartItem, TQuart } from '../../../types/landing.types'
import { useLanding } from '../../../hooks/useLanding'
import { quarts2022, quarts2023 } from '../../../providers/LandingProvider'
import { theme } from '../../../styles/theme/theme'


const StyledButton = styled(ToggleButton)`
  border-radius: 100%;
  width: 50px;
  min-width: 50px;
  height: 50px;


  &.roadmap-range__quart-2022 {
    &:nth-of-type(2) {
      margin-left: 55px;
    }

    &:nth-of-type(3) {
      margin-left: 130px;
    }

    &:nth-of-type(4) {
      margin-left: 55px;
    }
  }

  &.roadmap-range__quart-2023 {
    padding-right: 30px;

    &:nth-of-type(1) {
      margin-left: 77px;
    }

    &:nth-of-type(2) {
      margin-left: 26px;
    }
  }
`

interface IPropsRoadmapRangeElem {
  quarts: IQuartItem[]
  onQuartClick: (quart: TQuart) => void
}

const RoadmapRangeElem: FC<IPropsRoadmapRangeElem> = ({ quarts, onQuartClick }) => {

  const [selectedQuart, setSelectedQuart] = useState<TQuart>('q1')

  const handleQuartClick = (quart: TQuart) => {
    setSelectedQuart(quart)
    onQuartClick(quart)
  }

  return <Box sx={{
    mt: 2.5,
    mb: 8.75,
    [theme.breakpoints.down('md')]: {
      transform: 'scale(0.9)'
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'none',
      maxWidth: '100%',
      marginRight: 8
    }
  }}>
    <Box style={{ paddingLeft: 30, paddingBottom: 20 }} display={'flex'}>
      {
        quarts.map((quart, index) => <StyledButton
          value={quart.quartType}
          onClick={() => handleQuartClick(quart.quartType)}
          selected={selectedQuart === quart.quartType}
          className={quarts.length === 4 ? 'roadmap-range__quart-2022' : 'roadmap-range__quart-2023'} key={index}>
          {
            quart.title
          }
        </StyledButton>)
      }
    </Box>
    <div style={{
      width: quarts.length === 4 ? 650 : 320,
      height: 30,
      background: `url(${quarts.length === 4 ? '/assets/img/landing/roadmap-range.svg' : '/assets/img/landing/roadmap-range-2023.svg'}) no-repeat`
    }} />
  </Box>
}


export const RoadmapRange: FC = () => {
  const { currentYear, setCurrentQuartIndex } = useLanding()

  const handleQuartClick = (quart: TQuart) => {
    let indexQuart

    switch (quart) {
      case 'q1':
        indexQuart = 0
        break
      case 'q2':
        indexQuart = 1
        break
      case 'q3':
        indexQuart = 2
        break
      case 'q4':
        indexQuart = 3
        break
      default:
        indexQuart = 3
    }
    setCurrentQuartIndex(indexQuart)
  }

  return <Box sx={{
    display: 'flex',
    overflow: 'hidden',
    maxWidth: 650,
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll',
      maxWidth: '100%',
      px: 3.75
    }
  }} display={'flex'} overflow={'hidden'} maxWidth={650}>
    <SwitchTransition mode={'out-in'}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*// @ts-ignore */}
      <CSSTransition classNames="fade"
                     key={currentYear === 2022}
                     addEndListener={(node, done) => {
                       node.addEventListener('transitionend', done, false)
                     }}
      >
        {
          currentYear === 2022 ? <RoadmapRangeElem onQuartClick={handleQuartClick} quarts={quarts2022} /> :
            <RoadmapRangeElem onQuartClick={handleQuartClick} quarts={quarts2023} />
        }
      </CSSTransition>
    </SwitchTransition>
  </Box>
}
