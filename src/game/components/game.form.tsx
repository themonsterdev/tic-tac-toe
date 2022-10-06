import { FormEvent, ChangeEvent } from 'react'
import { useGameContext } from '../game.hooks'
import { eGameVersus } from '../game.enums'

export default function GameForm() {
    const { setVersus, setMaxDepth, resetGame, form } = useGameContext()

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        resetGame && resetGame()
    }

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.name === 'versus')
            setVersus && setVersus(event.target.value as eGameVersus)

        if (event.target.name === 'maxDepth')
            setMaxDepth && setMaxDepth(parseInt(event.target.value))

        resetGame && resetGame()
    }

    return (
        <form onSubmit={onSubmit}>

            <label htmlFor="versus" children="Contre"/>
            <select name="versus" id="versus" value={form.versus} onChange={onChange}>
                {[eGameVersus.COMPUTED, eGameVersus.HUMAN].map(versus =>
                    <option key={versus} value={versus} children={versus} />
                )}
            </select>

            <label htmlFor="maxDepth" children="Profondeur Max"/>
            <select name="maxDepth" id="maxDepth" value={form.maxDepth} onChange={onChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(maxDepth =>
                    <option key={maxDepth} value={maxDepth} children={maxDepth} />
                )}
            </select>

            <button type="submit">Lancer la partie</button>

        </form>
    )
}
