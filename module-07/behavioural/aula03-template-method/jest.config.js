/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      function: 100,
      lines: 100,
      statements: 100
    }
  },
  maxWorkers: "50%",
  testEnvironment: "node",
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules"
  ]
};
