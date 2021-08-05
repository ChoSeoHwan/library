const jestBaseConfig = require("@choseohwan/jest-config-base");

module.exports = {
    ...jestBaseConfig,
    testMatch: ["<rootDir>/**/*.spec.[jt]s?(x)"],
    moduleNameMapper: {
        '~src/(.*)': '<rootDir>/src/$1',
    }
};
