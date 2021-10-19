const jestConfigBase = require('@choseohwan/jest-preset-base');

module.exports = {
    ...jestConfigBase,
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
        '@choseohwan/utils(.*)': `@choseohwan/utils/dist/cjs$1`,
    },
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.json",
            babelConfig: "<rootDir>/babel.config.test.js"
        },
    }
};
