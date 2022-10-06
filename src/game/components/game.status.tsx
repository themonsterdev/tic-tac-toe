import { useGameContext } from '../game.hooks'
import { eGameState } from '../game.enums'

export default function GameStatus() {
    const { state } = useGameContext()

    let statusText: string
    let statusBackgroundColor: string
    if (state.isVictory) {
        statusText = eGameState.VICTORY
        statusBackgroundColor = (state.step % 2) === 0
            ? 'victory-x'
            : 'victory-o'
    }
    else if (state.isDraw) {
        statusText = eGameState.DRAW
        statusBackgroundColor = 'draw'
    }
    else {
        statusText = eGameState.PLAYING
        statusBackgroundColor = 'playing'
    }

    return (
        <div>
            <div className={`status ${statusBackgroundColor}`}>
                Status : <span>{statusText}</span>
            </div>
        </div>
    )
}
