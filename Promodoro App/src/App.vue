<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

const seconds = ref(0);
const display = ref("00 : 00");

function formatCode(secs) {
  const currentMinutes = Math.floor(secs / 60);
  const currentSeconds = secs % 60;
  return `${currentMinutes < 10 ? "0" + currentMinutes : currentMinutes}
          : ${currentSeconds < 10 ? "0" + currentSeconds : currentSeconds}`;
}
function countdown() {
  if (seconds.value >= 0) {
    setTimeout(() => {
      seconds.value--;
      display.value = formatCode(seconds.value);
      countdown();
    }, 1000)
  }
}
function addOneMinute() {
  seconds.value = seconds.value + 60;
  display.value = formatCode(seconds.value);
}
function addFiveMinutes() {
  seconds.value = seconds.value + 300;
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
        <div>{{ display }}</div>
        <button @click="addOneMinute">Add one minute:</button>
        <button @click="addFiveMinutes">Add five minutes:</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "../src/App.scss";
</style>
