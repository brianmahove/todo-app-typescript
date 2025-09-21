import React from 'react';
import { Todo } from '../../types/todo';
import TodoItem from './TodoItem';
import '../../styles/TodoList.css';

// props for the todo list
interface Props {
  todos: Todo[]; // array of todo items
  onUpdateTodo: (id: string, updates: Partial<Todo>) => Promise<void>; // function to update a todo
  onDeleteTodo: (id: string) => Promise<void>; // function to delete a todo
}

const TodoList: React.FC<Props> = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  // show message if no todos
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  // render list of todos
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
