import { FC, useState } from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import {
  Divider, Alert, Button, Modal,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './TodoListLayout.module.css';

import { TheList } from './TheList/TheList';
import { deleteMultipleTodos, selectTodos } from '../../../features/todos/todos';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const { confirm } = Modal;

export const TodoListLayout: FC = () => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const [checkBoxValues, setCheckBoxValues] = useState<CheckboxValueType[]>([]);

  const handleMultipleItemDeletion = (list: CheckboxValueType[]) => {
    confirm({
      title: 'Вы уверены, что хотите удалить данный элемент?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        dispatch(deleteMultipleTodos(list));
        setCheckBoxValues([]);
      },
    });
  };

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
          onClick={() => handleMultipleItemDeletion(checkBoxValues)}
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
