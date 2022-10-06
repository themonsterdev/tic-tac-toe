import GameProvider from './game/components/game.provider'
import GameStatus from './game/components/game.status'
import GameForm from './game/components/game.form'
import GameBoard from './game/components/game.board'

export default function App() {
    return (
        <GameProvider>
            <div className="center-screen">
                <GameForm />
                <GameStatus />
                <GameBoard />
            </div>
        </GameProvider>
    )
}
