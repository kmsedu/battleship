/* global test, expect, describe, beforeEach */

import Ship from '../game/Ship'
import Gameboard from '../game/Gameboard'

test('Is a function', () => {
  expect(Gameboard).toBeInstanceOf(Function)
})

test('Returns an object', () => {
  expect(Gameboard()).toBeInstanceOf(Object)
})

describe('Has the correct properties', () => {
  test('Gameboard.board', () => {
    expect(Gameboard()).toHaveProperty('board')
  })
  test('Gameboard.ships', () => {
    expect(Gameboard()).toHaveProperty('ships')
  })
  test('Gameboard.place', () => {
    expect(Gameboard()).toHaveProperty('place')
  })
  test('Gameboard.receiveAttack', () => {
    expect(Gameboard()).toHaveProperty('receiveAttack')
  })
})

describe('Gameboard.board', () => {
  test('Is an object', () => {
    expect(Gameboard().board).toBeInstanceOf(Object)
  })
  test('Has correct keys', () => {
    const expectedProperties = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    for (const prop of expectedProperties) {
      expect(Gameboard().board).toHaveProperty(prop)
    }
  })
  test('All keys contain an array', () => {
    for (const value of Object.values(Gameboard().board)) {
      expect(value).toBeInstanceOf(Array)
    }
  })
  test('Each array has a length of 10', () => {
    for (const value of Object.values(Gameboard().board)) {
      expect(value.length).toEqual(10)
    }
  })
  test('All array elements are Cells', () => {
    for (const value of Object.values(Gameboard().board)) {
      value.forEach((cell) => {
        expect(cell).toHaveProperty('coords')
        expect(cell).toHaveProperty('isAttacked')
        expect(cell).toHaveProperty('isShipCell')
      })
    }
  })
})

describe('Gameboard.place', () => {
  test('Is a function', () => {
    expect(Gameboard().place).toBeInstanceOf(Function)
  })
  describe('Has two parameters', () => {
    test('Fails when none', () => {
      expect(() => Gameboard().place()).toThrow()
    })
    test('Fails when only one', () => {
      expect(() => Gameboard().place(1)).toThrow()
    })
  })
  describe('Can place ships', () => {
    let testShip, testBoard
    beforeEach(() => {
      testShip = Ship(5)
      testBoard = Gameboard()
    })
    test('Horizontally', () => {
      testBoard.place(testShip, ['A', 1], 'horizontal')
      expect(testBoard.board.A[1].isShipCell).toBe(true)
      expect(testBoard.board.B[1].isShipCell).toBe(true)
      expect(() => testBoard.place(testShip, ['A', 1], 'horizontal')).toThrow()
    })
    test('Vertically', () => {
      testBoard.place(testShip, ['A', 1], 'vertical')
      expect(testBoard.board.A[1].isShipCell).toBe(true)
      expect(testBoard.board.A[2].isShipCell).toBe(true)
      expect(testBoard.board.B[1].isShipCell).toBe(false)
    })
  })
})

describe('Gameboard.ships', () => {
  test('Is an Array', () => {
    expect(Gameboard().ships).toBeInstanceOf(Array)
  })
  test('Contains ships', () => {
    const testShip = Ship(5)
    const testBoard = Gameboard()
    testBoard.place(testShip, ['A', 5], 'horizontal')
    expect(testBoard.ships).toContain(testShip)
  })
})

describe('Gameboard.receiveAttack', () => {
  test('Is a function', () => {
    expect(Gameboard().receiveAttack).toBeInstanceOf(Function)
  })
  test('Takes a parameter', () => {
    expect(() => Gameboard().receiveAttack()).toThrow()
  })
  test('Sets cell to attacked', () => {
    const testBoard = Gameboard()
    testBoard.receiveAttack(['A', 1])
    expect(testBoard.board.A[1].isAttacked).toBe(true)
  })
  test('Sets ship position to hit', () => {
    const testBoard = Gameboard()
    const testShip = Ship(5)
    testBoard.place(testShip, ['A', 1], 'vertical')
    testBoard.receiveAttack(['A', 3])
    expect(testShip.positions[2].hit).toBe(true)
  })
})
