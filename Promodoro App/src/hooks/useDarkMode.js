import { ref } from "vue";

let darkIsOn = ref(false); // set it global and use anywhere 

export function useDarkMode() {

  const darkMode = () => {
    return darkIsOn.value === false ? darkIsOn.value = true : darkIsOn.value = false;
  };

  return {
    darkIsOn,
    darkMode,
  };
}
// :class="{dark: darkIsOn}" assing to a element (any div)
// (dark - class, dakIsOn - variable)

// @click="darkMode()" attaching to a listener
