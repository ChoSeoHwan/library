import buildRollupOptions, { Input, OutputBuilder } from '@choseohwan/rollup-builder';
import buildBasePlugins from "@choseohwan/rollup-plugin-builder-base";

const input = new Input('src/index.ts');

const outputBuilder = new OutputBuilder({
    sourcemap: true
});

const plugins = buildBasePlugins();

export default buildRollupOptions(
    input,
    [
        outputBuilder.buildES({
            entryFileNames: '[name].mjs',
            chunkFileNames: '[name]-[hash].mjs',
            dir: 'dist/esm'
        }),
        outputBuilder.buildCJS({
            exports: 'named',
            dir: 'dist/cjs'
        })
    ],
    plugins
);
