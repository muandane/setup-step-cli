# Setup Smallstep CLI

[![Linter](https://github.com/muandane/setup-step-cli/actions/workflows/linter.yml/badge.svg)](https://github.com/muandane/setup-step-cli/actions/workflows/linter.yml)
[![CI](https://github.com/muandane/setup-step-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/muandane/setup-step-cli/actions/workflows/ci.yml)
[![Check dist/](https://github.com/muandane/setup-step-cli/actions/workflows/check-dist.yml/badge.svg)](https://github.com/muandane/setup-step-cli/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/muandane/setup-step-cli/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/muandane/setup-step-cli/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./coverage)

- [Description](#description)
- [Action Inputs](#action-inputs)
- [Examples](#examples)
- [Development](#development)
- [Releasing](#releasing)

## Description

This action downloads a specified version of the [smallstep cli](https://smallstep.com/docs/step-cli) on supported platforms and adds the `step` command to the runner's tool-cache.

## Action Inputs

| Input name | Description                    | Required | Default value |
|------------|--------------------------------|----------|---------------|
| version    | The version of the step-cli tool to install | true | latest |

## Examples

```yaml
name: My workflow
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: muandane/setup-step-cli@v1
      with:
        version: '1.20.0'
    - name: Get Version
      run: step version
```

## Development

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 24, for instance.

Install dependencies, make changes, then build, format, lint, package, and test changes.

```bash
npm install
npm run all
```

## Releasing

This project includes a helper script, [`script/release`](./script/release) designed to streamline the process of tagging and pushing new releases for GitHub Actions.

1. Update the version in `package.json`
2. Run `npm run all` to ensure everything is built and tested
3. Run `script/release` to create and push release tags
4. Create a GitHub release with release notes

For more information about versioning your action, see [Versioning](https://github.com/actions/toolkit/blob/main/docs/action-versioning.md) in the GitHub Actions toolkit.
