# FE Components

> FE Components built for re-use.

## Installation

- `npm i`

## Tasks

- `npm run serve` - Spins up a `localhost:8080`
- `npm run test` - Runs the mocha tests & runs a Pa11y audit on `code-computerlove-fe-components.surge.sh`
- `gulp` - throws the js assets into dist
- `gulp build` - used on the travis ci to push code to the surge domain.

## Testing Env

We are using Mocha to write the tests & we create the enviroment using JSDom.

## Known issues

When running `npm run serve` in one tab to view the component you will need to either spin up site on port `8081` as it will conflict when `npm run test` happens.
