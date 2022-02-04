import {
  Dispatch, FC, SetStateAction, useState,
} from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
  List, Checkbox, Modal, Button,
} from 'antd';
import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './TheList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  deleteSingleTodo,
  ITodo,
  selectTodos,
} from '../../../../features/todos/todos';

interface IProps {
  checkBoxValues: CheckboxValueType[];
  setCheckBoxValues: Dispatch<SetStateAction<CheckboxValueType[]>>;
}

const { confirm } = Modal;

export const TheList: FC<IProps> = ({ checkBoxValues, setCheckBoxValues }) => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const handleSingleItemDeletion = (todo: ITodo) => {
    confirm({
      title: 'Вы уверены, что хотите удалить данный элемент?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        dispatch(deleteSingleTodo(todo));
      },
    });
  };

  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const handleCheckBoxChange = (checkedValues: CheckboxValueType[]) => {
    setCheckBoxValues(checkedValues);
    setIndeterminate(!!checkedValues.length && checkedValues.length < todos.length);
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

      <List
        size="small"
        bordered
        className={styles.content}
      >
        <Checkbox.Group
          className={styles.checkboxWrapper}
          value={checkBoxValues}
          onChange={handleCheckBoxChange}
        >
          {
            todos.map((todo) => (
              <List.Item key={todo.id}>
                <Checkbox value={todo.id}>
                  {todo.title}
                </Checkbox>
                <DeleteFilled
                  className={styles.deleteBtn}
                  onClick={() => handleSingleItemDeletion(todo)}
                />
              </List.Item>
            ))
          }
        </Checkbox.Group>
      </List>
    </div>
  );
};
