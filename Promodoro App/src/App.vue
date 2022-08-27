<script setup>
import Todo from './components/Todo.vue';
import { ref, computed } from 'vue';
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
  fa0
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faPlay,
  faPause,
  faArrowRotateRight,
  faPlus,
  fa1,
  fa5,
  fa0,
  faM)
//fontawesome imports |

let timerRunning;
let btnToggle = ref(true);
const seconds = ref(0);
const display = ref("00 : 00")

const playButtonIcon = computed(() => {
return btnToggle.value ? 'fa-play fa-solid' : 'fa-pause fa-solid' 
})

function formatCode(secs) {
  const currentMinutes = Math.floor(secs / 60);
  const currentSeconds = secs % 60;
  return `${currentMinutes < 10 ? "0" + currentMinutes : currentMinutes}
          : ${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
}

function countdownStart() {
  if (btnToggle.value === true) {
    btnToggle.value = false;
    clearInterval(timerRunning); // prevent timer from looping with a delay
    timerRunning = setInterval(() => {
      if (seconds.value > 0) {
        seconds.value--;
        display.value = formatCode(seconds.value);
      } else {
        countdownReset();
      }
    }, 1000)
  } else if (btnToggle.value === false) {
    btnToggle.value = true;
    clearInterval(timerRunning);
  }
}

function countdownReset() {
  seconds.value = 0;
  display.value = ("00 : 00");
  clearInterval(timerRunning);
  btnToggle.value = true;
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
    <header class="nav">
      <span>Productivity App</span>
    </header>
    <main class="main-app">
        <div class="countdown">
          <div class="round-border">
            <div class="timer-background">
              <span class="timer">{{ display }}</span>
            </div>
          </div>
          <div class="icons">
            <button class="icon1" @click="countdownStart()">
              <font-awesome-icon 
              :icon="playButtonIcon"
              size='2x' />
            </button>
            <button class="icon2" @click="countdownReset()">
              <font-awesome-icon 
              icon="fa-solid fa-arrow-rotate-right" 
              size='2x' 
              rotation="270" />
            </button>
          </div>
        </div>
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

      <Todo @testEvent="todoTimeEvent" />
    </main>
    <footer>Some links</footer>
  </body>
</template>

<style scoped lang="scss">
@use "../src/App.scss";
</style>

