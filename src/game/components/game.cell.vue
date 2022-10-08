<script lang="ts" setup>
import { onUpdated } from 'vue'
import { ePlayerSymbol } from '../game.enums'
import { isValidMove } from '../game.functions'
import store from '../store'

defineProps<{ position: number }>()

onUpdated(() => {
  store.checkIsDraw() // Check if is the draw
  store.turnIA()      // Turn IA
})

const onMove = (position: number) => {
  if (isValidMove(position) && !store.isTerminal)
    store.turnPlayer(position)
}
</script>

<template>
  <div
      class="cell"
      :class="{
        'cell-x': store.state.board[position] === ePlayerSymbol.X,
        'cell-o': store.state.board[position] === ePlayerSymbol.O,
      }"
      @click="() => onMove(position)"
      :key="position"
  />
</template>
