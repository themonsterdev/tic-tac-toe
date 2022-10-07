<script setup lang="ts">
import { eGameState } from '../game.enums'
import store from '../store'

let statusText: string
if (store.state.isVictory)
  statusText = eGameState.VICTORY
else if (store.state.isDraw)
  statusText = eGameState.DRAW
else
  statusText = eGameState.PLAYING
</script>

<template>
  <div>
    <div
      class="status"
      :class="{
        'playing': !store.state.isVictory && !store.state.isDraw,
        'victory-x': store.state.isVictory && store.xIsNext,
        'victory-o': store.state.isVictory && !store.xIsNext,
        'draw': store.state.isDraw,
      }"
    >
      Status : <span>{{ statusText }}</span>
    </div>
  </div>
</template>
