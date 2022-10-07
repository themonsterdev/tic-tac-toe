import { eGameVersus, ePlayerSymbol } from './game.enums'

export type tGridPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type tGrid = Array<tGridPosition | ePlayerSymbol>
export type tGridPositionEmpty = Array<tGridPosition>

export type tWin = Array<tGridPosition>
export type tWins = Array<tWin>

export type tGameStore = {
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
    get xIsNext() : boolean
    checkIsDraw () : void
    turnPlayer (position: number) : void
    turnIA () : void
    resetGame () : void
    onChangeForm (event: Event) : void
}
