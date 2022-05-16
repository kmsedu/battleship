const errorHandler = {
  noParameter: Error('No parameter'),
  invalidParameter: Error('Invalid parameter'),
  notEnoughParameters: Error('Not enough parameters'),
  positionHit: Error('Position already hit'),
  checkParameter (...args) {
    const [parameter, maxLength] = args
    if (parameter === undefined) throw errorHandler.noParameter
    if (
      parameter < 0 ||
      parameter > maxLength ||
      typeof parameter !== 'number' ||
      Number.isNaN(parameter)
    ) throw errorHandler.invalidParameter
  }
}

export default errorHandler
