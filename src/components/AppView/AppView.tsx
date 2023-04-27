import { AddForm } from './AddForm/AddForm';
import { TodoListLayout } from './TodoListLayout/TodoListLayout';

export const AppView = () => (
  <main>
    <h1>Список задач</h1>
    <AddForm />
    <TodoListLayout />
  </main>
);
