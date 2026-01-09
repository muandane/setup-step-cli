/**
 * Unit tests for the action's main functionality, src/main.ts
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import * as step from '../__fixtures__/setup-step-cli.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/setup-step-cli.js', () => step)

// The module being tested should be imported dynamically.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should succeed calling main program entrypoint with latest version', async () => {
    const version = 'latest'
    core.getInput.mockReturnValueOnce(version)
    step.installStepCli.mockResolvedValueOnce('step')

    await run()
    expect(step.installStepCli).toHaveBeenCalledWith('latest')
  })

  it('should succeed calling main program entrypoint with specific version', async () => {
    const version = '0.0.0'
    core.getInput.mockReturnValueOnce(version)
    step.installStepCli.mockResolvedValueOnce('step')

    await run()
    expect(step.installStepCli).toHaveBeenCalledWith('0.0.0')
  })

  it('should fail version input validation', async () => {
    const version = 'notasemver'
    core.getInput.mockReturnValueOnce(version)

    await run()
    expect(step.installStepCli).toHaveBeenCalledTimes(0)
    expect(core.setFailed).toHaveBeenCalledWith(
      'The supplied input notasemver is not a valid version. Please supply a semver format like major.minor.hotfix'
    )
  })

  it('should fail calling main program entrypoint with Error thrown', async () => {
    const version = '0.0.0'
    core.getInput.mockReturnValueOnce(version)
    step.installStepCli.mockRejectedValueOnce(new Error('some failure'))

    await run()
    expect(step.installStepCli).toHaveBeenCalled()
    expect(core.setFailed).toHaveBeenCalledWith('some failure')
  })

  it('should fail calling main program entrypoint without Error thrown', async () => {
    const version = '0.0.0'
    core.getInput.mockReturnValueOnce(version)
    step.installStepCli.mockRejectedValueOnce('not an error')

    await run()
    expect(step.installStepCli).toHaveBeenCalled()
    expect(core.setFailed).toHaveBeenCalledTimes(0)
  })
})
