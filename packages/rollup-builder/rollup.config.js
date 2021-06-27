import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescriptPlugin from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import cleaner from 'rollup-plugin-cleaner';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import typescript from 'typescript';

const typescriptOptions = {
    typescript,
    tsconfig: 'tsconfig.json'
};

const commonJSOptions = {
    extensions: ['.js', '.ts'],
    include: ['node_modules/**']
};

const babelOptions = {
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    babelHelpers: 'runtime',
    plugins: ['@babel/plugin-transform-runtime']
};

const resolveOptions = {
    browser: true
};

const input = 'src/index.ts',
    name = 'rollupBuilder';

export default [
    {
        input,
        output: [
            {
                dir: 'dist/esm',
                name,
                format: 'es',
                sourcemap: true
            }
        ],
        plugins: [
            cleaner({ targets: ['dist/esm'] }),
            resolve(resolveOptions),
            commonjs(commonJSOptions),
            typescriptPlugin({
                ...typescriptOptions,
                outDir: 'dist/esm'
            }),
            babel(babelOptions),
            terser()
        ]
    },
    {
        input,
        output: [
            {
                dir: 'dist/umd',
                name,
                format: 'umd',
                sourcemap: true
            }
        ],
        plugins: [
            cleaner({ targets: ['dist/umd'] }),
            resolve(resolveOptions),
            commonjs(commonJSOptions),
            typescriptPlugin({
                ...typescriptOptions,
                outDir: 'dist/umd'
            }),
            babel(babelOptions),
            terser()
        ]
    }
];
