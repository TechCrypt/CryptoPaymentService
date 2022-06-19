import { FC } from 'react'
import { Box, Grid, List, ListItem, Typography, useMediaQuery } from '@mui/material'
import styled from '@emotion/styled'
import { CLogo } from '../../UI/CLogo/CLogo'
import { CSocials } from '../../UI/CSocials/CSocials'
import { mqDown } from '../../../styles/mixins'
import { theme, Theme } from '../../../styles/theme/theme'


const footerItems = [
  {
    title: 'Resources',
    items: [
      'Whitepaper',
      'FAQs',
      'Feeds',
      'Service Status'
    ]
  },
  {
    title: 'Product',
    items: [
      'API',
      'Proof of Exchange',
      'COMM Pay',
      'COMM Credit',
      'COMM Deposit',
      'COMM Swap'
    ]
  },
  {
    title: 'Developers',
    items: [
      'Documentation',
      'Developer Guides',
      'Bug Bounty'
    ]
  }
]


const StyledFooter = styled('footer')`
  min-height: 390px;
  padding: 60px 30px 38px 30px;
  border-top: 1px solid #DDDDDD;
`

const StyledFooterLink = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mqDown('sm')} {
    flex-direction: column;
    margin: 20px 0;
  }
`

const StyledListContainer = styled(Box)`
  display: flex;
  justify-content: space-evenly;

  ${mqDown('sm')} {
    flex-direction: column;
  }
`

const StyledListItem = styled(ListItem)`
  ${mqDown('sm')} {
    justify-content: center;
  }
`

export const Footer: FC = () => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  return <StyledFooter>
    <Grid position={'relative'} {...(isMd && { direction: 'column-reverse' })} container>
      <Grid item sm={12} md={12} xs={4} xl={4} lg={4}>
        <Box>
          <CLogo />
        </Box>
        <Typography variant={'subtitle2'} mb={1.2} mt={3.25}>
          All rights reserved. Conglomerate coin( COMM) and Metathesis Protocol are owned by Conglomerate
          Group. Conglomerate does not give investment advice, endorsement, analysis, or recommendations with
          respect to any securities or provide legal or tax advice.
        </Typography>

        <Typography variant={'subtitle2'}>
          All securities listed here are being offered by, and all information included on this site is the
          responsibility of, the applicable issuer of
          such securities
        </Typography>
      </Grid>
      <Grid item sm={12} md={12} xs={8} xl={8} lg={8}>
        <StyledListContainer>
          {
            footerItems.map(footerItem => <List key={footerItem.title}>
              <StyledListItem>
                <Typography variant={'subtitle1'} sx={{ fontWeight: '700 !important' }}>
                  {footerItem.title}
                </Typography>
              </StyledListItem>
              {
                footerItem.items.map(item => <StyledListItem key={item}>
                  <Typography variant={'subtitle1'}>
                    {
                      item
                    }
                  </Typography>
                </StyledListItem>)
              }
            </List>)
          }
        </StyledListContainer>
      </Grid>
    </Grid>
    <StyledFooterLink>
      <Typography sx={{
        [theme.breakpoints.down('sm')]: {
          mb: 2
        }
      }} variant={'subtitle1'} textTransform={'uppercase'}>
        Copyright © 2022 Conglomerate
      </Typography>
      <Box display={'flex'} pr={3.25}>
        <CSocials social={'facebook'} />
        <Box component={'span'} mx={2.5}>
          <CSocials social={'twitter'} />
        </Box>
        <Box component={'span'} mr={2.5}>
          <CSocials social={'insta'} />
        </Box>
        <CSocials social={'telegram'} />
      </Box>
    </StyledFooterLink>
  </StyledFooter>
}
