import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Extend Vitest's expect method with methods from react-testing-library
expect.extend({
  toBeInTheDocument: expect.anything,
  toBeVisible: expect.anything,
  toBeDisabled: expect.anything,
  toBeEnabled: expect.anything,
  toBeInvalid: expect.anything,
  toBeValid: expect.anything,
  toBeRequired: expect.anything,
  toBeEmpty: expect.anything,
  toBeGreaterThan: expect.anything,
  toBeLessThan: expect.anything,
  toBeGreaterThanOrEqual: expect.anything,
  toBeLessThanOrEqual: expect.anything,
  toBeCloseTo: expect.anything,
  toMatchSnapshot: expect.anything,
  toMatchInlineSnapshot: expect.anything,
  toMatchImageSnapshot: expect.anything,
  toMatchFileSnapshot: expect.anything,
})

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
