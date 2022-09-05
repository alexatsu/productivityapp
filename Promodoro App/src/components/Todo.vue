<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const newTodo = ref('');
const newTodoTime = ref(1);
const todos = ref([]);
const completedTodos = ref([]);


const emits = defineEmits(['testEvent']);
function todoUpdateTime(todo) {
  emits('testEvent', Math.floor((todo.deadline - todo.startTime) / 1000));
}
function resetTodoTime() {
  emits('testEvent', 0);
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

function hideCompleted(type, index) {
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

</script>
  <template>
  <div class="todo-section">

    <form class="todo-form test" @submit.prevent="addTodo()">
      <input class="task-holder" v-model="newTodo" placeholder="Tasks" required />
      <input class="task-number" v-model="newTodoTime" type="number" min="1" max="60" required />
      <button class="task-btn">
        <font-awesome-icon icon="fa-solid fa-chevron-down" style="color: black;" />
      </button>
    </form>

    <ul class="current-todos">
      <li class="current-list checkbox" v-for="(todo, index) in todos" :key="todo.id">
        <input class="list-checkbox" type="checkbox" />
        <label for="check">
          <span @click="hideCompleted('need', index)" >
          </span>
        </label>
        {{ todo.text }}
        {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        <button @click="removeTodo('need', todo)">X</button>
      </li>
    </ul>

    <span class="completed">Completed</span>
    
    <ul class="completed-todos">
      <li class="completed-list checkbox" v-for="(todo, index) in completedTodos" :key="todo.id">
        <input type="checkbox" checked />
        <label for="check">
          <span @click="hideCompleted('completed', index)" >
          </span>
        </label>
        {{ todo.text }}
        {{ moment(todo.deadline - todo.startTime).format("mm") }}m
        <button @click="removeTodo('completed', todo)">X</button>
      </li>
    </ul>
  </div>
</template>
  <style scoped lang='scss'>
  @use '../components/Todo.scss';
  @use "../src/scss/checkbox.scss";
  </style>