interface Country {
  code: string;
  emoji: string;
  name: string;
  continent?: {
    code: CONTINENTS_CODES;
  }
}

interface Continent {
  code: CONTINENTS_CODES;
  name: string;
}

export enum CONTINENTS_CODES {
  AF = 'AF',
  AN = 'AN',
  AS = 'AS',
  EU = 'EU',
  NA = 'NA',
  OC = 'OC',
  SA = 'SA',
}

export {
  type Country,
  type Continent,
}
