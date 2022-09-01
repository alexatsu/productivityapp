import { ref } from 'vue'


const counter = ref(0);

export function useCounter() {
    const increment = () => {
        counter.value++
    }

return {
    counter,
    increment
}

};