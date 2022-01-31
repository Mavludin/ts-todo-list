import { AddForm } from './AddForm/AddForm';
import { TodoList } from './TodoList/TodoList';

export const AppView: React.FC = () => (
  <main>
    <h1>Список задач</h1>
    <AddForm />
    <TodoList />
  </main>
);
