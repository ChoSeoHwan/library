import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import cleaner from 'rollup-plugin-cleaner';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const typescriptOptions = {
    tsconfig: 'tsconfig.json'
};

const commonJSOptions = {
    extensions: ['.js', '.ts']
};

const babelOptions = {
    extensions: [...DEFAULT_EXTENSIONS, '.ts'],
    babelHelpers: 'runtime',
    plugins: [
        '@babel/plugin-transform-runtime',
        [
            '@babel/plugin-transform-arrow-functions',
            {
                "spec": true
            }
        ]
    ]
};

const resolveOptions = {
    browser: true
};

const name = 'rollupBuilder';

export default [
    {
        input: {
            'index': 'src/index.ts',
            'option': 'src/option/index.ts',
            'builder': 'src/builder/index.ts'
        },
        output: [
            {
                dir: 'dist/esm',
                name,
                format: 'es',
            }
        ],
        plugins: [
            cleaner({ targets: ['dist/esm'] }),
            peerDepsExternal(),
            typescript({
                ...typescriptOptions,
                outDir: 'dist/esm'
            }),
            babel(babelOptions),
            resolve(resolveOptions),
            commonjs(commonJSOptions),
            terser(),
        ]
    },
    {
        input: 'src/index.ts',
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
            peerDepsExternal(),
            typescript({
                ...typescriptOptions,
                outDir: 'dist/umd'
            }),
            babel(babelOptions),
            resolve(resolveOptions),
            commonjs(commonJSOptions),
            terser(),
        ]
    }
];
