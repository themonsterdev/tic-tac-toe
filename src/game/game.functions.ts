import type { tWins, tGrid, tGridPositionEmpty } from './game.types'
import { ePlayerSymbol } from './game.enums'
import store from "./store";

export const WINS: tWins = [
    [0, 1, 2], // Horizontal
    [3, 4, 5], // Horizontal
    [6, 7, 8], // Horizontal

    [0, 3, 6], // Vertical
    [1, 4, 7], // Vertical
    [2, 5, 8], // Vertical

    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
]

/**
 * This function tests if a specific player wins.
 *
 * @param grid The state of the current board
 * @param playerSymbol A X or a O
 * @return True if the player wins
 */
export function wins(grid: tGrid, playerSymbol: ePlayerSymbol) : boolean {
    for (let i = 0; i < WINS.length; i++)
    {
        const [a, b, c] = WINS[i]

        if (typeof grid[a] !== 'number' && grid[a] === grid[b] && grid[b] === grid[c])
        {
            return grid[a] === playerSymbol
        }
    }

    return false
}

/**
 * Each empty cell will be added into cells' list
 *
 * @param grid The state of the current board
 * @return A list of empty cells
 */
export function emptyCells(grid: tGrid) : tGridPositionEmpty {
    return grid.filter(cell => typeof cell === 'number') as tGridPositionEmpty
}

export function isValidMove(position: number) : boolean {
    return typeof store.state.board[position] === 'number'
}

/**
 * AI function that choice the best move
 *
 * @param grid The state of the current board
 * @param depths Node depth index in the tree
 * @param alpha The alpha couple
 * @param beta The beta couple
 * @param isMaximizingPlayer An maximizing or a minimizing
 * @return A list with [the best position, best score]
 */
export function alphaBeta(
    grid: tGrid,
    depths: Array<number>,
    alpha: number,
    beta: number,
    isMaximizingPlayer: boolean
) {
    let best: Array<number> = [-1, isMaximizingPlayer ? -Infinity : Infinity]
    const available : tGridPositionEmpty = emptyCells(grid)

    const depth: number     = depths[0]
    const maxDepth: number  = depths[1]

    // evaluate
    if (wins(grid, ePlayerSymbol.X))
    {
        return [-1, 1 + depth]
    }
    else if (wins(grid, ePlayerSymbol.O))
    {
        return [-1, -(1 + depth)]
    }
    else if (depth === maxDepth || available.length === 0)
    {
        return [-1, 0]
    }

    const playerSymbol = isMaximizingPlayer ? ePlayerSymbol.X : ePlayerSymbol.O
    let score: Array<number>

    for (const position of available)
    {
        // Copy grid
        const newGrid = [ ...grid ]

        // set move
        newGrid[position] = playerSymbol

        // Assign score
        score = alphaBeta(newGrid, [depth + 1, maxDepth], alpha, beta, !isMaximizingPlayer)

        // Assign position
        score[0] = position

        // Previous state
        newGrid[position] = position

        // store best score and move
        if (isMaximizingPlayer)
        {
            if (score[1] > best[1])
            {
                best = score  // max value
            }

            alpha = Math.max(alpha, best[1])
            if (best[1] >= beta)
            {
                break // beta cutoff
            }
        }
        else // (!isMaximizingPlayer)
        {
            if (score[1] < best[1])
            {
                best = score  // min value
            }

            beta = Math.min(beta, best[1])
            if (best[1] <= alpha)
            {
                break // alpha cutoff
            }
        }
    }

    return best
}
