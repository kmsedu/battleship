import errorHandler from './errorHandler'

const Ship = (length) => {
  const MAX_SHIP_LENGTH = 5
  errorHandler.checkParameter(length, MAX_SHIP_LENGTH)

  const positions = [...Array(length).keys()].map((index) => {
    return {
      index,
      hit: false
    }
  })

  const hit = (position) => {
    errorHandler.checkParameter(position, length)
    if (positions[position].hit === true) throw errorHandler.positionHit

    positions[position].hit = true
  }

  const isSunk = () => {
    if (positions.some((position) => position.hit !== true)) return false

    return true
  }

  const coords = []

  return { length, positions, hit, isSunk, coords }
}

export default Ship
