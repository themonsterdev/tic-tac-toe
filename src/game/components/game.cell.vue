<script lang="ts" setup>
import { defineProps, onUpdated } from 'vue'
import { ePlayerSymbol } from '../game.enums'
import store from '../store'

const onMove = (event: Event) => {
  const position = parseInt(
      (event.target as HTMLElement).getAttribute('data-position') as string
  )
  if (typeof store.state.board[position] === 'number' && !store.state.isVictory && !store.state.isDraw)
    store.turnPlayer(position)
}

defineProps<{ position: number }>()

onUpdated(() => {
  store.checkIsDraw()   // Check if is the draw
  store.turnIA()        // Turn IA
})
</script>

<template>
  <div
      class="cell"
      :class="{
        'cell-x': store.state.board[position] === ePlayerSymbol.X,
        'cell-o': store.state.board[position] === ePlayerSymbol.O,
      }"
      :data-position="position"
      :key="position"
      @click="onMove"
  />
</template>
