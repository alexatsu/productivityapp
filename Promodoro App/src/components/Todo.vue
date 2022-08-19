<script setup>
import { ref } from 'vue'

let id = 0;
const newTodo = ref('');
const todos = ref([]);

function addTodo() {
    todos.value.push({ id: id++, text: newTodo.value, completed: false });
    newTodo.value = '';
}
function removeTodo(todo) {
    todos.value = todos.value.filter((remove) => remove !== todo);
}

</script>

<template>
    <form @submit.prevent="addTodo()">
        <input v-model="newTodo" placeholder="Tasks" required/>
        <button>Add todo</button>
    </form>
    <ul>
        <li v-for="todo in todos" :key="todo.id">
            {{ todo.text }}
            <button @click="removeTodo(todo)"><input type="checkbox"/></button>
        </li>
    </ul>
</template>

<style scoped lang="scss">
@use '../components/Todo.scss';
</style>