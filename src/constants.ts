import {
  required,
  email,
  numeric,
  minLength,
  helpers,
  maxValue
} from '@vuelidate/validators'

// quantity of countries to show in Home page with the Intersection observer
export const REGISTER_PER_PAGE = 40

// quantity of countries to play in the flipping game
export const COUNTRIES_TO_PLAY = 12

// maximum of movements in the flipping game
export const MAX_MOVEMENTS = COUNTRIES_TO_PLAY + 10

// time in milliseconds to wait to turn over the card in the flipping game
export const TIME_TO_TURN_OVER = 1500

// quantity of countries to play with in Continents game
export const COUNTRIES_TO_DRAG = 27

// TODO: move this to About file
// About page form configs
export const aboutFormFields = {
  fullName: '',
  email: '',
  countriesVisited: '',
  countriesThisYear: '',
  favoriteCountry: '',
  leastFavoriteCountry: '',
  favoriteFood: '',
  andeanCountries: new Set(),
  password: '',
  randomContent: ''
}

// TODO: move this to About file
export const aboutFormRules = {
  fullName: {
    required: helpers.withMessage('This field is required', required),
    minLength: helpers.withMessage('Full Name must be at least 3 characters', minLength(3)),
    $autoDirty: true
  },
  email: {
    required: helpers.withMessage('This field is required', required),
    email: helpers.withMessage('Email format is invalid', email),
    minLength: helpers.withMessage('Email must be at least 6 characters', minLength(6)),
    $autoDirty: true
  },
  countriesVisited: {
    required: helpers.withMessage('This field is required', required),
    numeric: helpers.withMessage('This field must be numeric', numeric),
    maxValue: helpers.withMessage('There are only 195 countries in the world. Did you travel to Mars?', maxValue(195)),
    $autoDirty: true
  },
  countriesThisYear: {
    required: helpers.withMessage('This field is required', required),
    numeric: helpers.withMessage('This field must be numeric', numeric),
    maxValue: helpers.withMessage('There are only 195 countries in the world. Did you travel to Mars?', maxValue(195)),
    $autoDirty: true
  },
  favoriteCountry: {
    required: helpers.withMessage('This field is required', required),
    $autoDirty: true
  },
  favoriteFood: {
    required: helpers.withMessage('This field is required', required)
  },
  password: {
    required: helpers.withMessage('This field is required', required),
    minLength: helpers.withMessage('Email must be at least 8 characters', minLength(8)),
    $autoDirty: true
  },
  randomContent: {
    minLength: helpers.withMessage('This field must be at least 3 characters', minLength(10)),
    $autoDirty: true
  }
}
// End About page form configs
