import { useState, useEffect } from 'react';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/todo';
import * as api from '../api/mockApi';

// custom hook to manage todos
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // list of todos
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState<string | null>(null); // error message

  // load todos on first render
  useEffect(() => {
    loadTodos();
  }, []);

  // fetch all todos
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null); // reset error
      const data = await api.fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // add a new todo
  const addTodo = async (todo: CreateTodoRequest) => {
    try {
      setError(null);
      const newTodo = await api.createTodo(todo);
      setTodos(prev => [...prev, newTodo]); // add to current list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err; // rethrow so caller knows
    }
  };

  // update an existing todo
  const updateTodo = async (id: string, updates: UpdateTodoRequest) => {
    try {
      setError(null);
      const updatedTodo = await api.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  };

  // delete a todo
  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await api.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  };

  // return state and actions
  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    refetch: loadTodos, // helper to reload all todos
  };
};
