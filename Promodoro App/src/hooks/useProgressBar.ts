import { onMounted, ref } from "vue";
import ProgressBar from "progressbar.js";

const bar = ref<any>(null);
const container = ref(null);
const duration = ref(1000);

export function useProgressBar() {
  onMounted(() => {
      bar.value = new ProgressBar.Circle(container.value, {
        strokeWidth: 4,
        easing: "linear",
        duration: duration.value,
        color: "url(#gradient)",
        trailColor: "transparent",
        svgStyle: null,
      });

    let linearGradient = `
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
        <stop offset="25%" stop-color="hsl(230, 74%, 62%)"/>
        <stop offset="50%" stop-color="hsl(284, 46%, 49%)"/>
        <stop offset="75%" stop-color="hsl(338, 100%, 60%)"/>
      </linearGradient>
    </defs>
        `;
    bar.value.svg.insertAdjacentHTML("afterBegin", linearGradient);
  });

  const start = () => {bar.value.animate(1.0)}
  const pause = () => {bar.value.stop()}  
  const reset = () => {bar.value.set(0)}
  const resume = () => {bar.value.animate(1.0)}
  const setDuration = (time: number) => {
    duration.value = time
  }

  return {
    container,
    setDuration,
    start,
    pause,
    reset,
    resume,
  }
}
