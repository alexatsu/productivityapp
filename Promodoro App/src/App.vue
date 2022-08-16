<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

let stopTimer;
const seconds = ref(0);
const display = ref("00 : 00");

function formatCode(secs) {
  const currentMinutes = Math.floor(secs / 60);
  const currentSeconds = secs % 60;
  return `${currentMinutes < 10 ? "0" + currentMinutes : currentMinutes}
          : ${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
}
function countdown() {
    if (seconds.value > 0) {
      stopTimer = setInterval(() => {
        seconds.value--;
        display.value = formatCode(seconds.value);
      }, 1000)
    } 
}
function stopCountdown() {
  clearInterval(stopTimer);
}
function reset() {
  seconds.value = 0;
  display.value = ("00 : 00");
  clearInterval(stopTimer);
}
function addOneMinute() {
  seconds.value += 60;
  display.value = formatCode(seconds.value);
  
}
function addFiveMinutes() {
  seconds.value += 300;
  display.value = formatCode(seconds.value);
}
function addTenMinutes() {
  seconds.value += 600;
  display.value = formatCode(seconds.value);
}
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>
  <main>
    <div class="app">
      <nav class="nav">LOL</nav>
      <div class="timer">
        <button @click="countdown()" v-if="seconds > 0">Start</button>
        <button @click="stopCountdown()">Pause</button>
        <button @click="reset()">Reset</button>
        <div>{{ display }}</div>
        <button @click="addOneMinute" v-if="seconds < 3600">Add one minute:</button>
        <button @click="addFiveMinutes" v-if="seconds < 3360">Add five minutes:</button>
        <button @click="addTenMinutes" v-if="seconds < 3060">Add ten minutes:</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "../src/App.scss";
</style>
