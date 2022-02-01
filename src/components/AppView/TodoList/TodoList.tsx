import React from 'react';
import {
  List, Divider, Checkbox, Modal, Alert,
} from 'antd';
import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './TodoList.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  deleteSingleTodo,
  ITodo,
  selectTodos,
} from '../../../features/todos/todos';

const { confirm } = Modal;

export const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const handleItemDeletion = (todo: ITodo) => {
    confirm({
      title: 'Вы уверены, что хотите удалить данный элемент?',
      icon: <ExclamationCircleOutlined />,
      okType: 'danger',
      onOk() {
        dispatch(deleteSingleTodo(todo));
      },
    });
  };

  return (
    <section className={styles.todoList}>
      <Divider orientation="left">Задачи</Divider>
      {todos.length > 0 ? (
        <List
          size="small"
          bordered
          className={styles.content}
          dataSource={todos}
          renderItem={(todo) => (
            <List.Item
              actions={[
                <DeleteFilled
                  className={styles.deleteBtn}
                  onClick={() => handleItemDeletion(todo)}
                />,
              ]}
            >
              <Checkbox>{todo.title}</Checkbox>
            </List.Item>
          )}
        />
      ) : (
        <Alert
          message="Список задач пуст!"
          description="Добавьте новую задачу."
          type="info"
          showIcon
        />
      )}
    </section>
  );
};
