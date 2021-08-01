import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import cleaner from 'rollup-plugin-cleaner';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import ttypescript from 'ttypescript';
import typescript from 'rollup-plugin-typescript2';

const typescriptOptions = {
    typescript: ttypescript,
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
                sourcemap: false
            }
        ],
        plugins: [
            cleaner({ targets: ['dist/esm'] }),
            peerDepsExternal(),
            typescript({
                ...typescriptOptions,
                outDir: 'dist/esm',
                tsconfigDefaults: {
                    compilerOptions: {
                        plugins: [
                            { "transform": "typescript-transform-paths", "afterDeclarations": true }
                        ]
                    }
                }
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
                sourcemap: false
            }
        ],
        plugins: [
            cleaner({ targets: ['dist/umd'] }),
            peerDepsExternal(),
            typescript({
                ...typescriptOptions,
                outDir: 'dist/umd',
                tsconfigDefaults: {
                    compilerOptions: {
                        plugins: [
                            { "transform": "typescript-transform-paths", "afterDeclarations": true }
                        ]
                    }
                }
            }),
            babel(babelOptions),
            resolve(resolveOptions),
            commonjs(commonJSOptions),
            terser(),
        ]
    }
];
