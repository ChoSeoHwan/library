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

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'cjs',
        sourcemap: false
    },
    plugins: [
        cleaner({ targets: ['dist'] }),
        peerDepsExternal(),
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
        babel(babelOptions),
        resolve(resolveOptions),
        commonjs(commonJSOptions),
        terser()
    ]
};
