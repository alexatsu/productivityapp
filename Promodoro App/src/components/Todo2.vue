<script setup lang="ts">
import type {Todo, TodoForm} from '../types/todo'
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import * as validator from '../utils/todo';

const errors = ref<Record<string, string | null>>({}) 
const todos = ref<Array<Todo>>([]);
const todoForm = ref<TodoForm>({
    todoText: '',
    todoStartTime: "1" 
})


const addTodo = () => {
    const {todoText, todoStartTime} = todoForm.value;
    const todoStartTimeInt = parseInt(todoStartTime)
    
    const fieldErrors = {
        todoText: validator.todoText(todoText) ? null : "todo text need to be at least 6 character long",
        startTime: validator.todoStartTime(todoStartTimeInt) ? "todo start time ..." : null
    }

    if(Object.values(fieldErrors).some(Boolean)) {
        errors.value = fieldErrors
        return;
    }

    todos.value.push({
        id: nanoid(),
        text: todoText,
        startTime: todoStartTimeInt,
        deadline: Date.now() + todoStartTimeInt * 1000 * 60,
        completed: false
    })

}

const getCompletedTodos = (todos: Array<Todo>) => todos.filter(({completed}) => completed) 
const getUncompletedTodos = (todos: Array<Todo>) => todos.filter(({completed}) => !completed) 

</script>
<template>
  <div class="todo-section">

    <form class="todo-form" @submit.prevent="addTodo()">
      <input class="task-holder" v-model="newTodo" placeholder="Tasks" required />
      <input class="task-number" v-model="newTodoTime" type="number" min="1" max="60" required />
      <button class="task-btn">
        <font-awesome-icon icon="fa-solid fa-chevron-down" style="color: black;" />
      </button>
    </form>

    <ul class="current-todos">
      <li class="current-list" v-for="(todo, index) in todos" :key="todo.id">
        <input class="list-checkbox" type="checkbox" @click="hideCompleted('need', index)" />
        {{ todo.text }}
        {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        <button @click="removeTodo('need', todo)">X</button>
      </li>
    </ul>

    <span class="completed">Completed</span>

    <ul class="completed-todos">
      <li class="completed-list" v-for="(todo, index) in completedTodos" :key="todo.id">
        <input type="checkbox" checked @click="hideCompleted('completed', index)" />
        {{ todo.text }}
        {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        <button @click="removeTodo('completed', todo)">X</button>
      </li>
    </ul>

  </div>
</template>
<style scoped lang='scss'>
  @use '../components/Todo.scss';
</style>