interface Country {
  code: string
  emoji: string
  name: string
  capital: string
}

interface CountryDetail {
  emoji: string
  name: string
  capital: string
  awsRegion: string
  currencies: string[]
  phone: string
  states:
    | {
        code: string
        name: string
      }[]
    | null
  continent: {
    name: string
  }
  languages: {
    code: string
    name: string
    native: string
  }[]
}

export { type Country, type CountryDetail }
