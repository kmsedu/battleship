import Game from '../game/Game'

const drawBoard = function (gameboard, window) {
  for (const letter of Object.values(gameboard.board)) {
    letter.forEach((cell) => {
      const cellDiv = document.createElement('div')
      if (cell.isShipCell && cell.isAttacked) {
        cellDiv.textContent = 'H'
      } else if (cell.isAttacked) {
        cellDiv.textContent = 'X'
      } else if (cell.isShipCell) {
        cellDiv.textContent = '+'
      } else {
        cellDiv.textContent = '-'
      }
      cellDiv.classList.add('cell')
      cellDiv.addEventListener('click', () => {
        if (Game.isGameWon() === false) {
          gameboard.receiveAttack(cell.coords)
          window.innerHTML = ''
          drawBoard(gameboard, window)
        }
        if (Game.isGameWon()) console.log('Game is over!')
      })
      window.append(cellDiv)
    })
  }
}

export default drawBoard
