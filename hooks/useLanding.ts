import { useContext } from 'react'
import { LandingContext } from '../providers/LandingProvider'

export const useLanding = () => {
  return useContext(LandingContext)
}
