import Ship from './Ship'
import Player from './Player'
import Gameboard from './Gameboard'
import domHandler from '../dom/domHandler'

const Game = (() => {
  const players = [
    Player('Player', false),
    Player('Computer', true)
  ]

  const makeShips = () => {
    const lengths = [5, 4, 3, 3, 2]

    return lengths.map((lengthValue) => Ship(lengthValue))
  }

  const placeShipsRandomly = (ships, gameboard) => {
    ships.forEach((ship) => {
      tryPlaceShip(ship, gameboard)
    })
  }

  const tryPlaceShip = (ship, gameboard) => {
    let shipPlaced = false
    while (!shipPlaced) {
      const freeCells = gameboard.unattackedCells()
      const randomFreeCell = freeCells[Math.floor(Math.random() * freeCells.length - 1)]
      const orientations = ['horizontal', 'vertical']
      const randomOrientation = orientations[Math.floor(Math.random() * orientations.length - 1)]
      try {
        gameboard.place(ship, randomFreeCell.coords, randomOrientation)
        break
      } catch {
        shipPlaced = false
      }
    }
  }

  const boards = players.map(() => Gameboard())
  const ships = players.map(() => makeShips())

  const [playerBoard, computerBoard] = boards
  const [playerShips, computerShips] = ships

  const isGameWon = () => {
    const winner = boards.find((board) => board.isAllSunk())

    return !!winner
  }

  const start = () => {
    placeShipsRandomly(playerShips, playerBoard)
    placeShipsRandomly(computerShips, computerBoard)

    domHandler.drawBoards(playerBoard, computerBoard)
  }

  return { isGameWon, start }
})()

export default Game
