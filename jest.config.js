/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testMatch: [
    '<rootDir>/src/tests/**/?(*.)(spec|test).js',
    '<rootDir>/**/?(*.)(spec|test).js',
    '<rootDir>/src/tests/*.test.ts'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
};