import React from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { useTodos } from './hooks/useTodos';
import './styles/App.css';

// main app component
const App: React.FC = () => {
  // use custom hook to manage todos
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, refetch } = useTodos();

  return (
    <div className="app">
      {/* app header */}
      <header className="app-header">
        <h1>Todo App</h1>
      </header>

      {/* main content */}
      <main className="app-main">
        {/* form to add new todo */}
        <AddTodoForm onSubmit={addTodo} />

        {/* show loading spinner */}
        {loading && <LoadingSpinner />}

        {/* show error message with retry */}
        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {/* show todo list only if not loading and no error */}
        {!loading && !error && (
          <TodoList
            todos={todos}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
          />
        )}
      </main>
    </div>
  );
};

export default App;
