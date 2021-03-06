import drawOpponentBoard from './drawOpponentBoard'
import drawPlayerBoard from './drawPlayerBoard'
import Game from '../game/Game'

const domHandler = {
  gameWindow: document.querySelector('.game-window'),
  playerWindow: document.querySelector('.player-window'),
  opponentWindow: document.querySelector('.opponent-window'),
  playerBoard () {
    return Game.boards[0]
  },
  opponentBoard () {
    return Game.boards[1]
  },
  drawBoards () {
    drawPlayerBoard(Game.boards[0], this.playerWindow)
    drawOpponentBoard(Game.boards[1], this.opponentWindow)
  },
  listenForAttack () {
    const cellDivs = [...document.querySelectorAll('.enemy-cell')]
    for (const cellDiv of cellDivs) {
      cellDiv.addEventListener('click', () => {
        if (!Game.isGameWon() && cellDiv.classList.contains('empty')) {
          const cellCoords = [cellDiv.id[0], Number(cellDiv.id[1])]
          this.opponentBoard().receiveAttack(cellCoords)

          this.opponentWindow.textContent = ''
          drawOpponentBoard(this.opponentBoard(), this.opponentWindow)
          this.listenForAttack()

          const randomIndex = Math.floor(
            Math.random() * this.playerBoard().unattackedCells().length
          )
          const randomCoord = this.playerBoard().unattackedCells()[randomIndex]

          Game.players[1].turn(this.playerBoard(), randomCoord)
          this.playerWindow.textContent = ''
          drawPlayerBoard(Game.boards[0], this.playerWindow)
        }
        if (Game.isGameWon()) this.showWinnerMessage()
      })
    }
  },
  waitForPlayerPlacement () {
    const playerCells = [...this.playerWindow.querySelectorAll('.cell')]
    const orientationSwitch = document.querySelector('.orientation-switch')
    let isVertical
    orientationSwitch.textContent === 'Horizontal'
      ? isVertical = false
      : isVertical = true
    orientationSwitch.addEventListener('click', () => {
      if (!isVertical) {
        isVertical = true
        orientationSwitch.textContent = 'Vertical'
        return null
      }
      isVertical = false
      orientationSwitch.textContent = 'Horizontal'
    })
    for (const cell of playerCells) {
      cell.addEventListener('click', () => {
        if (Game.playerShips.length > 0) {
          const cellCoords = [cell.id[0], Number(cell.id[1])]
          let orientation
          isVertical ? orientation = 'vertical' : orientation = 'horizontal'

          this.playerBoard().place(Game.playerShips[0], cellCoords, orientation)
          Game.playerShips.shift()

          this.playerWindow.textContent = ''
          drawPlayerBoard(this.playerBoard(), this.playerWindow)
          this.waitForPlayerPlacement()
        }

        if (Game.playerShips.length === 0) {
          this.gameWindow.style.gridTemplateColumns = '1fr 1fr'
          this.toggleOpponentBoard()
          this.hideMessageDisplay()
          this.toggleOrientationSwitch()
          this.listenForAttack()
        }
      })
    }
  },
  toggleOrientationSwitch () {
    const orientationSwitch = document.querySelector('.orientation-switch')

    orientationSwitch.classList.toggle('hidden')
  },
  handleNewGamePress () {
    const newGameButton = document.querySelector('.new-game-button')

    newGameButton.addEventListener('click', () => {
      document.location.reload()
    })
  },
  hideMessageDisplay () {
    const messageDisplay = document.querySelector('.message-display')
    messageDisplay.innerText = ''
  },
  showWinnerMessage () {
    const messageDisplay = document.querySelector('.message-display')
    const winner = Game.players.find((player, index) => {
      return !Game.boards[index].isAllSunk()
    })
    if (!winner.isComputer) {
      messageDisplay.innerText = 'Game over, you win!'
      return null
    }
    messageDisplay.innerText = 'Game over, you lost!'
  },
  toggleOpponentBoard () {
    this.opponentWindow.classList.toggle('hidden')
  }
}

export default domHandler
