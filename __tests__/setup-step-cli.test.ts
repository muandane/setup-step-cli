/**
 * Unit tests for setup-step-cli.ts
 */
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import * as exec from '../__fixtures__/exec.js'
import * as io from '../__fixtures__/io.js'
import * as tc from '../__fixtures__/tool-cache.js'
import { request } from '../__fixtures__/octokit-request.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('@actions/exec', () => exec)
jest.unstable_mockModule('@actions/io', () => io)
jest.unstable_mockModule('@actions/tool-cache', () => tc)
jest.unstable_mockModule('@octokit/request', () => ({ request }))

// The module being tested should be imported dynamically.
const { installStepCli } = await import('../src/setup-step-cli.js')

describe('setup-step-cli.ts', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should succeed with latest version', async () => {
    const version = 'latest'

    // Mock octokit response for latest release
    request.mockResolvedValueOnce({
      data: {
        tag_name: 'v9999.99.99'
      }
    } as never)

    // Mock os and platform specific to this test
    Object.defineProperty(process, 'platform', {
      value: 'linux',
      configurable: true
    })
    Object.defineProperty(process, 'arch', {
      value: 'x64',
      configurable: true
    })

    // Mock tools-cache functions return values
    tc.downloadTool.mockResolvedValueOnce('step.tar.gz')
    tc.extractTar.mockResolvedValueOnce('step')
    tc.cacheDir.mockResolvedValueOnce('step')
    tc.findAllVersions.mockReturnValueOnce(['9999.99.99'])

    // Run function and validate steps
    await installStepCli(version)
    expect(io.mkdirP).toHaveBeenCalledWith('step')
    expect(tc.downloadTool).toHaveBeenCalledWith(
      'https://github.com/smallstep/cli/releases/download/v9999.99.99/step_linux_9999.99.99_amd64.tar.gz'
    )
    expect(tc.extractTar).toHaveBeenCalledWith('step.tar.gz', 'step', [
      'xz',
      '--strip-components=1'
    ])
    expect(tc.cacheDir).toHaveBeenCalledWith('step', 'step', '9999.99.99')
    expect(core.addPath).toHaveBeenCalledWith('step/bin')
    expect(exec.exec).toHaveBeenCalledWith('step', ['version'])
  })

  it('should succeed on linux x64', async () => {
    const version = '0.0.0'

    // Mock os and platform specific to this test
    Object.defineProperty(process, 'platform', {
      value: 'linux',
      configurable: true
    })
    Object.defineProperty(process, 'arch', {
      value: 'x64',
      configurable: true
    })

    // Mock tools-cache functions return values
    tc.downloadTool.mockResolvedValueOnce('step.tar.gz')
    tc.extractTar.mockResolvedValueOnce('step')
    tc.cacheDir.mockResolvedValueOnce('step')
    tc.findAllVersions.mockReturnValueOnce(['0.0.0'])

    // Run function and validate steps
    await installStepCli(version)
    expect(io.mkdirP).toHaveBeenCalledWith('step')
    expect(tc.downloadTool).toHaveBeenCalledWith(
      'https://github.com/smallstep/cli/releases/download/v0.0.0/step_linux_0.0.0_amd64.tar.gz'
    )
    expect(tc.extractTar).toHaveBeenCalledWith('step.tar.gz', 'step', [
      'xz',
      '--strip-components=1'
    ])
    expect(tc.cacheDir).toHaveBeenCalledWith('step', 'step', version)
    expect(core.addPath).toHaveBeenCalledWith('step/bin')
    expect(exec.exec).toHaveBeenCalledWith('step', ['version'])
  })

  it('should succeed on linux arm64', async () => {
    const version = '0.0.0'

    // Mock os and platform specific to this test
    Object.defineProperty(process, 'platform', {
      value: 'linux',
      configurable: true
    })
    Object.defineProperty(process, 'arch', {
      value: 'arm64',
      configurable: true
    })

    // Mock tools-cache functions return values
    tc.downloadTool.mockResolvedValueOnce('step.tar.gz')
    tc.extractTar.mockResolvedValueOnce('step')
    tc.cacheDir.mockResolvedValueOnce('step')
    tc.findAllVersions.mockReturnValueOnce(['0.0.0'])

    // Run function and validate steps
    await installStepCli(version)
    expect(io.mkdirP).toHaveBeenCalledWith('step')
    expect(tc.downloadTool).toHaveBeenCalledWith(
      'https://github.com/smallstep/cli/releases/download/v0.0.0/step_linux_0.0.0_arm64.tar.gz'
    )
    expect(tc.extractTar).toHaveBeenCalledWith('step.tar.gz', 'step', [
      'xz',
      '--strip-components=1'
    ])
    expect(tc.cacheDir).toHaveBeenCalledWith('step', 'step', version)
    expect(core.addPath).toHaveBeenCalledWith('step/bin')
    expect(exec.exec).toHaveBeenCalledWith('step', ['version'])
  })

  it('should succeed on darwin x64', async () => {
    const version = '0.0.0'

    // Mock os and platform specific to this test
    Object.defineProperty(process, 'platform', {
      value: 'darwin',
      configurable: true
    })
    Object.defineProperty(process, 'arch', {
      value: 'x64',
      configurable: true
    })

    // Mock tools-cache functions return values
    tc.downloadTool.mockResolvedValueOnce('step.tar.gz')
    tc.extractTar.mockResolvedValueOnce('step')
    tc.cacheDir.mockResolvedValueOnce('step')
    tc.findAllVersions.mockReturnValueOnce(['0.0.0'])

    // Run function and validate steps
    await installStepCli(version)
    expect(io.mkdirP).toHaveBeenCalledWith('step')
    expect(tc.downloadTool).toHaveBeenCalledWith(
      'https://github.com/smallstep/cli/releases/download/v0.0.0/step_darwin_0.0.0_amd64.tar.gz'
    )
    expect(tc.extractTar).toHaveBeenCalledWith('step.tar.gz', 'step', [
      'xz',
      '--strip-components=1'
    ])
    expect(tc.cacheDir).toHaveBeenCalledWith('step', 'step', version)
    expect(core.addPath).toHaveBeenCalledWith('step/bin')
    expect(exec.exec).toHaveBeenCalledWith('step', ['version'])
  })

  it('should succeed on windows x64', async () => {
    const version = '0.0.0'

    // Mock os and platform specific to this test
    Object.defineProperty(process, 'platform', {
      value: 'win32',
      configurable: true
    })
    Object.defineProperty(process, 'arch', {
      value: 'x64',
      configurable: true
    })

    // Mock tools-cache functions return values
    tc.downloadTool.mockResolvedValueOnce('step.zip')
    tc.extractTar.mockResolvedValueOnce('step')
    tc.cacheDir.mockResolvedValueOnce('step')
    tc.findAllVersions.mockReturnValueOnce(['0.0.0'])

    // Run function and validate steps
    await installStepCli(version)
    expect(io.mkdirP).toHaveBeenCalledWith('step')
    expect(tc.downloadTool).toHaveBeenCalledWith(
      'https://github.com/smallstep/cli/releases/download/v0.0.0/step_windows_0.0.0_amd64.zip'
    )
    expect(tc.extractTar).toHaveBeenCalledWith('step.zip', 'step', [
      'xz',
      '--strip-components=1'
    ])
    expect(tc.cacheDir).toHaveBeenCalledWith('step', 'step', version)
    expect(core.addPath).toHaveBeenCalledWith('step/bin')
    expect(exec.exec).toHaveBeenCalledWith('step', ['version'])
  })

  it('should fail on unsupported platform', async () => {
    const version = '0.0.0'

    // Mock os and platform specific to this test
    Object.defineProperty(process, 'platform', {
      value: 'fakePlatform',
      configurable: true
    })
    Object.defineProperty(process, 'arch', {
      value: 'x64',
      configurable: true
    })

    // Run function and validate steps
    await expect(installStepCli(version)).rejects.toEqual(
      Error('The platform fakePlatform is not supported by this action')
    )
    expect(io.mkdirP).toHaveBeenCalledTimes(0)
    expect(tc.downloadTool).toHaveBeenCalledTimes(0)
    expect(tc.extractTar).toHaveBeenCalledTimes(0)
    expect(tc.cacheDir).toHaveBeenCalledTimes(0)
    expect(core.addPath).toHaveBeenCalledTimes(0)
    expect(exec.exec).toHaveBeenCalledTimes(0)
  })

  it('should fail on unsupported architecture', async () => {
    const version = '0.0.0'

    // Mock os and platform specific to this test
    Object.defineProperty(process, 'platform', {
      value: 'linux',
      configurable: true
    })
    Object.defineProperty(process, 'arch', {
      value: 'fakeArch',
      configurable: true
    })

    // Run function and validate steps
    await expect(installStepCli(version)).rejects.toEqual(
      Error('The architecture fakeArch is not supported by this action')
    )
    expect(io.mkdirP).toHaveBeenCalledTimes(0)
    expect(tc.downloadTool).toHaveBeenCalledTimes(0)
    expect(tc.extractTar).toHaveBeenCalledTimes(0)
    expect(tc.cacheDir).toHaveBeenCalledTimes(0)
    expect(core.addPath).toHaveBeenCalledTimes(0)
    expect(exec.exec).toHaveBeenCalledTimes(0)
  })
})
