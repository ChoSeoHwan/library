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

```typescript
import { Input } from '@choseohwan/rollup-builder/option';
import { OutputBuilder, PluginsBuilder } from '@choseohwan/rollup-builder/builder'; 
import buildRollupOptions from '@choseohwan/rollup-builder'; 

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

// makes plugins object with plugin builder
const plugins = PluginsBuilder.buildBasePlugins();

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
