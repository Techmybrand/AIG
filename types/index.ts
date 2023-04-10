export interface Currencies {
  name: string
  symbol: string
  icon: string
}

export interface TokenInputValue {
  name: string
  symbol: string
  amount: number | string
}

export interface NavLink {
  title: string
  url: string
  external?: boolean
}

export interface Team {
  name: string
  title: string
  icon: string
  socials: {
    linkedIn: string
    twitter: string
  }
}

export interface FAQ {
  title: string
  description: string
}

export interface Community {
  icon?: string
  title: string
  url: string
  description: string
}

export interface Socials {
  icon: string
  title: string
  url: string
}
