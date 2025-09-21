import React, { useState } from 'react';
import { Todo } from '../../types/todo';

// props needed for each todo item
interface Props {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => Promise<void>; // function to update todo
  onDelete: (id: string) => Promise<void>; // function to delete todo
}

const TodoItem: React.FC<Props> = ({ todo, onUpdate, onDelete }) => {
  // local state for editing mode and input values
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [isUpdating, setIsUpdating] = useState(false); // shows loading state for update/delete

  // toggle completed state
  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } finally {
      setIsUpdating(false);
    }
  };

  // save edits
  const handleSave = async () => {
    if (!editTitle.trim()) return; // ignore empty titles

    setIsUpdating(true);
    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false); // exit edit mode
    } finally {
      setIsUpdating(false);
    }
  };

  // delete todo
  const handleDelete = async () => {
    setIsUpdating(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsUpdating(false);
    }
  };

  // render edit mode
  if (isEditing) {
    return (
      <div className={`todo-item editing ${isUpdating ? 'updating' : ''}`}>
        {/* input for title */}
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          disabled={isUpdating}
          className="todo-title-input"
          title="Edit todo title"
          placeholder="Enter todo title"
        />

        {/* input for description */}
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          disabled={isUpdating}
          className="todo-description-input"
          title="Edit todo description"
          placeholder="Enter todo description"
        />

        {/* buttons to save or cancel */}
        <div className="todo-actions">
          <button onClick={handleSave} disabled={isUpdating}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} disabled={isUpdating}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // render normal mode
  return (
    <div
      className={`todo-item ${todo.completed ? 'completed' : ''} ${
        isUpdating ? 'updating' : ''
      }`}
    >
      {/* show title and description */}
      <div className="todo-content">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>

      {/* actions: complete, edit, delete */}
      <div className="todo-actions">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={isUpdating}
          title="Mark todo as completed"
        />
        <button onClick={() => setIsEditing(true)} disabled={isUpdating}>
          Edit
        </button>
        <button onClick={handleDelete} disabled={isUpdating}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
