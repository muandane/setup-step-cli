import { jest } from '@jest/globals'

export const installStepCli =
  jest.fn<typeof import('../src/setup-step-cli.js').installStepCli>()
