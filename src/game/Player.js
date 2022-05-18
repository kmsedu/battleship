import errorHandler from './errorHandler'

const Player = (...args) => {
  const [name, isComputer] = args

  if (args.length !== 2) throw errorHandler.notEnoughParameters
  if (name === undefined || isComputer === undefined) {
    throw errorHandler.noParameter
  }
  if (typeof name !== 'string' || typeof isComputer !== 'boolean') {
    throw errorHandler.invalidParameter
  }

  const turn = (gameboard, coords) => {
    if (!isComputer) {
      const [letter, number] = coords
      gameboard.receiveAttack([letter, number])
      return
    }
    const randomCell = gameboard.unattackedCells()[
      Math.floor(Math.random() * gameboard.unattackedCells().length)
    ]
    gameboard.receiveAttack(randomCell.coords)
  }

  return {
    name,
    isComputer,
    turn
  }
}

export default Player
