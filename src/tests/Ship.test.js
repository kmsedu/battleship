/* global test, expect, describe */

import Ship from '../game/Ship'

describe('Ship()', () => {
  test('Is a function', () => {
    expect(Ship).toBeInstanceOf(Function)
  })

  test('Returns an object', () => {
    expect(Ship(5)).toBeInstanceOf(Object)
  })

  describe('Needs valid parameter', () => {
    test('Fails if no parameter', () => {
      expect(() => Ship()).toThrow('No parameter')
    })
    test('Fails if parameter is negative', () => {
      expect(() => Ship(-1)).toThrow('Invalid parameter')
    })
    test('Fails if parameter is larger than MAX_SHIP_LENGTH', () => {
      expect(() => Ship(6)).toThrow('Invalid parameter')
    })
    test('Fails if parameter is not a number', () => {
      expect(() => Ship('A')).toThrow('Invalid parameter')
      expect(() => Ship(null)).toThrow('Invalid parameter')
      expect(() => Ship(NaN)).toThrow('Invalid parameter')
    })
  })

  describe('Needs correct properties', () => {
    const testShip = Ship(1)
    test('length', () => {
      expect(testShip).toHaveProperty('length')
    })
    test('positions', () => {
      expect(testShip).toHaveProperty('positions')
    })
    test('hit', () => {
      expect(testShip).toHaveProperty('hit')
    })
    test('isSunk', () => {
      expect(testShip).toHaveProperty('isSunk')
    })
  })
})

describe('Ship().positions', () => {
  const testShip = Ship(5)
  test('Returns an Array', () => {
    expect(testShip.positions).toBeInstanceOf(Array)
  })
  test('Lists the positions', () => {
    expect(testShip.positions).toEqual(
      [
        { position: 0, hit: false },
        { position: 1, hit: false },
        { position: 2, hit: false },
        { position: 3, hit: false },
        { position: 4, hit: false }
      ]
    )
  })
})

describe('Ship().hit', () => {
  const testShip = Ship(5)
  test('Is a function', () => {
    expect(() => testShip.hit).toBeInstanceOf(Function)
  })
  describe('Needs valid parameter', () => {
    test('Requires a parameter', () => {
      expect(() => testShip.hit()).toThrow('No parameter')
    })
    test('Fails if negative', () => {
      expect(() => testShip.hit(-1)).toThrow('Invalid parameter')
    })
    test('Fails if larger than the ship length', () => {
      expect(() => testShip.hit(6)).toThrow('Invalid parameter')
    })
    test('Fails if not a number', () => {
      expect(() => testShip.hit(NaN)).toThrow('Invalid parameter')
      expect(() => testShip.hit('A')).toThrow('Invalid parameter')
      expect(() => testShip.hit(true)).toThrow('Invalid parameter')
    })
  })
  test('Sets the position as hit', () => {
    testShip.hit(3)
    expect(testShip.positions).toEqual(
      [
        { position: 0, hit: false },
        { position: 1, hit: false },
        { position: 2, hit: false },
        { position: 3, hit: true },
        { position: 4, hit: false }
      ]
    )
  })
  test('Fails on already hit position', () => {
    expect(() => testShip.hit(3)).toThrow('Position already hit')
  })
})

describe('Ship.isSunk()', () => {
  const testShip = Ship(5)
  test('Is a function', () => {
    expect(testShip.isSunk).toBeInstanceOf(Function)
  })
  test('Returns a boolean', () => {
    expect(typeof testShip.isSunk() === 'boolean').toBe(true)
  })
  test('Returns false if any positions are not hit', () => {
    testShip.hit(0)
    testShip.hit(1)
    testShip.hit(2)
    testShip.hit(3)
    expect(testShip.isSunk()).toBe(false)
  })
  test('Returns true if all positions are hit', () => {
    testShip.hit(4)
    expect(testShip.isSunk()).toBe(true)
  })
})
