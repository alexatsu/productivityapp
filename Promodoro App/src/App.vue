<script setup>
import Todo from './components/Todo.vue';
// import Todo2 from './components/Todo2.vue';
import { ref, computed } from 'vue';
import { useProgressBar } from './hooks/useProgressBar'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlay,
  faPause,
  faArrowRotateRight,
  faChevronDown,
  faMoon
} from '@fortawesome/free-solid-svg-icons'
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
let resetMinsTodo = ref(0);

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
  seconds.value = resetMinsTodo.value;
  display.value = formatCode(seconds.value);
  progressBarReset();
}

function todoTimeEvent(secs) {
  resetMinsTodo.value = secs;
  seconds.value = secs;
  display.value = formatCode(seconds.value);
  progressBarDuration(secs * 1000);
}

// let i = ref(0);
// function increment() {
//   i.value++;
// }

</script>

<template>
  <body>
    <header class="nav">
      <span>Productivity App</span>
    </header>
    <div class="app">
      <main class="main-app">
        <div class="white-dark-toggle">
          <div class="toggle-btn" id="_1st-toggle-btn">
            <input type="checkbox">
            <span></span>
          </div>
        </div>
        <div class="countdown">
          <div class="round-border">
            <div class="timer-background">
              <div ref="container" id="container"></div> <!-- ref is like creating an id (getelemenbyID) -->
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
      <Todo
      @reset-time-on-remove+check="countdownReset"
      @test-event="todoTimeEvent" />
      <!-- <Todo @counter-update="increment"  
      :counter="i" /> -->
      <footer>
        <span>Some links</span>
      </footer>
    </div>
  </body>
</template>

<style scoped lang="scss">
  @use "../src/App.scss";
</style>

