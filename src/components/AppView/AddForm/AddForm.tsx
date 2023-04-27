import { FormEvent, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/hooks';
import { addSingleTodo, selectTodos } from '../../../features/todos/todos';
import styles from './AddForm.module.css';

export const AddForm = () => {
  const dispatch = useAppDispatch();

  const inputEl = useRef<HTMLInputElement>(null);

  const todos = useSelector(selectTodos);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputEl.current) {
      dispatch(addSingleTodo({
        id: todos.length + 1,
        title: inputEl.current.value,
      }));
      inputEl.current.value = '';
    }
  }, [dispatch, todos.length]);

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
