import type * as ioModule from '@actions/io'
import { jest } from '@jest/globals'

export const mkdirP = jest.fn<typeof ioModule.mkdirP>()
