const cells = document.querySelectorAll('.cell');
const tittleHeader = document.querySelector('#tilte_header')
const xPlayerDisplay = document.querySelector('#xPlayerDispaly');
const oPlayerDisplay = document.querySelector('#oPlayerDisplay');
const restartBtn = document.querySelector('#restart_btn');

////////TODO: Initialize variables for the game//////////
let player = 'X';
let gamePause = false;
let gameStart = false;

////////TODO: Array tracking for each cells ///////////
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '']

////////TODO:  Array For Win  Conditions  //////////// 
const winConditions = [
   [0, 1, 2], [3, 4, 5], [6, 7, 8], //? Rows
   [0, 3, 6], [1, 4 ,7], [2, 5, 8], //? Columns
   [0, 4, 8], [2, 4, 6]            //? Diaganals
]                 

////////TODO: click addEventListener to each cell ////// 
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => tapCell(cell, index))
})

////////TODO: Ensure cell is empty & game isn't pause ///
function tapCell(cell, index) {
    if (cell.textContent == '' &&
        !gamePause
    ){
      gameStart = true
      updateCell(cell, index)

    //////*: pick randomly if there are no results ///////
      if (!checkWinner()) {
          changePlayer()
      }
    }
}

function updateCell(cell, index){
  cell.textContent = player
  inputCells[index] = player
  cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}
////////TODO:  1  By  1  Player  //////////
function changePlayer() {
  player = (player == 'X') ? 'O' : 'X'
}

function checkWinner() {
   for (const [a, b, c] of winConditions) {
    //////*: Check each winnig conditions //////
      if (inputCells[a] == player &&
          inputCells[b] == player &&
          inputCells[c] == player 
      ) {
        declarWinner([a, b, c])
        return true
      }
   }

   //////TODO: check for draw (if all cells are filled)
   if (inputCells.every(cell => cell != '')) {
    declareDraw()
    return true
   }
}

function declarWinner(winningIndices) {
  tittleHeader.textContent = `${player} Win`
  gamePause = true
   
  ////* Highlight winning cells /////
  winningIndices.forEach((index) => 
     cells[index].style.background = '#2A2343'
   )

   restartBtn.style.visibility = 'visible'
}

function declareDraw() {
  tittleHeader.textContent = 'Draw!'
  gamePause = true
  restartBtn.style.visibility = 'visible'
}

function choosePlayer(selectedPlayer) {
  ////////TODO: Ensure that the game isn't started ///////
  if (!gamePause) {
    ////? Override the selected player value /////
    player = selectedPlayer
    if (player == 'X') {
      //////* Highlight X Display ///////
      xPlayerDisplay.classList.add('player-active')
      oPlayerDisplay.classList.remove('player-active')
    } else {
      //////* Highlight O Dispaly ///////
      xPlayerDisplay.classList.remove('player-active')
      oPlayerDisplay.classList.add('player-active')
    }
  }
  
}

restartBtn.addEventListener('click', () => {
  restartBtn.style.visibility = 'visible'
  inputCells.fill('')
  cells.forEach(cell => {
    cell.textContent = ''
    cell.style.background = ''
  })
  gamePause = false
  gameStart = false
  tittleHeader.textContent = 'Choose'
})

