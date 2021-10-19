const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    ...tsjPreset,
    testEnvironment: 'node',
    rootDir: "./",
    modulePaths: ["<rootDir>/src/"],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: '.jest',
                filename: 'report.html',
                expand: false
            }
        ]
    ],
    collectCoverage: false,
    coverageReporters: ['json', 'html'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx,js,jsx}',
        '!<rootDir>/src/**/*.stories.{ts,tsx,js,jsx}'
    ],
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.json",
            babelConfig: true
        },
    },
    testMatch: [
        "<rootDir>/__tests__/**/*.spec.[jt]s?(x)",
        "<rootDir>/src/**/*.spec.[jt]s?(x)",
    ],
    verbose: false
};