import { ePlayerSymbol } from './game.enums'

export type tGridPosition = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type tGrid = Array<tGridPosition | ePlayerSymbol>
