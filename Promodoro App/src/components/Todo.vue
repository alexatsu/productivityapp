<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'

const newTodo = ref('');
const newTodoTime = ref(1);
const todos = ref([]);

const emits = defineEmits(['testEvent']);

function todoUpdateTime(todo) {
    emits('testEvent', Math.floor((todo.deadline - todo.startTime) / 1000));
}

onMounted(() => {
    todos.value = JSON.parse(localStorage?.getItem('todos')) ?? [];
    if (todos.value.length === 1) {
        todoUpdateTime(todos.value[0]);
    }
})

function addTodo() {
    const dataNow = Date.now();
    const deadline = dataNow + newTodoTime.value * 1000 * 60;
    todos.value.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        text: newTodo.value,
        // completed: false, add list for hidden tasks
        startTime: dataNow,
        deadline: deadline
    });
    newTodo.value = '';
    localStorage.setItem('todos', JSON.stringify(todos.value));
    if (todos.value.length === 1) {
        todoUpdateTime(todos.value[0]);
    }
}

function removeTodo(completed) {
    todos.value = todos.value.filter((todo) => todo !== completed);
    localStorage.setItem('todos', JSON.stringify(todos.value));
    if (todos.value.length > 0) {
        todoUpdateTime(todos.value[0]);
    }
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
            {{ todo.text }}
            {{ moment(todo.deadline - todo.startTime).format("mm") }} min
            <button @click="removeTodo(todo)"><input type="checkbox" /></button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@use '../components/Todo.scss';
</style>
