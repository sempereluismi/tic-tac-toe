export const saveGameToStorage = (board, turn) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const removeGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export const savePoinstToStorage = (points) => {
    window.localStorage.setItem('points', JSON.stringify(points))
}

export const removePointsStorage = () => {
    window.localStorage.removeItem('points')
}