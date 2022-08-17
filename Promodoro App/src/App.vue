<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

let timerRunning;
let btnToggle = ref('Start');
const seconds = ref(0);
const display = ref("00 : 00");

function formatCode(secs) {
  const currentMinutes = Math.floor(secs / 60);
  const currentSeconds = secs % 60;
  return `${currentMinutes < 10 ? "0" + currentMinutes : currentMinutes}
          : ${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
}
function countdownStart() {
  clearInterval(timerRunning); // prevent timer from looping with a delay
  if (btnToggle.value === 'Start' || btnToggle.value === 'Resume') {
    btnToggle.value = 'Pause';
    timerRunning = setInterval(() => {
      if (seconds.value > 0) {
        seconds.value--;
        display.value = formatCode(seconds.value);
      } else {
        countdownReset();
      }
    }, 1000)
  } else if (btnToggle.value === 'Pause') {
    btnToggle.value = 'Resume';
    clearInterval(timerRunning);
  }
}
function countdownReset() {
  seconds.value = 0;
  display.value = ("00 : 00");
  clearInterval(timerRunning);
  btnToggle.value = 'Start';
}
function addSeconds(secs) {
  seconds.value += secs;
  display.value = formatCode(seconds.value);
}
function addOneMinute() {
  addSeconds(60);
}
function addFiveMinutes() {
  addSeconds(300);
}
function addTenMinutes() {
  addSeconds(600);
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
      <nav class="nav">Promodoro
        <ul></ul>
      </nav>
      <div class="timer">
        <button @click="countdownStart()" v-if="seconds > 0">{{ btnToggle }}</button>
        <button @click="countdownReset()" v-if="seconds > 0">Reset</button>
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
