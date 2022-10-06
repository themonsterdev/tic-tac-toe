import { MouseEvent } from 'react'

import { eGameVersus, ePlayerSymbol } from './game.enums'

export type tGridPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type tGrid = Array<tGridPosition | ePlayerSymbol>
export type tGridPositionEmpty = Array<tGridPosition>

export type tWin = Array<tGridPosition>
export type tWins = Array<tWin>

export type tGameContext = {
    state: {
        board: tGrid
        step: number
        isDraw: boolean
        isVictory: boolean
    }
    form: {
        maxDepth: number
        versus: eGameVersus
    }
    setVersus?: (versus: eGameVersus) => void
    setMaxDepth?: (maxDepth: number) => void
    resetGame?: () => void
    onMove?: (event: MouseEvent<HTMLElement>) => void
}
