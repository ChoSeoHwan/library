module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "./",
  modulePaths: ["<rootDir>/src/"],
  reporters: [
    "default",
    ["jest-html-reporter", {
      pageTitle: "JS COMMON TEST",
      outputPath: "./.jest/report.html",
      sort: "titleAsc",
      includeConsoleLog: true,
      includeFailureMsg: true
    }]
  ],
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
      babelConfig: true
    },
  },
  testMatch: ["<rootDir>/__tests__/**/*.spec.[jt]s?(x)"],
  verbose: false
};