import { ref } from "vue";

const dark = ref('dark');//variables to switch between them
const light = ref('light');

let darkIsOn = ref(false); // set it global and use anywhere 

export function useDarkMode() {

  const darkMode = () => {
    return darkIsOn.value === false ? darkIsOn.value = true : darkIsOn.value = false;
  };

  return {
    darkIsOn,
    darkMode,
    dark,
    light
  };
}
// :class="[darkIsOn ? dark : light]" assining to a element (any div)
// (dark/light - class, dakIsOn - variable)

// @click="darkMode()" attaching to a listener
