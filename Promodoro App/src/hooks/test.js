import { onMounted, ref } from "vue";
import ProgressBar from "progressbar.js";

const container = ref(null);
let duration = ref(0);
let x = ref(-1);

const bar = new ProgressBar.Circle(container.value, {
  strokeWidth: 4,
  easing: "linear",
  duration: duration.value,
  color: "url(#gradient)",
  trailColor: "transparent",
  svgStyle: null,
});

export function useProgressBar() {
  onMounted(() => {
    let linearGradient = `<defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
      <stop offset="25%" stop-color="hsl(230, 74%, 62%)"/>
      <stop offset="50%" stop-color="hsl(284, 46%, 49%)"/>
      <stop offset="75%" stop-color="hsl(338, 100%, 60%)"/>
    </linearGradient>
  </defs>`;
  bar.svg.insertAdjacentHTML("afterBegin", linearGradient);
  bar.path.setAttribute("stroke-linecap", "round");
  });

  //initial bar.value.set(-1); created variable to update the bar position
  const progressBarStart = () => {
    bar.set(x.value);
    bar.animate(0, {
      duration: duration.value,
    });
    // bar.value.animate(1);
  };

  const progressBarUpdate = () => {
    x.value = bar;
  };

  const progressBarPause = () => {
    x.value = bar;
    bar.set();
  };

  const progressBarReset = () => {
    //set(0) reseting the rendering part of bar
    bar.set(0);
    x.value = -1;
  };

  const progressBarDuration = (time: number) => {
    duration.value = time;
  };

  return {
    container,
    progressBarDuration,
    progressBarStart,
    progressBarPause,
    progressBarReset,
    progressBarUpdate,
  };
}
