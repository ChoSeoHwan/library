import buildRollupOptions, { Input, OutputBuilder } from '@choseohwan/rollup-builder';
import buildBasePlugins from "@choseohwan/rollup-plugin-builder-base";

const input = new Input('src/index.ts', {
    es: {
        index: 'src/index.ts',
        constant: 'src/constant/index.ts',
        type: 'src/type/index.ts'
    }
});

const outputBuilder = new OutputBuilder({
    sourcemap: true
});

const plugins = buildBasePlugins();

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