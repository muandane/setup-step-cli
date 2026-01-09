import type { request as requestType } from '@octokit/request'
import { jest } from '@jest/globals'

export const request = jest.fn<typeof requestType>()
