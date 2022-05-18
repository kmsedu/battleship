/* global test, expect, describe, beforeEach */

import Player from '../game/Player'
import Gameboard from '../game/Gameboard'

let testPlayer
beforeEach(() => {
  testPlayer = Player('Test', false)
})
test('Is a function', () => {
  expect(Player).toBeInstanceOf(Function)
})

describe('Has correct parameters', () => {
  test('Needs two parameters', () => {
    expect(() => Player(3)).toThrow()
    expect(() => Player('A')).toThrow()
    expect(() => Player(true)).toThrow()
    expect(() => Player(null)).toThrow()
    expect(() => Player(undefined)).toThrow()
    expect(() => Player('A', true, 'B')).toThrow()
  })
  test('name parameter is a string', () => {
    expect(() => Player(2, true)).toThrow()
    expect(() => Player(null, true)).toThrow()
    expect(() => Player(undefined, true)).toThrow()
    expect(() => Player([], true)).toThrow()
  })
  test('isComputer parameter is a boolean', () => {
    expect(() => Player('Test', 0)).toThrow()
    expect(() => Player('Test', 'Test')).toThrow()
    expect(() => Player('Test', null)).toThrow()
    expect(() => Player('Test', [])).toThrow()
  })
  test('Does not throw when given a correct parameter', () => {
    expect(() => Player('Test', true)).not.toThrow()
  })
})

describe('Returns an object with correct properties', () => {
  test('Returns an object', () => {
    expect(testPlayer).toBeInstanceOf(Object)
  })
  test('Has name property', () => {
    expect(testPlayer).toHaveProperty('name')
  })
  test('Has isComputer property', () => {
    expect(testPlayer).toHaveProperty('isComputer')
  })
  test('Has turn method', () => {
    expect(testPlayer).toHaveProperty('turn')
  })
})

describe('Player.turn', () => {
  test('Is a function', () => {
    expect(testPlayer.turn).toBeInstanceOf(Function)
  })
  test('Attacks the Gameboard', () => {
    const testBoard = Gameboard()
    testPlayer.turn(testBoard, ['A', 2])
    expect(testBoard.board.A[2].isAttacked).toBe(true)
  })
  test('Attacks a cell randomly if player is a computer', () => {
    const testBoard = Gameboard()
    const testPcPlayer = Player('PC', true)
    testPcPlayer.turn(testBoard)
    // Board starts with 100 unattacked cells,
    // will be 99 if one has been randomly attacked.
    expect(testBoard.unattackedCells().length).toEqual(99)
  })
})
