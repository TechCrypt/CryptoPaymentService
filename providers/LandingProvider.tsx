import { createContext, useEffect, useState } from 'react'
import { ITokenomicPages, ITokenomicItem, IQuartItem } from '../types/landing.types'


interface ILandingContext {
  currentYear: 2022 | 2023
  currentQuartIndex: number
  setCurrentQuartIndex: (number) => void
  setCurrentYear: (number) => void
  tokenomicPages: ITokenomicPages[]
}

export const LandingContext = createContext<Partial<ILandingContext>>({})

export const LandingProvider = ({ children }) => {

  const [currentQuartIndex, setCurrentQuartIndex] = useState<number>(0)
  const [currentYear, setCurrentYear] = useState<2022 | 2023>(2022)

  const [tokenomicPages, setTokenomicPages] = useState<ITokenomicPages[]>(tokenomicFor2022)

  const value = {
    currentYear,
    setCurrentYear,
    currentQuartIndex,
    setCurrentQuartIndex,
    tokenomicPages
  }

  useEffect(() => {
    if (currentYear === 2022) return setTokenomicPages(tokenomicFor2022)
    setTokenomicPages(tokenomicFor2023)
  }, [currentYear])

  return <LandingContext.Provider value={value}>
    {children}
  </LandingContext.Provider>
}


export const quart1: ITokenomicItem[] = [
  {
    title: 'MVP - Proof of Exchange',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis eu sit eu pretium nisl diam aenean cras',
    stage: 'passed'
  },
  {
    title: 'Token Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis eu sit eu pretium nisl diam aenean cras',
    stage: 'processing'
  },
  {
    title: 'KYC API',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis eu sit eu pretium nisl diam aenean cras',
    stage: 'soon'
  }
]

export const quart2: ITokenomicItem[] = [
  {
    title: 'Airdrops:COMM tokens, land, NFTs',
    stage: 'soon'
  },
  {
    title: 'ICO/IDO',
    stage: 'soon'
  },
  {
    title: 'Listing on DEXs',
    stage: 'soon'
  },
  {
    title: 'Coinmarketcap listing',
    stage: 'soon'
  }
]


export const quart3: ITokenomicItem[] = [
  {
    title: 'Staking',
    stage: 'soon'
  },
  {
    title: 'LP Staking',
    stage: 'soon'
  },
  {
    title: 'Farming',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis eu sit eu pretium nisl diam aenean cras',
    stage: 'soon'
  }
]


export const quart4Page1: ITokenomicItem[] = [
  {
    title: 'COMM Ecosystem',
    stage: 'soon'
  },
  {
    title: 'COMM Pay',
    stage: 'soon'
  },
  {
    title: 'COMM Credit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis eu sit eu pretium nisl diam aenean cras',
    stage: 'soon'
  }
]

export const quart4Page2: ITokenomicItem[] = [
  {
    title: 'COMM Deposit',
    stage: 'soon'
  },
  {
    title: 'COMM Swap',
    stage: 'soon'
  },
  {
    title: 'Base of Merchants',
    stage: 'soon'
  }
]

export const quart4Page3: ITokenomicItem[] = [
  {
    title: 'Collaboration with NFT marketplaces & GameFi projects',
    stage: 'soon'
  },
  {
    title: 'Metaverse',
    stage: 'soon'
  },
  {
    title: 'Beta version of mobile app',
    stage: 'soon'
  }
]

export const tokenomicFor2022: ITokenomicPages[] = [
  {
    tokenomics: quart1,
    quartType: 'q1'
  },
  {
    tokenomics: quart2,
    quartType: 'q2'
  },
  {
    tokenomics: quart3,
    quartType: 'q3'
  },
  {
    tokenomics: quart4Page1,
    quartType: 'q4page1'
  },
  {
    tokenomics: quart4Page2,
    quartType: 'q4page2'
  },
  {
    tokenomics: quart4Page3,
    quartType: 'q4page3'
  }
]

export const tokenomicFor2023: ITokenomicPages[] = [
  {
    tokenomics: quart1,
    quartType: 'q1'
  },
  {
    tokenomics: quart2,
    quartType: 'q2'
  }
]


export const quarts2022: IQuartItem[] = [
  {
    title: 'q1',
    quartType: 'q1'
  },
  {
    title: 'q2',
    quartType: 'q2'
  },
  {
    title: 'q3',
    quartType: 'q3'
  },
  {
    title: 'q4',
    quartType: 'q4'

  }
]

export const quarts2023: IQuartItem[] = [
  {
    title: 'q1',
    quartType: 'q1'
  },
  {
    title: 'q2',
    quartType: 'q2'
  }
]
