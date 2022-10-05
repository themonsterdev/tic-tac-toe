import type { tGrid, tGridPosition } from './game.types'
import { ePlayerSymbol } from './game.enums'

export const WINS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

export function isVictory(grid: tGrid, playerSymbol: ePlayerSymbol) : boolean {
    for (let i = 0; i < WINS.length; i++)
    {
        const [a, b, c] = WINS[i]

        if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c])
        {
            return grid[a] === playerSymbol
        }
    }

    return false
}

export function emptyCells(grid: tGrid) : Array<tGridPosition> {
    return grid.filter(cell => typeof cell === 'number') as Array<tGridPosition>
}

export function minimax(grid: tGrid, depth: Array<number>, isMaximizingPlayer: boolean)
{
    const _depth = depth[0]
    const maxDepth = depth[1]

    let best: Array<number> = [-1, isMaximizingPlayer ? -Infinity : Infinity]
    const available = emptyCells(grid)

    // evaluate
    if (isVictory(grid, ePlayerSymbol.X))
    {
        return [-1, 1 + _depth]
    }
    else if (isVictory(grid, ePlayerSymbol.O))
    {
        return [-1, -(1 + _depth)]
    }
    else if (_depth === maxDepth || available.length === 0)
    {
        return [-1, 0]
    }

    const playerSymbol = isMaximizingPlayer ? ePlayerSymbol.X : ePlayerSymbol.O

    for (const position of available)
    {
        // move
        const newGrid = [ ...grid ]
        newGrid[position] = playerSymbol

        // get score
        const score = minimax(newGrid, [_depth + 1, maxDepth], !isMaximizingPlayer)
        score[0] = position

        // reset
        newGrid[position] = position

        // store best score and move
        if (isMaximizingPlayer && score[1] > best[1])
        {
            best = score  // max value
        }
        else if (!isMaximizingPlayer && score[1] < best[1])
        {
            best = score  // min value
        }
    }

    // if (best[0] === -1) throw new Error('position -1')
    // if (best[1] === -1) throw new Error('best -1')

    return best
}
