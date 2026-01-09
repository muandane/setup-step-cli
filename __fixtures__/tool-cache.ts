import type * as tcModule from '@actions/tool-cache'
import { jest } from '@jest/globals'

export const downloadTool = jest.fn<typeof tcModule.downloadTool>()
export const extractTar = jest.fn<typeof tcModule.extractTar>()
export const cacheDir = jest.fn<typeof tcModule.cacheDir>()
export const findAllVersions = jest.fn<typeof tcModule.findAllVersions>()
