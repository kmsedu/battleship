const drawPlayerBoard = function (gameboard, window) {
  for (const letter of Object.values(gameboard.board)) {
    letter.forEach((cell) => {
      const cellDiv = document.createElement('div')
      if (cell.isShipCell && cell.isAttacked) {
        cellDiv.textContent = 'H'
      } else if (cell.isAttacked) {
        cellDiv.textContent = 'X'
      } else if (cell.isShipCell) {
        cellDiv.textContent = '#'
      } else {
        cellDiv.textContent = ''
      }
      cellDiv.classList.add('cell')
      window.append(cellDiv)
    })
  }
}

export default drawPlayerBoard
