const jestBaseConfig = require('@choseohwan/jest-config-base');

module.exports = {
    ...jestBaseConfig,
    moduleNameMapper: {
        '~src/(.*)': '<rootDir>/src/$1'
    }
};
