import type { Todo, TodoForm } from "../types/todo";
import { nanoid } from "nanoid";
import { reactive } from "vue";
import * as validator from "../utils/todo";

const todoLocalStorate = {
  getTodos: () => {
    const todos = localStorage.getItem("todos");
    if (todos) return JSON.parse(todos);
    else {
      localStorage.setItem("todos", JSON.stringify([]));
      return [];
    }
  },
  setTodos: (todos: Array<Todo>) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },
};

type Store = {
  todos: Array<Todo>;
  fieldErrors: Record<keyof TodoForm, string | null>;
  readTodosFromLocalStorage: () => void;
  addTodo: (todoForm: TodoForm) => void;
  removeTodo: (todoId: Pick<Todo, "id">) => void;
  toggleTodo: (todoId: Pick<Todo, "id">) => void;
  updateTodo: (todoId: Pick<Todo, "id">, newText: Pick<Todo, "text">) => void;
  getCompletedTodos(): Array<Todo>;
  getUncompletedTodos(): Array<Todo>;
};

export const store = reactive<Store>({
  todos: [],
  fieldErrors: { todoText: null, todoStartTime: null },
  addTodo(todoForm: TodoForm) {
    const { todoText, todoStartTime } = todoForm;
    const todoStartTimeInt = parseInt(todoStartTime);
    const fieldErrors = {
      todoText: validator.todoText(todoText)
        ? null
        : "todo text need to be at least 6 character long",
      startTime: validator.todoStartTime(todoStartTimeInt)
        ? "todo start time ..."
        : null,
    };
    if (Object.values(fieldErrors).some(Boolean)) {
      this.fieldErrors = fieldErrors;
      return;
    }
    this.todos.push({
      id: nanoid(),
      text: todoText,
      startTime: todoStartTimeInt,
      deadline: Date.now() + todoStartTimeInt * 1000 * 60,
      completed: false,
    });
    todoLocalStorate.setTodos(this.todos);
  },
  removeTodo(todoId: Pick<Todo, "id">) {
    this.todos = this.todos.filter(({ id }) => id !== todoId);
    todoLocalStorate.setTodos(this.todos);
  },
  toggleTodo(todoId: Pick<Todo, "id">) {
    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    todoLocalStorate.setTodos(this.todos);
  },
  updateTodo(todoId: Pick<Todo, "id">, newText: Pick<Todo, "text">) {
    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, text: newText } : todo
    );
    todoLocalStorate.setTodos(this.todos);
  },
  readTodosFromLocalStorage() {
    this.todos = todoLocalStorate.getTodos();
  },
  getCompletedTodos() {
    return this.todos.filter(({ completed }) => completed);
  },
  getUncompletedTodos() {
    return this.todos.filter(({ completed }) => !completed);
  },
});
