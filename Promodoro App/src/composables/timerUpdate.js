import { ref } from 'vue'


const counter = ref(0);

export function useCounter() {
    
    const increment = () => {
        counter.value++
        console.log(alert("lol, you suck"));
    }

return{
    counter,
    increment
}

};