/** @jsxRuntime classic /
 /* @jsx jsx */
import React, { FC, useCallback, useState, Fragment } from 'react'
import { css, jsx } from '@emotion/react'
import { IRouterLink } from '../../types/common.types'
import Link from 'next/link'
import { Box, Button, Drawer, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEthers } from '@usedapp/core'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useConnected } from '../../hooks/useConnected'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addNotification } from '../../store/slices/notifications/notifications.slice'
import { IconButton } from '@mui/material'
import { BurgerIcon, UserIcon } from '../UI/Icons/Icons'
import { CLogo } from '../UI/CLogo/CLogo'
import { mqDown } from '../../styles/mixins'


interface IProps {
  onlyLogo?: boolean;
  isAbsolutePosition?: boolean;
}

const links: IRouterLink[] = [
  {
    name: 'Product',
    path: 'product'
  },
  {
    name: 'Company',
    path: 'company'
  },
  {
    name: 'Tokenomics',
    path: '/transactions'
  },
  {
    name: 'Roadmap',
    path: 'roadmap'
  }, {
    name: 'White paper',
    path: 'white-paper'
  }
]


const drawerLinks = [
  {
    title: 'COMM PAY',
    items: [
      {
        name: 'How it work?',
        path: '/'
      },
      {
        name: 'All in one',
        path: '/'
      }
    ] as IRouterLink[]
  },
  {
    title: 'PRODUCT',
    items: [
      {
        name: 'COMM Pay',
        path: '/'
      },
      {
        name: 'COMM Credit',
        path: '/',
        active: false
      },
      {
        name: 'COMM Deposit',
        path: '/',
        active: false
      },
      {
        name: 'COMM Swap',
        path: '/',
        active: false
      }
    ] as IRouterLink[]
  }
]

export const Header: FC<IProps> = ({ onlyLogo, isAbsolutePosition }) => {

  const { activateBrowserWallet } = useEthers()
  const { isUserLogIn } = useTypedSelector(state => state.system)
  const { address, isMetaMaskExist } = useTypedSelector(state => state.blockchain)

  const dispatch = useAppDispatch()
  const handleClickConnectWallet = useCallback(() => {
    if (!isMetaMaskExist) {
      dispatch(addNotification({
        message: 'Please install MetaMask Wallet',
        variant: 'error'
      }))
      return
    }
    return activateBrowserWallet()
  }, [isMetaMaskExist, activateBrowserWallet])

  const { connected } = useConnected()

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setIsDrawerOpen(open)
  }

  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up('md'))

  return <header css={css`
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    position: ${isAbsolutePosition && 'absolute'};
    z-index: 999;
    width: 100%;
  `}>
    <Link href={'/'}>
      <CLogo />
    </Link>
    <Box display={'flex'} alignItems={'center'} paddingRight={7.5}>
      {
        isMd && !onlyLogo && <div className="links" style={{ display: 'inline-block' }}>
          {links.map(({ name, path }) => <Link key={name} href={path}>
            <Typography variant={'button'} css={css`
              margin-right: 40px;
              display: inline-block;

              &:last-child {
                margin-right: 0;
              }
            `}>{name}</Typography>
          </Link>)}
        </div>
      }
      {
        connected || <Button onClick={handleClickConnectWallet} sx={{ ml: 12 }}>
          Connect Wallet
        </Button>
      }
      {
        isUserLogIn && <Button sx={{ ml: 12 }}>
          {address}
        </Button>
      }
      {
        <>
          {
            !isDrawerOpen &&
            <Box width={40} height={40} display={'inline-block'} position={'absolute'} top={30} right={30}>
              <IconButton onClick={toggleDrawer(true)}>
                <BurgerIcon />
              </IconButton>
            </Box>
          }

          <Drawer
            anchor={'right'}
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            css={css`
              min-width: 440px;
              background: transparent !important;

              ${mqDown('sm')} {
                min-width: 90vw;
              }

              .MuiBackdrop-root {
                background: transparent;
              }

              .MuiPaper-root {
                backdrop-filter: blur(2px);
                background-color: rgba(0, 0, 0, 0.2) !important;
              }
            `}
          >
            <Box mb={3.75} display={'flex'} justifyContent={'right'} pr={16.25}>
              <Link href={'sign-in'}>
                <Button style={{ marginTop: 30 }} variant={'outlined'} startIcon={<UserIcon />}>
                  Sign In
                </Button>
              </Link>

              <Box width={40} height={40} display={'inline-block'} position={'absolute'} top={30}
                   right={30}>
                <IconButton onClick={toggleDrawer(false)}>
                  <BurgerIcon active />
                </IconButton>
              </Box>
            </Box>

            <List css={css`
              min-width: 440px;
              padding-left: 80px;
              padding-bottom: 50px;

              ${mqDown('sm')} {
                padding-left: 0;
                min-width: 90vw;

              }

              .list-header {
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 17px;
                text-transform: uppercase;
                color: #808080;

              }

              .MuiListItem-root {
                transition: color 0.2s;

                &:hover {
                  cursor: pointer;
                  color: #32EEFF;
                }
              }
            `}>

              {
                !isMd && links.map(link => <Link key={link.name} href={link.path}>
                  <ListItem css={css`
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    margin: 20px 0;

                  `} button>
                    <Typography variant={'h4'}>
                      {
                        link.name
                      }
                    </Typography>
                  </ListItem>
                </Link>)
              }

              {
                drawerLinks.map(drawerLink => <Fragment key={drawerLink.title}>
                  <p className={'list-header'}>
                    {
                      drawerLink.title
                    }
                  </p>
                  {
                    drawerLink.items.map(item => <ListItem key={item.name} css={css`
                      display: flex;
                      justify-content: start;
                      align-items: center;
                      padding-left: 0 !important;
                      position: relative;

                      &:before {
                        content: ${item.active === false ? '"SOON"' : null};
                        width: 60px;
                        height: 20px;
                        left: -80px;
                        position: absolute;
                        background: #32EEFF;
                        border-radius: 3px;
                        text-align: center;
                        font-weight: 700;
                        font-size: 10px;
                        line-height: 12px;
                        text-transform: uppercase;
                        color: #1F1F1F;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      }

                    `} button>
                      <Typography variant={'h4'}>
                        {
                          item.name
                        }
                      </Typography>
                    </ListItem>)
                  }
                </Fragment>)
              }
            </List>
          </Drawer>
        </>
      }
    </Box>
  </header>
}
