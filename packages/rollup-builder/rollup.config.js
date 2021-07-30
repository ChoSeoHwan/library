import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import cleaner from 'rollup-plugin-cleaner';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const typescriptOptions = {
    tsconfig: 'tsconfig.json'
};

const commonJSOptions = {
    extensions: ['.js', '.ts'],
    include: ['node_modules/**']
};

const babelOptions = {
    extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    babelHelpers: 'runtime',
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-arrow-functions'
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
            resolve(resolveOptions),
            commonjs(commonJSOptions),
            typescript({
                ...typescriptOptions,
                outDir: 'dist/esm'
            }),
            babel(babelOptions),
            terser()
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
            resolve(resolveOptions),
            commonjs(commonJSOptions),
            typescript({
                ...typescriptOptions,
                outDir: 'dist/umd'
            }),
            babel(babelOptions),
            terser()
        ]
    }
];
