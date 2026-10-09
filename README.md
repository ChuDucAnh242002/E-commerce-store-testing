[![Coverage Status](https://coveralls.io/repos/github/ChuDucAnh242002/E-commerce-store-testing/badge.svg?branch=main)](https://coveralls.io/github/ChuDucAnh242002/E-commerce-store-testing?branch=main)

# [COMP.SE.200] Software Testing project

This repository contains the JavaScript project for the COMP.SE.200 Software Testing course (2024–2025). It provides utility functions and example e-commerce workflows, with unit and integration tests written using Jest.

## Project contents

- `src/` contains the JavaScript modules, including collection and value utilities and product-management helpers.
- `src/test/unit/` contains unit tests for individual utilities.
- `src/test/integration/` contains tests for e-commerce workflows: product browsing and search, cart operations, checkout, and producer login and product management.
- `src/test/utils/` contains helpers used by the workflow tests.

## Requirements

- Node.js and npm

## Install

From the repository root, install the locked dependencies:

```sh
npm ci
```

## Run tests

Run the complete Jest test suite, generate coverage reports, and submit coverage to Coveralls:

```sh
npm test
```

To run Jest and generate coverage locally without the Coveralls submission step:

```sh
npm run test:only
```

Jest is configured to discover tests under `src/test/` whose filenames end in `.test.js`. Coverage reports are written to `coverage/` (including an `lcov.info` report).

## Coverage

Coverage results are available on [Coveralls](https://coveralls.io/github/ChuDucAnh242002/E-commerce-store-testing?branch=main). The GitHub Actions workflow runs the test and coverage command for pushes and pull requests targeting `main`.
