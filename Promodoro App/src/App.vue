<script setup>
import Todo from './components/Todo.vue';
import { ref } from 'vue';
//fontawesome imports |
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faPlay,
  faPause,
  faArrowRotateRight,
  faPlus,
  fa1,
  faM,
  fa5,
  fa0 } from '@fortawesome/free-solid-svg-icons'
library.add(
  faPlay, 
  faPause, 
  faArrowRotateRight, 
  faPlus, 
  fa1, 
  fa5, 
  fa0, 
  faM,)
//fontawesome imports |

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

function todoTimeEvent(secs) {
  seconds.value = secs;
  display.value = formatCode(seconds.value);
}

</script>

<template>

  <body>
    <header class="nav">Promodoro
    </header>
    <main class="main-app">
      <div class="countdown">
        <div><span class="timer">{{ display }}</span></div>
        <button @click="countdownStart()" v-if="seconds > 0">{{ btnToggle }}</button>
        <button @click="countdownReset()" v-if="seconds > 0">Reset</button>
        <button @click="addOneMinute" v-if="seconds < 3600">
          <font-awesome-icon icon="fa-solid fa-plus" transform='shrink-5' />
          <font-awesome-icon icon="fa-solid fa-1" size='1x' />
          <font-awesome-icon icon="fa-solid fa-m" transform='shrink-3' />
        </button>
        <button @click="addFiveMinutes" v-if="seconds < 3360">
          <font-awesome-icon icon="fa-solid fa-plus" transform='shrink-5' />
          <font-awesome-icon icon="fa-solid fa-5" size='1x' />
          <font-awesome-icon icon="fa-solid fa-m" transform='shrink-3' />
        </button>
        <button @click="addTenMinutes" v-if="seconds < 3060">
          <font-awesome-icon icon="fa-solid fa-plus" transform='shrink-5' />
          <font-awesome-icon icon="fa-solid fa-1" size='1x' />
          <font-awesome-icon icon="fa-solid fa-0" size='1x' />
          <font-awesome-icon icon="fa-solid fa-m" transform='shrink-3' />
        </button>
      </div>
      <font-awesome-icon icon="fa-solid fa-play" size='2x' />
      <font-awesome-icon icon="fa-solid fa-pause" size='2x' />
      <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size='2x' rotation="180" />
      <Todo @testEvent="todoTimeEvent" />
    </main>
    <footer>Some links</footer>
  </body>
</template>

<style scoped lang="scss">
@use "../src/App.scss";
</style>

