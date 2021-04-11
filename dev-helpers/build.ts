import { execSync } from 'child_process'
import { rmdirSync, mkdirSync, writeFileSync } from 'fs'

import { rollup, OutputOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'

import { external } from './external'
import { distPackageJson } from './dependencies'

const tsCommand = 'npm run ts'

const inputOptions = {
  input: 'src/main.ts',
  external,
  plugins: [typescript(), alias()],
}

const outputOptions: OutputOptions = {
  format: 'cjs',
  strict: false,
}

const build = async () => {
  try {
    execSync(tsCommand)
  } catch (e) {
    console.error(`tsc found an error, call '${tsCommand}' for details`)

    return
  }

  const bundle = await rollup(inputOptions)
  const { output } = await bundle.generate(outputOptions)

  rmdirSync('dist', { recursive: true })
  mkdirSync('dist')
  writeFileSync('dist/index.js', output[0].code)
  writeFileSync('dist/package.json', distPackageJson)
}

build().then()
