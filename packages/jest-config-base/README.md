# `jest-config-base`

jest base config for SeoHwan Cho's project

## Install

### npm
```shell
npm install @choseohwan/jest-config-base jest @types/jest ts-jest --save-dev
```

### yarn
```shell
yarn add @choseohwan/jest-config-base jest @types/jest ts-jest -D
```

## Usage

Make `jest.config.js` file in the root directory of packages.

**`jest.config.js`**
```javascript
const jestBaseConfig = require('@choseohwan/jest-config-base');

module.exports = {
    ...jestBaseConfig,
    // if you want config another setting, input here
};
```
