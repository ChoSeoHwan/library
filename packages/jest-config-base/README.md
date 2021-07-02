# `jest-config-base`

jest base config for @choseohwan project

## Install

### npm
```bat
npm install @choseohwan/jest-config-base --save-dev
```

### yarn
```bat
yarn add @choseohwan/jest-config-base -D
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
