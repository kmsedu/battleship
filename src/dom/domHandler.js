import drawBoard from './drawBoard'

const domHandler = {
  playerWindow: document.querySelector('.player-window'),
  opponentWindow: document.querySelector('.opponent-window'),
  drawBoards (playerBoard, opponentBoard) {
    drawBoard(playerBoard, this.playerWindow)
    drawBoard(opponentBoard, this.opponentWindow)
  }
}

export default domHandler
