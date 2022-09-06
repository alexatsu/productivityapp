<script setup>
import { ref, onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

const newTodo = ref('');
const newTodoTime = ref(1);
const todos = ref([]);
const completedTodos = ref([]);

// const prop = defineProps({
//   counter: {
//     required: true
//   }
// })
// function increment() {
//   emits('counter-update');
// }
//
const emits = defineEmits([
  'test-event',
  "counter-update",
  'reset-time-on-remove+check']);

function todoUpdateTime(todo) {
  emits('test-event', Math.floor((todo.deadline - todo.startTime) / 1000));
}
function resetTodoTime() {
  emits('test-event', 0);
}

onMounted(() => {
  todos.value = JSON.parse(localStorage?.getItem('todos')) ?? [];
  if (todos.value.length >= 1) {
    todoUpdateTime(todos.value[0]);
  }
  retrieveTodosFromLocalStorage()
})

function addTodo() {
  const dataNow = Date.now();
  const deadlineTD = dataNow + newTodoTime.value * 1000 * 60;
  todos.value.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    text: newTodo.value,
    startTime: dataNow,
    deadline: deadlineTD,
  });
  newTodo.value = '';
  newTodoTime.value = 1;

  localStorage.setItem('todos', JSON.stringify(todos.value));
  if (todos.value.length === 1) {
    todoUpdateTime(todos.value[0]);
  }
}

function removeTodo(type, remove) {
  emits('reset-time-on-remove+check')
  if (type === "need") {
    todos.value = todos.value.filter((todo) => todo !== remove);
  }
  else {
    completedTodos.value = completedTodos.value.filter((todo) => todo !== remove);
    localStorage.setItem('completed-todos', JSON.stringify(completedTodos.value))
  }
  localStorage.setItem('todos', JSON.stringify(todos.value));

  if (todos.value.length > 0) {
    todoUpdateTime(todos.value[0]);
  }
  else if (todos.value.length === 0) {
    resetTodoTime();
  }
}

function checkCompleted(type, index) {
  emits('reset-time-on-remove+check')
  if (type === 'need') {
    const completed = todos.value.splice(index, 1);
    completedTodos.value.push(...completed);
  } else {
    const notCompleted = completedTodos.value.splice(index, 1);
    todos.value.push(...notCompleted);
  }

  localStorage.setItem('todos', JSON.stringify(todos.value));
  localStorage.setItem('completed-todos', JSON.stringify(completedTodos.value))

  if (todos.value.length > 0) {
    todoUpdateTime(todos.value[0]);
  }
  else if (todos.value.length === 0) {
    resetTodoTime();
  }
}

function retrieveTodosFromLocalStorage() {
  const localCompletedTodos = JSON.parse(localStorage.getItem('completed-todos'))
  if (Array.isArray(localCompletedTodos) && localCompletedTodos.length) {
    completedTodos.value = localCompletedTodos
  }
}
function decrementInputNumber() {
  if (newTodoTime.value > 1) {
    newTodoTime.value--;
  }
}
function incrementInputNumber() {
  if (newTodoTime.value < 60) {
    newTodoTime.value++;
  }
}

</script>
<template>
  <div class="todo-section">

    <form class="todo-form" @submit.prevent="addTodo()">
      <input class="task-holder" v-model="newTodo" placeholder="add..." required />
      <div class="number-input">
        <span class="minus" @click="decrementInputNumber()" ></span>
        <input type="number" class="inp-num" min="1" max="60" v-model="newTodoTime" >
        <span class="plus" @click="incrementInputNumber()"></span>
      </div>
      <button class="task-btn">
        <span class="chevron">
          <font-awesome-icon icon="fa-solid fa-chevron-down" style="color: black;" />
        </span>
      </button>
    </form>

    <ul class="current-todos">
      <li class="current-list" v-for="(todo, index) in todos" :key="todo.id">
        <div class="checkbox">
          <input class="list-checkbox" type="checkbox" />
          <label for="check">
            <span @click="checkCompleted('need', index)">
            </span>
          </label>
        </div>
        <span class="text">
          {{ todo.text }}
        </span>
        <span class="mins">
          {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        </span>
        <button @click="removeTodo('need', todo)">X</button>
      </li>
    </ul>

    <span class="completed">Completed</span>

    <ul class="completed-todos">
      <li class="completed-list" v-for="(todo, index) in completedTodos" :key="todo.id">
        <div class="checkbox">
          <input type="checkbox" checked />
          <label for="check">
            <span @click="checkCompleted('completed', index)">
            </span>
          </label>
        </div>
        <span class="text">
          {{ todo.text }}
        </span>
        <span class="mins">
          {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        </span>
        <button @click="removeTodo('completed', todo)">X</button>
      </li>
    </ul>
  </div>
 
  <!-- <button @click="increment()"> Counter is {{ prop.counter }} </button> -->
</template>
<style scoped lang='scss'>
@use "../scss/scss-components/input-number.scss";
@use '../components/Todo.scss';
</style>