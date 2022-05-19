const drawOpponentBoard = function (opponentBoard, window) {
  for (const letter of Object.values(opponentBoard.board)) {
    letter.forEach((cell) => {
      const cellDiv = document.createElement('div')
      if (cell.isShipCell && cell.isAttacked) {
        cellDiv.textContent = 'H'
      } else if (cell.isAttacked) {
        cellDiv.textContent = 'X'
      } else {
        cellDiv.textContent = ''
      }
      const [letter, number] = cell.coords
      cellDiv.id = `${letter}${number}`
      cellDiv.classList.add('enemy-cell', 'cell')
      window.append(cellDiv)
    })
  }
}

export default drawOpponentBoard
