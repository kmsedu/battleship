import Cell from './Cell'
import errorHandler from './errorHandler'

const Gameboard = () => {
  const board = {}
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  letters.forEach((letter) => {
    board[letter] = [...Array(10).keys()].map((number) => {
      return Cell([letter, number])
    })
  })

  const place = (...args) => {
    if (args.length === 0) throw errorHandler.noParameter
    if (args.length < 3) throw errorHandler.notEnoughParameters

    const [ship, coords, orientation] = args
    const placementCoords = []

    if (letters.indexOf(coords[0]) + ship.length > letters.length - 1 ||
        coords[1] + ship.length > 10) {
      throw errorHandler.invalidParameter
    }

    if (orientation === 'horizontal') {
      ship.positions.forEach((position) => {
        placementCoords.push([
          letters[letters.indexOf(coords[0]) + position.index],
          coords[1]
        ])
      })
    } else {
      ship.positions.forEach((position) => {
        placementCoords.push([coords[0], coords[1] + position.index])
      })
    }

    if (placementCoords.some((coords) => {
      const [letter, number] = coords
      return board[letter][number].isShipCell === true
    })) throw errorHandler.positionHit

    placementCoords.forEach((coords) => {
      const [letter, number] = coords
      ship.coords.push(coords)
      board[letter][number].isShipCell = true
    })
    ships.push(ship)
  }

  const ships = []

  const receiveAttack = (coords) => {
    if (coords === undefined) throw errorHandler.noParameter

    const [letter, number] = coords

    if (board[letter][number].isShipCell) {
      const attackedShip = ships.find((ship) => {
        return ship.coords.some((shipCoords) => {
          return shipCoords[0] === letter && shipCoords[1] === number
        })
      })

      const attackedShipCoords = attackedShip.coords.find((coords) => {
        return coords[0] === letter && coords[1] === number
      })

      const attackedShipPosition = attackedShip.coords.indexOf(attackedShipCoords)
      attackedShip.hit(attackedShipPosition)
    }

    board[letter][number].isAttacked = true
  }
  const unattackedCells = () => {
    const cells = []

    Object.values(board).forEach((letter) => letter.forEach((cell) => {
      if (!cell.isAttacked) cells.push(cell)
    }))

    return cells
  }
  const isAllSunk = () => {
    if (ships.some((ship) => !ship.isSunk())) return false

    return true
  }
  return {
    board,
    ships,
    place,
    receiveAttack,
    unattackedCells,
    isAllSunk
  }
}

export default Gameboard
