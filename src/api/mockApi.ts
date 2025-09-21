import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';

// small helper to fake network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// helper to randomly fail requests (about 10% of the time)
const shouldFail = () => Math.random() < 0.1;

// pretend database in memory
let todos: Todo[] = [
  {
    id: '1',
    title: 'Learn React',
    description: 'Complete the React tutorial',
    completed: true,
    createdAt: new Date('2025-03-01'),
  },
  {
    id: '2',
    title: 'Build a To-Do App',
    description: 'Create a responsive to-do application',
    completed: false,
    createdAt: new Date('2025-08-09'),
  },
];

// get all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  await delay(800);

  if (shouldFail()) {
    throw new Error('Failed to fetch todos');
  }

  // return a copy so original list stays safe
  return [...todos];
};

// add a new todo
export const createTodo = async (todo: CreateTodoRequest): Promise<Todo> => {
  await delay(500);

  if (shouldFail()) {
    throw new Error('Failed to create todo');
  }

  // make new todo with random id and current date
  const newTodo: Todo = {
    ...todo,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date(),
  };

  todos.push(newTodo);
  return newTodo;
};

// update todo by id
export const updateTodo = async (id: string, updates: UpdateTodoRequest): Promise<Todo> => {
  await delay(500);

  if (shouldFail()) {
    throw new Error('Failed to update todo');
  }

  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    throw new Error('Todo not found');
  }

  // keep old values, replace only changed ones
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
};

// delete todo by id
export const deleteTodo = async (id: string): Promise<void> => {
  await delay(500);

  if (shouldFail()) {
    throw new Error('Failed to delete todo');
  }

  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    throw new Error('Todo not found');
  }

  todos.splice(index, 1);
};
