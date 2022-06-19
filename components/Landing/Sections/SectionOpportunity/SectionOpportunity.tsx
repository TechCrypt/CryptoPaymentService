import { FC } from 'react'
import { Box, Fade, Slide, Typography } from '@mui/material'
import { Paragraph } from '../../Paragraph/Paragraph'
import { UnionCircle } from '../../UnionCircle/UnionCircle'
import { useObserver } from '../../../../hooks/useObserver'
import { UnionCircleContainer } from '../../UnionCircleContainer/UnionCircleContainer'
import { theme } from '../../../../styles/theme/theme'

export const SectionOpportunity: FC = () => {
  const { isVisible, ref } = useObserver()
  return <Box ref={ref} sx={{
    padding: '0 30px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  }} component={'section'} py={20}>
    <Box>
      <Paragraph title={'opportunity'} maxWidth={490}>
        <Fade timeout={1000} in={isVisible}>
          <div>
            <Slide direction={'right'} timeout={1000} in={isVisible}>
              <div>
                <Typography variant={'body2'}>
                  We are striving to be a credible provider for you to pay for the goods and services directly with
                  cryptocurrency. No more unnecessary transactions and just in one click.
                </Typography>
                <Typography variant={'body2'}>
                  The same applies to the entities and cross-border payments. It’s no secret that the cross-border
                  payments
                  landscape using traditional rails is fraught with fees, hurdles and delay.
                </Typography>
                <Typography variant={'body2'}>
                  Entities choose between bearing a transaction cost or passing that cost onto their customers. And all
                  of
                  those
                  involved take days or weeks to be processed.
                </Typography>
              </div>
            </Slide>
          </div>
        </Fade>
      </Paragraph>
    </Box>
    <UnionCircleContainer>
      <UnionCircle />
    </UnionCircleContainer>
  </Box>
}
