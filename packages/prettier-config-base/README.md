# `@choseohwan/prettier-config-base`

base prettier config for SeoHwan Cho's project

## Install

### npm
```shell
npm install @choseohwan/prettier-config-base prettier --save-dev
```

### yarn
```shell
yarn add @choseohwan/prettier-config-base prettier -D
```

## Usage

Make `.prettierrc.js` file in the root directory of packages.

**`.prettierrc.js`**
```javascript
const prettierBaseConfig = require('@choseohwan/prettier-config-base');

// if you want config another setting, change prettierBaseConfig array

module.exports = prettierBaseConfig;
```
