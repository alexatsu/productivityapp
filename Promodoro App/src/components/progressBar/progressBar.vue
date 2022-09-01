<script setup>
import { useProgressBar } from '../../hooks/useProgressBar'

const { container } = useProgressBar();

</script>

<template>
  <div ref="container" id="container"></div>
</template>

<style scoped lang='scss'>
@use './progressBar.scss';
</style>