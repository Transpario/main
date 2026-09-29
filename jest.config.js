/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next-sanity$': '<rootDir>/__tests__/__mocks__/next-sanity.js'
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
};
