# vue-countries-game

This small project was to practice and learn new things like Playwright, Vitest, Vite, and Vue 3. I used [this free GraphQL API](https://countries.trevorblades.com/) made by **Trevor Blades**.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

<img width="518" alt="Screenshot 2023-11-23 at 11 41 00" src="https://github.com/henryzarza/vue-countries-game/assets/28515670/cbbf5804-5314-4f15-a6e6-0bbe9cc9991d">


### Run Unit Tests coverage with [Vitest](https://vitest.dev/)

```sh
npm run test:unit:coverage
```

<img width="934" alt="Screenshot 2023-11-23 at 11 44 40" src="https://github.com/henryzarza/vue-countries-game/assets/28515670/f03c81a3-98de-470b-ae1e-5afc4850e1b1">


### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

<img width="512" alt="Screenshot 2023-11-23 at 11 40 30" src="https://github.com/henryzarza/vue-countries-game/assets/28515670/35a7cd45-5eb0-4b7f-994a-2a07714ec57e">

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Run format

```sh
npm run format
```

<hr />

#### Made with ❤️ by Henry Zarza
