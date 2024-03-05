import type { Plugin } from 'vite'
import type { CommitInfo } from 'utils-metadata'

const ID = '/virtual-changelog'

export function ChangeLog(data: CommitInfo[]): Plugin {
  return {
    name: 'utils-changelog',
    resolveId(id) {
      return id === ID ? ID : null
    },
    load(id) {
      if (id !== ID)
        return null
      return `export default ${JSON.stringify(data)}`
    },
  }
}
