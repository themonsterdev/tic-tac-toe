<script setup lang="ts">
import { GameStatus, GameForm, GameBoard } from './game/components'
</script>

<template>
  <div class="center-screen">
    <GameForm />
    <GameStatus />
    <GameBoard />
  </div>
</template>
