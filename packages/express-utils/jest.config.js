const jestConfigBase = require('@choseohwan/jest-preset-base');

module.exports = {
    ...jestConfigBase,
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: "<rootDir>/tsconfig.json",
                babelConfig: "<rootDir>/babel.config.test.js"
            }
        ]
    },
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
    }
};
