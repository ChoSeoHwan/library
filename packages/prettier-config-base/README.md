# `@choseohwan/prettier-config-base`

base prettier config for @choseohwan project

## Install

### npm
```bat
npm install @choseohwan/prettier-config-base --save-dev
```

### yarn
```bat
yarn add @choseohwan/prettier-config-base -D
```

## Usage

Make `.prettierrc.js` file in the root directory of packages.

**`.prettierrc.js`**
```javascript
const prettierBaseConfig = require('@choseohwan/prettier-config-base');

// if you want config another setting, change prettierBaseConfig array

module.exports = prettierBaseConfig;
```
