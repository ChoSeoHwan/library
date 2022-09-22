export default {
    preset: '@choseohwan/jest-preset-base',
    rootDir: '../',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
    moduleNameMapper: {
        '~src/(.*)': '<rootDir>/src/$1'
    }
};
