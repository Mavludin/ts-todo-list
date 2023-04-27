import {
  Dispatch, useCallback, SetStateAction, useState,
} from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { List, Checkbox } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import styles from './TheList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  TodoItem,
  deleteSingleTodo,
  selectTodos,
} from '../../../../features/todos/todos';
import { handleTodoDeletion } from '../../../../helpers/handleTodoDeletion';

type Props = {
  checkBoxValues: CheckboxValueType[];
  setCheckBoxValues: Dispatch<SetStateAction<CheckboxValueType[]>>;
};

export const TheList = ({ checkBoxValues, setCheckBoxValues }: Props) => {
  const dispatch = useAppDispatch();

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const todos = useAppSelector(selectTodos);

  const handleSingleItemDeletion = useCallback((todo: TodoItem) => {
    handleTodoDeletion(() => {
      dispatch(deleteSingleTodo(todo));
    });
  }, [dispatch]);

  const handleCheckBoxChange = (checkedValues: CheckboxValueType[]) => {
    setCheckBoxValues(checkedValues);
    setIndeterminate(
      !!checkedValues.length && checkedValues.length < todos.length,
    );
    setCheckAll(checkedValues.length === todos.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckBoxValues(e.target.checked ? todos.map((todo) => todo.id) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div className={styles.listWrapper}>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Выделить все
      </Checkbox>

      <List size="small" bordered className={styles.content}>
        <Checkbox.Group
          className={styles.checkboxWrapper}
          value={checkBoxValues}
          onChange={handleCheckBoxChange}
        >
          {todos.map((todo) => (
            <List.Item key={todo.id}>
              <Checkbox value={todo.id}>{todo.title}</Checkbox>
              <DeleteFilled
                className={styles.deleteBtn}
                onClick={() => handleSingleItemDeletion(todo)}
              />
            </List.Item>
          ))}
        </Checkbox.Group>
      </List>
    </div>
  );
};
