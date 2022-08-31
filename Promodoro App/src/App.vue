<script setup>
import Todo from './components/Todo.vue';
import { ref, computed, useEmitTest } from 'vue';
//fontawesome imports |
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlay,
  faPause,
  faArrowRotateRight
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faPlay,
  faPause,
  faArrowRotateRight)
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
            <div class="icons">
              <button class="icon1" @click="countdownStart()">
                <font-awesome-icon :icon="playButtonIcon" size='2x' />
              </button>
              <button class="icon2" @click="countdownReset()">
                <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size='2x' rotation="270" />
              </button>
            </div>
          </div>
        </div>
        <!-- <div class="icons">
          <button class="icon1" @click="countdownStart()">
            <font-awesome-icon :icon="playButtonIcon" size='2x' />
          </button>
          <button class="icon2" @click="countdownReset()">
            <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" size='2x' rotation="270" />
          </button>
        </div> -->
      </div>
      <Todo @testEvent="todoTimeEvent" />
    </main>
    <footer>
      <span>Some links</span>
    </footer>
  </body>

</template>

<style scoped lang="scss">
@use "../src/App.scss";
</style>

