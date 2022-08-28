<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'

const newTodo = ref('');
const newTodoTime = ref(1);
const todos = ref([]);
const completedTodos = ref([]);

const emits = defineEmits(['testEvent']);

function todoUpdateTime(todo) {
    emits('testEvent', Math.floor((todo.deadline - todo.startTime) / 1000));
    console.log("check");
}

onMounted(() => {
    todos.value = JSON.parse(localStorage?.getItem('todos')) ?? [];
    if (todos.value.length === 1) {
        todoUpdateTime(todos.value[0]);
    }

    // retrieveTodosFromLocalStorage()
})

function addTodo() {
    const dataNow = Date.now();
    const deadline = dataNow + newTodoTime.value * 1000 * 60;

    todos.value.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        text: newTodo.value,
        startTime: dataNow,
        deadline: deadline
    });
    newTodo.value = '';

    localStorage.setItem('todos', JSON.stringify(todos.value));
    if (todos.value.length === 1) {
        todoUpdateTime(todos.value[0]);
    }
}

function removeTodo(type, remove) {
    if (type === "need") {
        todos.value = todos.value.filter((todo) => todo !== remove);
    }
    else {
        completedTodos.value = completedTodos.value.filter((todo) => todo !== remove);
    }

    localStorage.setItem('todos', JSON.stringify(todos.value));
    if (todos.value.length > 0) {
        todoUpdateTime(todos.value[0]);
    }
}

function hideCompleted(type, index) {
    if (type === 'need') {
        const completed = todos.value.splice(index, 1);
        completedTodos.value.push(...completed);
        console.log(completed);
    } else {
        const notCompleted = completedTodos.value.splice(index, 1);
        todos.value.push(...notCompleted);
    }
    
    localStorage.setItem('todos', JSON.stringify(todos.value));
    if (todos.value.length > 0) {
        todoUpdateTime(todos.value[0]);
    }
}

// function retrieveTodosFromLocalStorage() {
//   const localCompletedTodos = JSON.parse(localStorage.getItem('completed-todos'))
//   if (Array.isArray(localCompletedTodos) && localCompletedTodos.length) {
//       completedTodos.value = localCompletedTodos
//   }
// }

</script>

<template>
    <div class="todo-section">
        <form @submit.prevent="addTodo()">
            <input v-model="newTodo" placeholder="Tasks" required />
            <input v-model="newTodoTime" type="number" min="1" max="60" required />min
            <button>Add todo</button>
        </form>
        <ul class="current-todos">
            <li v-for="(todo, index) in todos" :key="todo.id">
                <input type="checkbox" @click="hideCompleted('need', index)" />
                {{ todo.text }}
                {{ moment(todo.deadline - todo.startTime).format("mm") }} min
                <button @click="removeTodo('need', todo)">X</button>
            </li>
        </ul>
        <ul class="completed-todos">
            <li v-for="(todo, index) in completedTodos" :key="todo.id">
                <input type="checkbox" checked @click="hideCompleted('completed', index)" />
                {{ todo.text }}
                {{ moment(todo.deadline - todo.startTime).format("mm") }} min
                <button @click="removeTodo('completed', todo)">X</button>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
    @use '../components/Todo.scss';
</style>
