import { createTheme } from '@mui/material'
import { MixinsOptions } from '@mui/material/styles/createMixins'
import { CSSProperties } from '@mui/styles'
import { BreakpointsOptions } from '@mui/system/createTheme/createBreakpoints'


export type TMixinFn = {
  (...args: any): CSSProperties
}

export type TMixins = MixinsOptions & {
  [key in string | number]: CSSProperties | TMixinFn
}


const defaultTheme = createTheme({})

export const theme = createTheme({
  palette: {
    background: {
      default: '#050A1D'
    },
    mode: 'dark'
  },
  mixins: {
    size: (width: number, height = width as number) => ({
      width,
      height
    }),
    maxSize: (maxWidth: number, maxHeight = maxWidth as number) => ({
      maxWidth,
      maxHeight
    }),
    bgImg(img: string, size: number, position = 'center', noRepeat = 'no-repeat') {
      return {
        background: `url(${img})`,
        backgroundPosition: position,
        backgroundRepeat: noRepeat,
        backgroundSize: size
      }
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    flexColumnCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }
  } as TMixins,
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 14,
    fontWeightRegular: 400
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          fontFamily: '"Inter", sans-serif'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: 14
        },
        body2: {
          fontWeight: 'normal !important',
          fontSize: '18px !important',
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: '16px !important'
          }
        },
        button: {
          fontWeight: '700 !important',
          lineHeight: '17px !important',
          transition: 'color 0.4s',
          '&:hover': {
            color: '#32EEFF',
            cursor: 'pointer'
          }
        },
        h1: {
          fontWeight: '700 !important',
          fontSize: '38px !important',
          lineHeight: '46px !important',

          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: '25px !important'
          }

        },
        h2: {
          fontWeight: '700 !important',
          fontSize: '32px !important',
          lineHeight: '39px !important',

          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: '22px !important'
          }
        },
        h4: {
          fontWeight: '700 !important',
          fontSize: '24px !important',
          lineHeight: '29px !important',
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: '19px !important'
          }
        },
        h5: {
          fontWeight: '700 !important',
          fontSize: '18px !important',
          lineHeight: '22px !important',
          [defaultTheme.breakpoints.down('md')]: {
            fontSize: '12px !important'
          },
          [defaultTheme.breakpoints.down('sm')]: {
            fontSize: '9px !important'
          }
        },
        subtitle1: {
          fontWeight: '400 !important',
          fontSize: '14px !important',
          lineHeight: '17px !important'
        },
        subtitle2: {
          fontWeight: '400 !important',
          fontSize: '12px !important',
          lineHeight: '15px !important'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '15px 20px !important',
          borderRadius: 4,
          border: '2px solid #2E2A39',
          '&:hover': {
            background: 'linear-gradient(281.05deg, #A400E1 41.83%, #32EEFF 100%)'
          }
        },
        outlined: {
          border: 'none',
          background: 'transparent',
          fontWeight: '700 !important',
          fontSize: '14px !important',
          color: '#32EEFF !important',
          lineHeight: '17px !important',
          '&:hover': {
            border: 'none',
            background: 'transparent'
          },
          '.MuiButton-startIcon': {
            marginTop: 5
          }
        },
        text: {
          fontWeight: '700 !important',
          fontSize: '14px !important',
          lineHeight: '17px !important',
          color: 'white'
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '15px 20px !important',
          border: '2px solid #2E2A39',
          background: 'transparent',
          '&.Mui-selected': {
            'background': 'linear-gradient(281.05deg, #A400E1 41.83%, #32EEFF 100%) !important'
          }
        }

      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: '700 !important',
          fontSize: '18px !important',
          lineHeight: '22px !important',
          color: 'rgb(11, 20, 38) !important',
          '&.Mui-selected': {
            color: 'rgb(17, 153, 250) !important'
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: '2px !important',
          background: 'rgb(17, 153, 250) !important',
          borderRadius: 1
        }
      }
    },

    MuiAutocomplete: {
      styleOverrides: {
        root: {
          padding: 'unset'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: 40,
          '.MuiAutocomplete-input': {
            paddingTop: '0 !important'
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#2C4152 !important'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paperAnchorRight: {
          background: 'transparent !important'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.error.light
        }
      }
    }
  }
})

export type Theme = typeof theme
