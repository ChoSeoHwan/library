import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import cleaner from 'rollup-plugin-cleaner';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';

const typescriptOptions = {
    typescript: ttypescript,
    tsconfig: 'tsconfig.json'
};

const babelOptions = {
    extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    babelHelpers: 'runtime'
};

const resolveOptions = {
    browser: true
};

export default {
    input: 'src/index.ts',
    context: 'window',
    output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
        name: 'buildRollupOptions'
    },
    plugins: [
        cleaner({ targets: ['dist'] }),
        peerDepsExternal(),
        resolve(resolveOptions),
        typescript({
            ...typescriptOptions,
            tsconfigDefaults: {
                compilerOptions: {
                    outDir: 'dist',
                    plugins: [
                        { "transform": "typescript-transform-paths", "afterDeclarations": true }
                    ]
                }
            }
        }),
        commonjs(),
        babel(babelOptions),
        terser()
    ]
};
