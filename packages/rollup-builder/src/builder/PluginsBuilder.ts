import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript, { RollupTypescriptOptions } from '@rollup/plugin-typescript';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';

import { Plugin, Plugins } from '~src/option';

class PluginsBuilder {
    static buildBasePlugins(): Plugins {
        const cleanerPlugin = new Plugin(
            'rollup-builder-cleaner',
            cleaner,
            (output): [{ targets: string[] }] => [
                {
                    targets: [output.getOutputDir()]
                }
            ]
        );

        const resolvePlugin = new Plugin(
            '@rollup/plugin-node-resolve',
            resolve,
            [
                {
                    browser: true
                }
            ]
        );

        const commonjsPlugin = new Plugin('@rollup/plugin-commonjs', commonjs, [
            {
                extensions: ['.js', '.ts'],
                include: ['node_modules/**']
            }
        ]);

        const typescriptPlugin = new Plugin(
            '@rollup/plugin-typescript',
            typescript,
            (output): [RollupTypescriptOptions] => [
                {
                    outDir: output.getOutputDir()
                }
            ]
        );

        const babelPlugin = new Plugin('@rollup/plugin-babel', babel, [
            {
                extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
                babelHelpers: 'runtime',
                plugins: [
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-arrow-functions'
                ]
            }
        ]);

        const terserPlugin = new Plugin('rollup-plugin-terser', terser, []);

        return new Plugins(
            cleanerPlugin,
            resolvePlugin,
            commonjsPlugin,
            typescriptPlugin,
            babelPlugin,
            terserPlugin
        );
    }
}

export default PluginsBuilder;
