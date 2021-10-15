module.exports = {
    preset: "@choseohwan/jest-preset-base",
    moduleNameMapper: {
        '~/(.*)': '<rootDir>/src/$1',
        '@choseohwan/utils/constant': `@choseohwan/utils/dist/esm/constant.js`
    }
};
