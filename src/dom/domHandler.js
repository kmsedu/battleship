import drawOpponentBoard from './drawOpponentBoard'
import drawPlayerBoard from './drawPlayerBoard'
import Game from '../game/Game'

const domHandler = {
  playerWindow: document.querySelector('.player-window'),
  opponentWindow: document.querySelector('.opponent-window'),
  drawBoards () {
    drawPlayerBoard(Game.boards[0], this.playerWindow)
    drawOpponentBoard(Game.boards[1], this.opponentWindow)
  },
  listenForAttack (opponentBoard) {
    const cellDivs = [...document.querySelectorAll('.enemy-cell')]
    for (const cellDiv of cellDivs) {
      cellDiv.addEventListener('click', () => {
        if (!Game.isGameWon() && cellDiv.textContent === '') {
          const cellCoords = [cellDiv.id[0], Number(cellDiv.id[1])]
          opponentBoard.receiveAttack(cellCoords)

          this.opponentWindow.textContent = ''
          drawOpponentBoard(opponentBoard, this.opponentWindow)
          this.listenForAttack(opponentBoard)

          const playerBoard = Game.boards[0]
          const randomIndex = Math.floor(Math.random() * playerBoard.unattackedCells().length)
          const randomCoord = playerBoard.unattackedCells()[randomIndex]

          Game.players[1].turn(playerBoard, randomCoord)
          this.playerWindow.textContent = ''
          drawPlayerBoard(Game.boards[0], this.playerWindow)
        }
        if (Game.isGameWon()) console.log('Game over! ')
      })
    }
  }
}

export default domHandler
