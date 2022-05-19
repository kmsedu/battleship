const drawPlayerBoard = function (gameboard, window) {
  for (const letter of Object.values(gameboard.board)) {
    letter.forEach((cell) => {
      const cellDiv = document.createElement('div')
      if (cell.isShipCell && cell.isAttacked) {
        cellDiv.classList.value = ''
        cellDiv.classList.add('hit-ship')
      } else if (cell.isAttacked) {
        cellDiv.classList.value = ''
        cellDiv.classList.add('missed')
      } else {
        cellDiv.classList.value = ''
        cellDiv.classList.add('empty')
      }
      const [letter, number] = cell.coords
      cellDiv.id = `${letter}${number}`
      cellDiv.classList.add('cell')
      window.append(cellDiv)
    })
  }
}

export default drawPlayerBoard
