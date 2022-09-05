import { onMounted, ref } from "vue";
import ProgressBar from "progressbar.js";

const bar = ref<any>(null);
const container = ref(null);
let duration = ref(0);
let x = ref(-1);

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
    let linearGradient = `<defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
        <stop offset="25%" stop-color="hsl(230, 74%, 62%)"/>
        <stop offset="50%" stop-color="hsl(284, 46%, 49%)"/>
        <stop offset="75%" stop-color="hsl(338, 100%, 60%)"/>
      </linearGradient>
    </defs>`;
    // const dot = `
    // <div style="width: 240px;
    //   height: 240px;
    //   display: block;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   background-color: red;
    //   transform: rotate(50deg)">
    //   <div style="width: 120px;
    //     height: 120px;
    //     background-color: white;
    //     display: block;
    //     position: relative;>
    //     <div style="width: 4px;
    //       height: 4px;
    //       background-color: #000;
    //       display: block;
    //       position: relative;
    //       top: 0;
    //       border-radius: 2px;">
    //     </div>
    //   </div>
    // </div>`
    // bar.value.svg.insertAdjacentHTML("afterEnd", dot);
    bar.value.svg.insertAdjacentHTML("afterBegin", linearGradient);
    bar.value.path.setAttribute("stroke-linecap", "round");
  });
  const progressBarStart = () => {
    bar.value.set(x.value);
    bar.value.animate(0);
    // bar.value.animate(1);
  };
  const progressBarUpdate = () => {
    x.value = bar.value;
  };
  const progressBarPause = () => {
    x.value = bar.value;
    bar.value.set();
  };
  const progressBarReset = () => {
    bar.value.set(0);
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
    progressBarUpdate
  };
}

