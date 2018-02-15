<template>
  <v-container fill-height>
      <v-layout column justify-center align-center>
          <!-- <i aria-hidden="true" class="material-icons icon" style="font-size: 280px;">mail</i> -->
          <v-icon size="200px" class="pulse" color="primary">message</v-icon>
          <h4 class="display-1 text-xs-center">VK Автоответчик</h4>
          <span class="caption text-xs-center">текущая версия: {{ version }}</span>
      </v-layout>
  </v-container>
</template>

<script>
import { version } from '../../../package.json';
export default {
    data(){
        return { version }
    }
}
</script>

<style scoped>
.pulse {
	animation: pulsate infinite linear 2s;
}
@keyframes pulsate {
    0% {transform: scale(.85, .85)}
    50% {transform: scale(1, 1)}
    100% {transform: scale(.85, .85)}
}
</style>

