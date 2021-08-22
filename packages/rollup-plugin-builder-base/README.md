# `@choseohwan/rollup-plugin-builder-base`

Base plugins builder about @choseohwan/rollup-builder 

## Install

### npm
```shell
npm install @choseohwan/rollup-plugin-builder-base @choseohwan/rollup-builder --save-dev
```

### yarn
```shell
yarn add @choseohwan/rollup-plugin-builder-base @choseohwan/rollup-builder -D
```

## Description

### List of applied plugins

- **[rollup-builder-cleaner](https://www.npmjs.com/package/rollup-plugin-cleaner)**
    - A rollup plugin to clean directories before rebuilding.


- **[rollup-plugin-peer-deps-external](https://www.npmjs.com/package/rollup-plugin-peer-deps-external)**
    - Automatically externalize `peerDependencies` in a `rollup` bundle.


- **[@rollup/plugin-node-resolve](https://www.npmjs.com/package/@rollup/plugin-node-resolve)**
    - A Rollup plugin which locates modules using the Node resolution algorithm, <br>
    for using third party modules in node_modules.


- **[rollup-plugin-typescript2](https://www.npmjs.com/package/rollup-plugin-typescript2)**
    - Rollup plugin for typescript with compiler errors.
    - Works with **[ttypescript](https://www.npmjs.com/package/ttypescript)** and **[typescript-transform-paths](https://www.npmjs.com/package/typescript-transform-paths)**. 


- **[@rollup/plugin-commonjs](https://www.npmjs.com/package/@rollup/plugin-commonjs)**
    - A Rollup plugin to convert CommonJS modules to ES6, <br>
    so they can be included in a Rollup bundle.


- **[@rollup/plugin-babel](https://www.npmjs.com/package/@rollup/plugin-babel)**
    - A Rollup plugin for seamless integration between Rollup and Babel.
    - Works with **[@babel/plugin-transform-runtime](https://www.npmjs.com/package/@babel/plugin-transform-runtime)** for rollup library.


- **[rollup-plugin-terser](https://www.npmjs.com/package/rollup-plugin-terser)**
    - Rollup plugin to minify generated es bundle. Uses terser under the hood.

## Usage

Create `rollup.config.js` and `babel.config.js` in project root.

`rollup.config.js`
```javascript
import buildRollupOptions, { Input, OutputBuilder } from '@choseohwan/rollup-builder';
import buildBasePlugins from "@choseohwan/rollup-plugin-builder-base";
// another imports...

// makes input object (rollup config's input option)
const input = new Input(
    {
        index: 'src/index.ts',
        option: 'src/option/index.ts',
        builder: 'src/builder/index.ts'
    },
    {
        umd: 'src/index.ts'
    }
);

// makes output builder
const outputBuilder = new OutputBuilder({
    sourcemap: true
});

// create plugins object using @choseohwan/rollup-plugin-builder-base
const plugins = buildBasePlugins();

// make rollup options with options
export default buildRollupOptions(
    input,
    [
        outputBuilder.buildES({
            dir: 'dist/esm'
        }),
        outputBuilder.buildCJS({
            dir: 'dist/cjs'
        }),
        outputBuilder.buildUMD('common', {
            dir: 'dist/umd'
        })
    ],
    plugins
);
```
<br>

`babel.config.js`
```javascript
module.exports = {
    // babel setup config here...
}
```