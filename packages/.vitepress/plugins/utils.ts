import { reactify } from 'utils-core'
import YAML from 'js-yaml'

export const stringify = reactify(
  (input: any) => YAML.dump(input, {
    skipInvalid: true,
    forceQuotes: true,
    condenseFlow: true,
    noCompatMode: true,
    quotingType: '\'',
  }),
)
