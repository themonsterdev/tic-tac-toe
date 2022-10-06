import type { tGrid } from './game'
import { eGameState, eGameVersus, ePlayerSymbol, wins, alphaBeta } from './game'
import './style.scss'

document.addEventListener('DOMContentLoaded', function () {
    // Game ui elements
    const status = document.getElementById('status') as HTMLElement
    const statusText = status.querySelector('span') as HTMLSpanElement
    const formOptions = document.getElementById('options') as HTMLFormElement
    const board = document.getElementById('board') as HTMLElement
    const cells = board.querySelectorAll('.cell')

    // Game options
    let versus: eGameVersus
    let maxDepth: number

    // Game state
    let grid: tGrid
    let step: number

    const setMove = (position: number, symbol: ePlayerSymbol, className: string) => {
        grid[position] = symbol
        const cell = cells[position]
        if (cell instanceof HTMLElement) {
            cell.classList.add(className)
            cell.onclick = null
        }
    }

    const setVictory = (className: string) => {
        status.className = 'status'
        status.classList.add(className)
        const xIsNext = (step % 2) === 0
        statusText.innerHTML = eGameState.VICTORY + ' : ' + (xIsNext ? ePlayerSymbol.X : ePlayerSymbol.O)
    }

    const setDraw = () => {
        status.className = 'status'
        statusText.innerHTML = eGameState.DRAW
    }

    const setNextTurnOrDraw = () => {
        step++
        if (step === 9) {
            setDraw()
            return
        }
    }

    const turnPlayer = (position: number) => {
        const xIsNext = (step % 2) === 0
        const playerSymbol = xIsNext ? ePlayerSymbol.X : ePlayerSymbol.O
        setMove(position,
            playerSymbol,
            xIsNext ? 'cell-x' : 'cell-o'
        )
        if (wins(grid, playerSymbol)) {
            setVictory(xIsNext ? 'victory-x' : 'victory-o')
            return
        }
        setNextTurnOrDraw()
    }

    const turnIA = () => {
        const best = alphaBeta(grid, step, -Infinity, Infinity, false)
        setMove(best[0], ePlayerSymbol.O, 'cell-o')
        if (wins(grid, ePlayerSymbol.O)) {
            setVictory('victory-o')
            return
        }
        setNextTurnOrDraw()
    }

    const onMove = (event: Event, position: number) => {
        turnPlayer(position)

        if (versus === eGameVersus.COMPUTED)
        {
            turnIA()
        }
    }

    const onSubmit = (event: Event) => {
        event.preventDefault()

        grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        step = 0

        versus      = formOptions.versus.value
        maxDepth    = parseInt(formOptions.maxDepth.value)

        status.className = 'status'
        status.classList.add('playing')
        statusText.innerHTML = eGameState.PLAYING

        // Add events listeners
        cells.forEach((cell, index) => {
            ;(<HTMLElement>cell).onclick = event => onMove(event, index)
            ;(<HTMLElement>cell).className = 'cell'
        })
    }

    const createElementOption = (value: string) => {
        let option = document.createElement('option')
        option.value = value
        option.innerText = value
        return option
    }

    const init = () => {
        // Créer les versus
        [eGameVersus.COMPUTED, eGameVersus.HUMAN].forEach(versus =>
            formOptions.versus.append(createElementOption(versus))
        )
        formOptions.versus.value = eGameVersus.COMPUTED

        // Créer les profondeurs maximum
        for (let i = 1; i <= 9; i++)
            formOptions.maxDepth.append(createElementOption(i.toString()))
        formOptions.maxDepth.value = 9

        // Add event listener form submit
        formOptions.addEventListener('submit', onSubmit)

        // @TODO: maxDepth marche pas
        formOptions.maxDepth.style.display = 'none'
    }

    init()
})
