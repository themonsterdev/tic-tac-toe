import { describe, it, expect } from 'vitest'
import type { tGrid } from './game.types'
import { ePlayerSymbol } from './game.enums'
import { WINS, isVictory, minimax } from './game.functions'

describe('Tic tac toe', () => {
    const initialGrid: tGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    it('X Doit gagner sur toutes les situations wins', () => {
        let board: tGrid = [ ...initialGrid ]
        WINS.forEach(WIN => {
            WIN.forEach(position => board[position] = ePlayerSymbol.X)
            expect(isVictory(board, ePlayerSymbol.X)).toBe(true)
            board = [ ...initialGrid ]
        })
    })

    describe('Minimax', () => {
        it('Doit trouver une solution optimale pour les valeurs min et max', () => {
            const grid: tGrid = [
                ePlayerSymbol.X, ePlayerSymbol.X, ePlayerSymbol.O,
                ePlayerSymbol.O, 4, 5,
                6, ePlayerSymbol.X, ePlayerSymbol.O
            ]

            // Trouver une solution optimale pour les valeurs max
            let score = minimax(grid, [0, -1], true)
            expect(score[0]).toBe(4) // position
            expect(score[1]).toBe(2) // score

            // Trouver une solution optimale pour les valeurs min
            score = minimax(grid, [0, -1], false)
            expect(score[0]).toBe(4) // position
            expect(score[1]).toBe(-4) // score
        })
    })
})
