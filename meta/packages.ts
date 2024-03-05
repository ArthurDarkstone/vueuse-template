import type { PackageManifest } from 'utils-metadata'

export const packages: PackageManifest[] = [
  {
    name: 'metadata',
    display: 'Metadata for xx utils functions',
    manualImport: true,
    iife: false,
    utils: true,
    target: 'node14',
  },
  {
    name: 'core',
    display: 'core utilities',
  },
  {
    name: 'vue',
    display: 'vue',
    description: 'Collection of essential Vue Composition Utilities',
  },
  {
    name: 'components',
    display: 'Components',
    description: 'Renderless components for xx chain tools',
    author: 'ArthurDarkstone<https://github.com/ArthurDarkstone/>',
    external: [
      'utils-vue',
      'utils-core',
    ],
  },
]
