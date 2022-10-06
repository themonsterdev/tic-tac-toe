import GameCell from './game.cell'

export default function GameBoard() {
    return (
        <div className="board">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(position =>
                <GameCell position={position} key={position} />
            )}
        </div>
    )
}
