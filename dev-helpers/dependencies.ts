import packageJson from '../package.json'

const { dependencies: deps } = packageJson as {
  dependencies?: Record<string, string>
}

export const dependencies = deps || {}

export const distPackageJson = JSON.stringify({ dependencies })
