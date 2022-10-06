import { createContext } from 'react'
import type { tGameContext } from './game.types'
import { eGameVersus } from './game.enums'

export const defaultValue: tGameContext = {
    state: {
        board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        step: 0,
        isDraw: false,
        isVictory: false,
    },
    form: {
        maxDepth: 9,
        versus: eGameVersus.COMPUTED
    },
}

export const GameContext = createContext(defaultValue)
