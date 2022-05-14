/* global test, expect */

import testString from './testFile'

test('Jest is installed', () => {
  expect(testString).toEqual('Jest is working')
})
