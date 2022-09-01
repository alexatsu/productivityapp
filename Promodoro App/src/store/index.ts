import type { Todo, TodoForm } from '../types/todo'
import { nanoid } from 'nanoid'
import { reactive } from 'vue'
import * as validator from '../utils/todo' 


type Store = {
    todos: Array<Todo>, 
    fieldErrors: Record<keyof TodoForm, string | null>, 
    addTodo: (todoForm: TodoForm) => void;
    readTodosFromLocalStorage: () => void; 
    removeTodo: (todoId: Pick<Todo, "id">) => void; 
    markTodoAsCompleted: (todoId: Pick<Todo, "id">) => void;
 }

export const store = reactive<Store>({
  todos: [],
  fieldErrors: {
    todoText: null,
    todoStartTime: null,
  },

  readTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos')
    if(todos) this.todos = JSON.parse(todos)
    else localStorage.setItem('todos', JSON.stringify([]))
  },

  addTodo(todoForm: TodoForm) {
    const {todoText, todoStartTime} = todoForm;
    const todoStartTimeInt = parseInt(todoStartTime)
    
    const fieldErrors = {
        todoText: validator.todoText(todoText) ? null : "todo text need to be at least 6 character long",
        startTime: validator.todoStartTime(todoStartTimeInt) ? "todo start time ..." : null
    }

    if(Object.values(fieldErrors).some(Boolean)) {
        this.fieldErrors = fieldErrors
        return;
    }

    this.todos.push({
        id: nanoid(),
        text: todoText,
        startTime: todoStartTimeInt,
        deadline: Date.now() + todoStartTimeInt * 1000 * 60,
        completed: false
    })

    localStorage.setItem('todos', JSON.stringify(this.todos))
  },

  removeTodo(todoId: Pick<Todo, "id">) {
    this.todos = this.todos.filter(({id}) => id !== todoId)

    localStorage.setItem('todos', JSON.parse(this.todos))
  },

  markTodoAsCompleted(todoId: Pick<Todo, "id">) {

  }
})