import buildRollupOptions, { Input, OutputBuilder } from '@choseohwan/rollup-builder';
import buildBasePlugins from "@choseohwan/rollup-plugin-builder-base";

const input = new Input({
    index: "src/index.ts",
    prototypes: "src/prototypes/index.ts",
    constant: "src/constant/index.ts"
}, {
    umd: 'src/index.ts'
});

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
        }),
        outputBuilder.buildUMD('utils', {
            dir: 'dist/umd'
        })
    ],
    plugins
);