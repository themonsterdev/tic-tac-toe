import { MouseEvent, useEffect, useState } from 'react'
import { alphaBeta, eGameVersus, emptyCells, ePlayerSymbol, wins } from '..'
import { defaultValue, GameContext } from '../game.context'

export default function GameProvider({ children }: any) {
    const [state, setState] = useState(defaultValue.state)
    const [form, setForm] = useState(defaultValue.form)

    const xIsNext = state.step % 2 === 0

    const setVersus = (versus: eGameVersus) => {
        setForm({...defaultValue.form,  versus })
    }

    const setMaxDepth = (maxDepth: number) => {
        setForm({...defaultValue.form,  maxDepth })
    }

    const resetGame = () => {
        setState({
            board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            step: 0,
            isDraw: false,
            isVictory: false,
        })
    }

    const checkIsDraw = () => {
        const available = emptyCells(state.board)
        if (available.length === 0)
            state.isDraw = true
    }

    const turnIA = () => {
        if (form.versus === eGameVersus.COMPUTED && !xIsNext) {
            const score = alphaBeta(state.board, [0, form.maxDepth], -Infinity, Infinity, false)
            state.board[score[0]] = ePlayerSymbol.O

            // Check if is the x computed as victory
            if (wins(state.board, ePlayerSymbol.O))
                state.isVictory = true
            else
                state.step++
        }
    }

    const turnPlayer = (position: number) => {
        // Turn player X or O
        const playerSymbol      = (form.versus === eGameVersus.COMPUTED || xIsNext) ? ePlayerSymbol.X : ePlayerSymbol.O
        state.board[position]   = playerSymbol

        // Check if is the x or o as victory
        if (wins(state.board, playerSymbol))
            state.isVictory = true
        else {
            state.step++
        }
    }

    const onMove = (event: MouseEvent<HTMLElement>) => {
        const position = parseInt(
            (event.target as HTMLElement).getAttribute('data-position') as string
        )
        if (typeof state.board[position] === 'number' && !state.isVictory && !state.isDraw) {
            turnPlayer(position)
            setState({ ...state })
        }
    }

    useEffect(() => {
        checkIsDraw()   // Check if is the draw
        turnIA()        // Turn IA
        setState({ ...state })
    }, [state.step])

    return (
        <GameContext.Provider
            value={{
                state,
                form,
                setVersus,
                setMaxDepth,
                resetGame,
                onMove
            }}
            children={children}
        />
    )
}
