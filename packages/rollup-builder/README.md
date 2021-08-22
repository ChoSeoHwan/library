# `@choseohwan/rollup-builder`

rollup builder for rollup config easier

## Install

### npm
```shell
npm install @choseohwan/rollup-builder --save-dev
```

### yarn
```shell
yarn add @choseohwan/rollup-builder -D
```

## Usage

###  Overall usage example

`rollup.config.js`
```javascript
import buildRollupOptions, {Input, OutputBuilder, Plugin, Plugins} from '@choseohwan/rollup-builder';
import cleaner from "rollup-plugin-cleaner";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
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

// makes plugins object 
const cleanerPlugin = new Plugin(
    'rollup-builder-cleaner',
    cleaner,
    (output) => [
        {
            targets: [output.getOutputDir()]
        }
    ]
);

const peerDepsExternals = new Plugin(
    'rollup-plugin-peer-deps-external',
    peerDepsExternal,
    []
);

const plugins = new Plugins(
    cleanerPlugin,
    peerDepsExternals,
    // ...
);

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
