import { getGf } from 'gf'
import { getDemo } from 'demo'

export function test() {
  const _demo = getDemo()
  const _gf = getGf()
  return '111' + _demo + _gf
}

test()