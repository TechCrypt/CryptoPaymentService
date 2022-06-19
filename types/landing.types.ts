export type TQuart = 'q1' | 'q2' | 'q3' | 'q4' | 'q4page1' | 'q4page2' | 'q4page3' | 'q4page4'

export interface ITokenomicItem {
  title: string
  description?: string
  stage: 'passed' | 'processing' | 'soon'
}

export interface ITokenomicPages {
  tokenomics: ITokenomicItem[]
  quartType: TQuart
}


export interface IQuartItem {
  title: string
  quartType: TQuart
}
