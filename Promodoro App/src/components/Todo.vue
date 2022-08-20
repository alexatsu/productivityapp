<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'

let id = 0;
const newTodo = ref('');
const newTodoTime = ref(1);
const todos = ref([]);

const emits = defineEmits(['testEvent'])

onMounted(() => {
    todos.value = JSON.parse(localStorage?.getItem('todos')) ?? [];
})
function addTodo() {
    const deadline = Date.now() + newTodoTime.value * 1000 * 60;
    todos.value.push({
        id: id++,
        text: newTodo.value,
        completed: false,
        startTime: Date.now(),
        deadline: deadline
    });
    newTodo.value = '';
    localStorage.setItem('todos', JSON.stringify(todos.value));
    emits('testEvent', Math.floor((deadline - Date.now()) / 1000))
}
function removeTodo(todo) {
    todos.value = todos.value.filter((remove) => remove !== todo);
    localStorage.setItem('todos', JSON.stringify(todos.value));
}

</script>

<template>
    <form @submit.prevent="addTodo()">
        <input v-model="newTodo" placeholder="Tasks" required />
        <input v-model="newTodoTime" type="number" min="1" max="60" required />min
        <button>Add todo</button>
    </form>
    <ul>
        <li v-for="todo in todos" :key="todo.id">
            <!-- {{ todo.text }} -->
            <span @click="parseMinsToCountdown()">{{ todo.text }}</span>
            {{ moment(todo.deadline - todo.startTime).format("mm") }}min
            <button @click="removeTodo(todo)"><input type="checkbox" /></button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@use '../components/Todo.scss';
</style>
