const MAX_SHIP_LENGTH = 5

const noParameterError = Error('No parameter')
const invalidParameterError = Error('Invalid parameter')
const positionHitError = Error('Position already hit')

const checkParameter = (...args) => {
  const [parameter, maxLength] = args
  if (parameter === undefined) throw noParameterError
  if (
    parameter < 0 ||
    parameter > maxLength ||
    typeof parameter !== 'number' ||
    Number.isNaN(parameter)
  ) throw invalidParameterError
}

const Ship = (length) => {
  checkParameter(length, MAX_SHIP_LENGTH)

  const positions = [...Array(length).keys()].map((index) => {
    return {
      position: index,
      hit: false
    }
  })

  const hit = (position) => {
    checkParameter(position, length)
    if (positions[position].hit === true) throw positionHitError

    positions[position].hit = true
  }

  const isSunk = () => {
    if (positions.some((position) => position.hit !== true)) return false

    return true
  }

  return { length, positions, hit, isSunk }
}

export default Ship
