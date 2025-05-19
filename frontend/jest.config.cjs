require("text-encoding");
require('@testing-library/jest-dom');
require('jest-environment-jsdom');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: false,
        allowJs: true
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testMatch: ['**/__tests__/**/*.test.tsx'],
  globals: {
    TextEncoder: require('text-encoding').TextEncoder,
    TextDecoder: require('text-encoding').TextDecoder
  }
};
