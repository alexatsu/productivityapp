<script setup>
import { ref } from 'vue';
import { useDarkMode } from '../../hooks/useDarkMode';
const { darkIsOn, darkMode } = useDarkMode();

</script>

<template>
    <div class="white-dark-toggle">
        <div class="toggle-btn" id="_1st-toggle-btn">
            <input type="checkbox" :class="{dark: darkIsOn}" @click="darkMode()">
            <span></span>
        </div>
    </div>
    <p :class="{dark: darkIsOn}" class="text">Lol</p>
</template>

<style lang="scss">
    @use "../darkMode/darkMode.scss";
</style>