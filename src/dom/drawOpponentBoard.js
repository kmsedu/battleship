const drawOpponentBoard = function (opponentBoard, window) {
  for (const letter of Object.values(opponentBoard.board)) {
    letter.forEach((cell) => {
      const cellDiv = document.createElement('div')
      const [letter, number] = cell.coords
      cellDiv.id = `${letter}${number}`
      cellDiv.innerText = `${letter}${number}`
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
      cellDiv.classList.add('enemy-cell', 'cell')
      window.append(cellDiv)
    })
  }
}

export default drawOpponentBoard
