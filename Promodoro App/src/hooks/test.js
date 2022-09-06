import { ref } from "vue";


export function useIncrement() {
  
  let counter = ref(0);

  function increment(value = 1) {
    counter.value = counter.value + value;
  }
  return {
    increment,
    counter
  };
  
}