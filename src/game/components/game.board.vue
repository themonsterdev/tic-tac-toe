<script setup lang="ts">
import GameCell from './game.cell.vue'
</script>

<template>
  <div class="board">
    <GameCell
        v-for="position in [0, 1, 2, 3, 4, 5, 6, 7, 8]"
        :position="position"
        :key="position"
    />
  </div>
</template>
