<script setup lang="ts">
import { eGameVersus } from '../game.enums'
import store from '../store'

const onChange = (event: Event) => {
  store.onChangeForm(event)
  store.resetGame()
}
</script>

<template>
  <form @submit.prevent="store.resetGame">
    <label for="versus">Contre</label>
    <select name="versus" id="versus" @change="onChange" v-model="store.form.versus">
      <option v-for="versus of [eGameVersus.COMPUTED, eGameVersus.HUMAN]" :value="versus">
        {{ versus }}
      </option>
    </select>

    <label for="maxDepth">Profondeur Max</label>
    <select name="maxDepth" id="maxDepth" @change="onChange" v-model="store.form.maxDepth">
      <option v-for="maxDepth of [1, 2, 3, 4, 5, 6, 7, 8, 9]" :value="maxDepth">
        {{ maxDepth }}
      </option>
    </select>

    <button type="submit">Lancer la partie</button>
  </form>
</template>
