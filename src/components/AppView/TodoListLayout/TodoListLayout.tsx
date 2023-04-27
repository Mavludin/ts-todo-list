import { useCallback, useState } from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { Divider, Alert, Button } from 'antd';
import styles from './TodoListLayout.module.css';

import { TheList } from './TheList/TheList';
import {
  deleteMultipleTodos,
  selectTodos,
} from '../../../features/todos/todos';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { handleTodoDeletion } from '../../../helpers/handleTodoDeletion';

export const TodoListLayout = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodos);

  const [checkBoxValues, setCheckBoxValues] = useState<CheckboxValueType[]>([]);

  const handleMultipleItemDeletion = useCallback(
    () => {
      handleTodoDeletion(() => {
        dispatch(deleteMultipleTodos(checkBoxValues));
        setCheckBoxValues([]);
      });
    },
    [checkBoxValues, dispatch],
  );

  return (
    <section className={styles.todoList}>
      <Divider orientation="left">Задачи</Divider>
      {todos.length > 0 ? (
        <TheList
          checkBoxValues={checkBoxValues}
          setCheckBoxValues={setCheckBoxValues}
        />
      ) : (
        <Alert
          message="Список задач пуст!"
          description="Добавьте новую задачу."
          type="info"
          showIcon
        />
      )}
      {checkBoxValues.length > 0 && (
        <Button
          onClick={handleMultipleItemDeletion}
          className={styles.dangerBtn}
          danger
          type="primary"
          disabled={!checkBoxValues.length}
        >
          Удалить выделенные
        </Button>
      )}
    </section>
  );
};
