import { WINNER_COMBOS, TURNS } from "../constants"

export const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
}

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}

export const getNewTurn = (oldTurn) => {
  return oldTurn === TURNS.X ? TURNS.O : TURNS.X
}