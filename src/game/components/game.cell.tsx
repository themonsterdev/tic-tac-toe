import { useGameContext } from '../game.hooks'
import { ePlayerSymbol } from '../game.enums'

export default function GameCell({ position }: any) {
    const { onMove, state } = useGameContext()

    let value = state.board[position]
    let className = ''

    if (value === ePlayerSymbol.X)
        className = 'cell-x'
    else if (value === ePlayerSymbol.O)
        className = 'cell-o'

    return (
        <div
            className={`cell ${className}`}
            data-position={position}
            onClick={onMove}
            key={position}
        />
    )
}
