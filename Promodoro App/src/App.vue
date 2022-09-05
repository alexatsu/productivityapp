<script setup>
import Todo from './components/Todo.vue';
// import Todo2 from './components/Todo2.vue';
import { ref, computed } from 'vue';
import { useProgressBar } from './hooks/useProgressBar'
//fontawesome imports |
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlay,
  faPause,
  faArrowRotateRight,
  faChevronDown,
  faMoon
} from '@fortawesome/free-solid-svg-icons'
import { duration } from 'moment';
library.add(
  faPlay,
  faPause,
  faArrowRotateRight,
  faChevronDown,
  faMoon)
//fontawesome imports |

const { progressBarStart,
        progressBarPause,
        progressBarReset, 
        progressBarDuration,
        progressBarUpdate,
        container,
       } = useProgressBar();

let timerRunning;
let btnToggle = ref(true);
// let whiteTheme = ref(true); white/dark theme setup later

const seconds = ref(0);
const display = ref("00 : 00")
let resetTimeToMinsInTodo = ref(0);

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
  progressBarStart();
  progressBarUpdate();
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
    clearInterval(timerRunning);
    btnToggle.value = true;
    progressBarPause();
  }
}

function countdownReset() {
  clearInterval(timerRunning);
  btnToggle.value = true;
  seconds.value = resetTimeToMinsInTodo.value;
  display.value = formatCode(seconds.value);
  progressBarReset();
}

function todoTimeEvent(secs) {
  resetTimeToMinsInTodo.value = secs;
  seconds.value = secs;
  display.value = formatCode(seconds.value);
  progressBarDuration(secs * 1000);
}

// const progressBarValue = computed(() => {
//   const from = 602.518;
//   const to = 301.635;

//   const intervalPercent = (from - to);
//   // const maxTime = 60;
//   const maxTime = newTodoTime.value * 60;
//   const currentTime = seconds.value;

//   const percent =  currentTime / maxTime;

//   const progressBarPercent = percent * intervalPercent;

//   return from - progressBarPercent;
// });

</script>

<template>

  <body>
    <header class="nav">
      <span>Productivity App</span>
    </header>
    <div class="app">
      <main class="main-app">
        <div class="white-dark">
          <div class="toggle-btn" id="_1st-toggle-btn">
            <input type="checkbox">
            <span></span>
          </div>
        </div>
        <div class="countdown">
          <div class="round-border">
            <div class="timer-background">
              <div ref="container" id="container"></div> <!-- ref is like creating an id (getelemenbyID) -->
              <!-- <div id="container">
                <svg viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                      <stop offset="25%" stop-color="hsl(230, 74%, 62%)"></stop>
                      <stop offset="50%" stop-color="hsl(284, 46%, 49%)"></stop>
                      <stop offset="75%" stop-color="hsl(338, 100%, 60%)"></stop>
                    </linearGradient>
                  </defs>
                  <path
                  d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96"
                  stroke="transparent"
                  stroke-width="4"
                  fill-opacity="0">
                  </path>
                  <path
                  d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96"
                  stroke="url(#gradient)"
                  stroke-width="4"
                  fill-opacity="0"
                  stroke-linecap="round"
                  :style="{ strokeDasharray: '301.635, 301.635', strokeDashoffset: progressBarValue }"
                  >
                </path>
              </svg>
              <div ></div>
            </div> -->

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
        </div>
      </main>
      <Todo @testEvent="todoTimeEvent" />
      <footer>
        <span>Some links</span>
      </footer>
    </div>
  </body>

</template>

<style scoped lang="scss">
@use "../src/App.scss";
</style>

