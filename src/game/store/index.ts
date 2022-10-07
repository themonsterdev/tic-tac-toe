import { reactive } from 'vue'
import { eGameVersus, ePlayerSymbol } from '../game.enums'
import { alphaBeta, emptyCells, wins } from '../game.functions'
import type { tGameStore } from '../game.types'

export default reactive<tGameStore>({
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
    get xIsNext() {
        return (this.state.step % 2) === 0
    },
    checkIsDraw () {
        const available = emptyCells(this.state.board)
        if (available.length === 0)
            this.state.isDraw = true
    },
    turnPlayer (position: number) {
        // Turn player X or O
        const playerSymbol         = (this.form.versus === eGameVersus.COMPUTED || this.xIsNext) ? ePlayerSymbol.X : ePlayerSymbol.O
        this.state.board[position] = playerSymbol

        // Check if is the x or o as victory
        if (wins(this.state.board, playerSymbol))
            this.state.isVictory = true
        else {
            this.state.step++
        }
    },
    turnIA () {
        if (this.form.versus === eGameVersus.COMPUTED && !this.xIsNext) {
            const score = alphaBeta(this.state.board, [0, this.form.maxDepth], -Infinity, Infinity, false)
            this.state.board[score[0]] = ePlayerSymbol.O

            // Check if is the x computed as victory
            if (wins(this.state.board, ePlayerSymbol.O))
                this.state.isVictory = true
            else
                this.state.step++
        }
    },
    resetGame () {
        this.state.board = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        this.state.step = 0
        this.state.isDraw = false
        this.state.isVictory = false
    },
    onChangeForm (event: Event) {
        const target = event.target as HTMLFormElement
        if (target.name === 'versus')
            this.form.versus = target.value
        else
            this.form.maxDepth = parseInt(target.value)
    }
})
