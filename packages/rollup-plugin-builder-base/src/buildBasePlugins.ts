import { Plugin, Plugins } from '@choseohwan/rollup-builder';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript, { RPT2Options } from 'rollup-plugin-typescript2';

const buildBasePlugins = (): Plugins => {
    const cleanerPlugin = new Plugin(
        'rollup-builder-cleaner',
        cleaner,
        (output): [{ targets: string[] }] => [
            {
                targets: [output.getOutputDir()]
            }
        ]
    );

    const peerDepsExternalPlugin = new Plugin(
        'rollup-plugin-peer-deps-external',
        peerDepsExternal,
        []
    );

    const jsonPlugin = new Plugin('@rollup/plugin-json', json, []);

    const resolvePlugin = new Plugin('@rollup/plugin-node-resolve', resolve, [
        {
            preferBuiltins: true
        }
    ]);

    const typescriptPlugin = new Plugin(
        'rollup-plugin-typescript2',
        typescript,
        (output): [RPT2Options] => [
            {
                typescript: require('ttypescript'),
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
    );

    const commonjsPlugin = new Plugin('@rollup/plugin-commonjs', commonjs, [
        {
            extensions: ['.js', '.ts'],
            include: ['node_modules/**', '../../node_modules/**']
        }
    ]);

    const babelPlugin = new Plugin('@rollup/plugin-babel', babel, [
        {
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
            babelHelpers: 'runtime',
            plugins: ['@babel/plugin-transform-runtime']
        }
    ]);

    const terserPlugin = new Plugin('rollup-plugin-terser', terser, []);

    return new Plugins(
        cleanerPlugin,
        peerDepsExternalPlugin,
        jsonPlugin,
        resolvePlugin,
        typescriptPlugin,
        commonjsPlugin,
        babelPlugin,
        terserPlugin
    );
};

export default buildBasePlugins;
