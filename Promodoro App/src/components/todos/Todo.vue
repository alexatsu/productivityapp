<script setup>
import { ref, onMounted, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { nanoid } from 'nanoid';
import moment from 'moment'
import { useDarkMode } from '../../hooks/useDarkMode'
const { dark, light, darkIsOn } = useDarkMode();
let chevron = ref(true);
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

function retrieveTodosFromLocalStorage() {
  completedTodos.value = JSON.parse(localStorage.getItem('completed-todos')) ?? [];
  todos.value = JSON.parse(localStorage?.getItem('todos')) ?? [];
  if (todos.value.length >= 1) {
    todoUpdateTime(todos.value[0]);
  }
}
onMounted(() => {
  retrieveTodosFromLocalStorage()
})

function addTodo() {
  if (newTodo.value.trim() === '') {
    return
  } //check if text is empty => don't add todo

  const dataNow = Date.now();
  const deadlineTD = dataNow + newTodoTime.value * 1000 * 60;

  todos.value.push({
    id: nanoid(),
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
//watching for changings in todos/completedTodos and updating localstorage
watch(todos, newValue => {
  localStorage.setItem('todos', JSON.stringify(newValue))
},
  { deep: true }); 

watch(completedTodos, newValue => {
  localStorage.setItem('completed-todos', JSON.stringify(newValue))
},
  { deep: true });

function removeTodo(type, removeTodo) {
  emits('reset-time-on-remove+check')
  if (type === "need") {
    todos.value = todos.value.filter((todo) => todo !== removeTodo);
  }
  else {
    completedTodos.value = completedTodos.value.filter((todo) => todo !== removeTodo);
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

function chevronRotate() {
  return chevron.value === true ? chevron.value = false : chevron.value = true;
}
</script>
<template>
  <div class="todo-section">

    <form class="todo-form" @submit.prevent="addTodo()">
      <input class="task-holder" v-model="newTodo" placeholder="add..." />
      <div class="number-input">
        <span :class="[darkIsOn ? dark : light]" class="minus" @click="decrementInputNumber()"></span>
        <input :class="[darkIsOn ? dark : light]" type="number" class="inp-num" min="1" max="60" v-model="newTodoTime">
        <span :class="[darkIsOn ? dark : light]" class="plus" @click="incrementInputNumber()"></span>
      </div>
      <button class="task-btn">
        <span class="chevron">
          <font-awesome-icon icon="fa-solid fa-chevron-down" class="icon" :class="[darkIsOn ? dark : light]" />
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
        <textarea :class="[darkIsOn ? dark : light]" class="text" v-model="todo.text" rows="2"></textarea>
        <span class="mins">
          {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        </span>
        <button @click="removeTodo('need', todo)">X</button>
      </li>
    </ul>

    <div class="divider-between-lists">
      <span class="chevron2">
        <font-awesome-icon icon="fa-solid fa-chevron-down" @click="chevronRotate()"
          :class="{ rotated: chevron }, [darkIsOn ? dark : light]" class="icon-rotated" />
      </span>
      <span :class="[darkIsOn ? dark : light]" class="completed">Completed</span>
    </div>

    <ul v-if="!chevron" class="completed-todos">
      <li class="completed-list" v-for="(todo, index) in completedTodos" :key="todo.id">
        <div class="checkbox">
          <input type="checkbox" checked />
          <label for="check">
            <span @click="checkCompleted('completed', index)">
            </span>
          </label>
        </div>
        <textarea :class="[darkIsOn ? dark : light]" class="text" v-model="todo.text" rows="2"></textarea>
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
@use "../todos/inputNumber.scss";
@use "../todos/checkbox.scss";
</style>