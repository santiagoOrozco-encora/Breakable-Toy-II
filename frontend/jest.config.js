module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testMatch: ['**/__tests__/**/*.test.tsx'],
  globals: {
    TextEncoder: require('text-encoding').TextEncoder,
    TextDecoder: require('text-encoding').TextDecoder
  }
}
