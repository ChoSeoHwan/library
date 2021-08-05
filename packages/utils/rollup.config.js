import buildRollupOptions, { Input, OutputBuilder, PluginsBuilder } from '@choseohwan/rollup-builder';

const input = new Input('src/index.ts', {
    es: {
        index: "src/index.ts",
        prototypes: "src/prototypes/index.ts"
    }
});

const outputBuilder = new OutputBuilder({
    sourcemap: true
});

const plugins = PluginsBuilder.buildBasePlugins();

export default buildRollupOptions(
    input,
    [
        outputBuilder.buildES({
            dir: 'dist/esm'
        }),
        outputBuilder.buildCJS({
            exports: 'named',
            dir: 'dist/cjs'
        }),
        outputBuilder.buildUMD('utils', {
            dir: 'dist/umd'
        })
    ],
    plugins
);