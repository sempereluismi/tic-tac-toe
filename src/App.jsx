import confetti from "canvas-confetti"
import { useState } from "react"

import { Board } from "./components/Board.jsx"
import { PuntuationBoard } from "./components/PuntuationBoard.jsx"
import { ResetPoints } from "./components/ResetPoints.jsx"
import { WinnerModal } from "./components/WinnerModal.jsx"

import { TURNS } from "./constants.js"
import { checkEndGame, checkWinner, getNewTurn } from "./logic/board.js"
import { removeGameStorage, removePointsStorage, saveGameToStorage, savePoinstToStorage } from './logic/storage/index.js'

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) // null no hay ganador, false empate
  const [points, setPoints] = useState(() => {
    const pointsFromStorage = window.localStorage.getItem('points')
    return pointsFromStorage ? JSON.parse(pointsFromStorage) : {x: 0, o: 0}
  })

  const [initTurn, setInitTurn] = useState(TURNS.X)


  const updateBoard = (index) => {

    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = getNewTurn(turn)
    setTurn(newTurn)

    saveGameToStorage(newBoard, newTurn)

    const newWinner = checkWinner(newBoard)

    if(newWinner) {
      confetti()
      setWinner(newWinner)

      const newPoints = (newWinner === TURNS.X) ? {x: points.x+1, o: points.o} : {x: points.x, o: points.o+1}
      setPoints(newPoints)
      savePoinstToStorage(newPoints)  
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    const newInitTurn = initTurn === TURNS.X ? TURNS.O : TURNS.X
    setInitTurn(newInitTurn)
    setTurn(newInitTurn)
    setWinner(null)

    removeGameStorage()
  }

  const resetPoints = () => {
    setPoints({x: 0, o: 0})
    removePointsStorage()
  }
  
  return(
    <main className="board">

      <ResetPoints resetPoints={resetPoints}/>
      <PuntuationBoard points={points} turn={turn}/>

      <h1>Tic Tac Toe</h1>
      <Board updateBoard={updateBoard} board={board} />

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>

  )
}

export default App
