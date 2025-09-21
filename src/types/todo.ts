// main Todo type
export interface Todo {
  id: string;            // unique id
  title: string;         // todo title
  description: string;   // todo description
  completed: boolean;    // is it done or not
  createdAt: Date;       // when it was created
}

// type used when creating a new todo
export type CreateTodoRequest = Omit<Todo, 'id' | 'createdAt'>;

// type used when updating a todo (all fields optional)
export type UpdateTodoRequest = Partial<Omit<Todo, 'id' | 'createdAt'>>;
