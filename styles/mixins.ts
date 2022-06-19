import { Breakpoint } from '@mui/system/createTheme/createBreakpoints'
import { theme } from './theme/theme'


export const mqDown = (bp: Breakpoint): string => `@media (max-width: ${theme.breakpoints.values[bp]}px)`
export const mqUp = (bp: Breakpoint): string => `@media (min-width: ${theme.breakpoints.values[bp]}px)`
