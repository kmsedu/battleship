/* global test, expect, describe */

import Cell from '../game/Cell'

test('Is a function', () => {
  expect(Cell).toBeInstanceOf(Function)
})

describe('Has correct properties', () => {
  test('Knows its co-ordinates', () => {
    expect(Cell(['A', 5]).coords).toEqual(['A', 5])
  })
  test('Knows if isAttacked and if isShipCell', () => {
    expect(Cell()).toHaveProperty('isAttacked')
    expect(Cell()).toHaveProperty('isShipCell')
  })
})
