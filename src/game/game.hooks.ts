import { useContext } from 'react';
import { GameContext } from './game.context'

export function useGameContext() {
    return useContext(GameContext)
}
