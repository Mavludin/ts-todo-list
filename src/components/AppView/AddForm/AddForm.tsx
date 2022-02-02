import { FC, FormEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/hooks';
import { addSingleTodo, selectTodos } from '../../../features/todos/todos';
import styles from './AddForm.module.css';

export const AddForm: FC = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const todos = useSelector(selectTodos);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputEl.current) {
      dispatch(addSingleTodo({
        id: todos.length + 1,
        title: inputEl.current.value,
      }));
      inputEl.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <input
        ref={inputEl}
        required
        type="text"
        placeholder="Новый элемент списка"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
