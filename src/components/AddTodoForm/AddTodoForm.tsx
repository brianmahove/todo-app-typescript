import React, { useState } from 'react';
import { CreateTodoRequest } from '../../types/todo';
import '../../styles/AddTodoForm.css';

// props that the form needs
interface Props {
  onSubmit: (todo: CreateTodoRequest) => Promise<void>;
}

const AddTodoForm: React.FC<Props> = ({ onSubmit }) => {
  // local state for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // do nothing if title is empty
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      // send new todo back to parent
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });

      // clear fields after adding
      setTitle('');
      setDescription('');
    } finally {
      // always reset submitting flag
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <h2>Add New Todo</h2>

      {/* title input */}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      {/* description input */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {/* submit button */}
      <button type="submit" disabled={isSubmitting || !title.trim()}>
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default AddTodoForm;
