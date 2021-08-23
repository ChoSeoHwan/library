# `@choseohwan/babel-preset-react`

react base preset for SeoHwan Cho's project

## Install

### npm
```shell
npm install @choseohwan/babel-preset-react @babel/core typescript react --save-dev
```

### yarn
```shell
yarn add @choseohwan/babel-preset-react @babel/core typescript react -D
```

## Options

`env`
 - configuration option for [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env#options)


`react`
 - configuration option for [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react#options)


`typescript`
- configuration option for [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript#options)


## Usage

Make `babel.config.js` file in the root directory of packages.

**`babel.config.js`**
```javascript
module.exports = {
    "presets": [
        "@choseohwan/babel-preset-react"
    ]
}
```

### With options
**`babel.config.js`**
```javascript
const options = {
    env: {
        targets: {
            node: 'current'
        }
    },
    react: {
        runtime: 'classic'
    }
}

module.exports = {
    "presets": [
        [
            "@choseohwan/babel-preset-react",
            options
        ]
    ]
}
```