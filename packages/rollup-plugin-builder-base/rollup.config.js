import buildRollupOptions, {Input, OutputBuilder, Plugin, Plugins} from '@choseohwan/rollup-builder';
import cleaner from "rollup-plugin-cleaner";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import {DEFAULT_EXTENSIONS} from "@babel/core";
import {terser} from "rollup-plugin-terser";
import ttypescript from 'ttypescript';

const input = new Input('src/buildBasePlugins.ts');

const outputBuilder = new OutputBuilder({
    sourcemap: true
});

const plugins = new Plugins(
    new Plugin(
        'rollup-builder-cleaner',
        cleaner,
        (output) => [
            {
                targets: [output.getOutputDir()]
            }
        ]
    ),
    new Plugin(
        'rollup-plugin-peer-deps-external',
        peerDepsExternal,
        []
    ),
    new Plugin('@rollup/plugin-node-resolve', resolve, [
        {
            browser: true
        }
    ]),
    new Plugin(
        'rollup-plugin-typescript2',
        typescript,
        (output) => [
            {
                typescript: ttypescript,
                tsconfigDefaults: {
                    compilerOptions: {
                        outDir: output.getOutputDir(),
                        plugins: [
                            {
                                transform: 'typescript-transform-paths',
                                afterDeclarations: true
                            }
                        ]
                    }
                }
            }
        ]
    ),
    new Plugin('@rollup/plugin-commonjs', commonjs, [
        {
            extensions: ['.js', '.ts'],
            include: ['node_modules/**']
        }
    ]),
    new Plugin('@rollup/plugin-babel', babel, [
        {
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
            babelHelpers: 'runtime'
        }
    ]),
    new Plugin('rollup-plugin-terser', terser, [])
);

export default buildRollupOptions(
    input,
    [
        outputBuilder.buildCJS({
            exports: 'named',
            dir: 'dist'
        })
    ],
    plugins
);