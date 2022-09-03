<script setup lang="ts">
import {TodoForm} from '../types/todo'
import {ref, onMounted} from 'vue'
import {store} from '../store/todo'
import moment from 'moment'

const todoForm = ref<TodoForm>({
 todoStartTime: "1",
 todoText: ""
})

const {todos, addTodo, toggleTodo, removeTodo, updateTodo, readTodosFromLocalStorage, fieldErrors, getCompletedTodos, getUncompletedTodos } = store;

onMounted(() => {
  readTodosFromLocalStorage();
})

</script>
<template>
  <div class="todo-section">

    <form class="todo-form" @submit.prevent="addTodo(todoForm)">
      <input class="task-holder" v-model="todoForm.todoText" placeholder="Tasks" required />
      <input class="task-number" v-model="todoForm.todoStartTime" type="number" min="1" max="60" required />
      <button class="task-btn">
        <font-awesome-icon icon="fa-solid fa-chevron-down" style="color: black;" />
      </button>
    </form>

    <ul class="current-todos">
      <li class="current-list" v-for="(todo) in getUncompletedTodos()" :key="todo.id">
        <input class="list-checkbox" type="checkbox" @click="toggleTodo(todo.id)" />
        {{ todo.text }}
        {{ moment(todo.deadline - todo.startTime).format("mm") }}
        <button @click="removeTodo(todo.id)">X</button>
      </li>
    </ul>

    <span class="completed">Completed</span>

    <ul class="completed-todos">
      <li class="completed-list" v-for="(todo) in getCompletedTodos()" :key="todo.id">
        <input type="checkbox" checked @click="toggleTodo(todo.id)" />
        {{ todo.text }}
        {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        <button @click="removeTodo(todo.id)">X</button>
      </li>
    </ul>

  </div>
</template>
<style scoped lang='scss'>
  @use '../components/Todo.scss';
</style>