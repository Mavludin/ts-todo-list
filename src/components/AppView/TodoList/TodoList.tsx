import React from 'react';
import { List, Divider, Checkbox } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import styles from './TodoList.module.css';
import { defaultList } from '../../../shared/data';

export const TodoList: React.FC = () => (
  <section className={styles.todoList}>
    <Divider orientation="left">Задачи</Divider>
    <List
      size="small"
      bordered
      className={styles.content}
      dataSource={defaultList}
      renderItem={(todo) => (
        <List.Item
          actions={[
            <DeleteFilled
              className={styles.deleteBtn}
              onClick={() => console.log(todo)}
            />,
          ]}
        >
          <Checkbox>{todo.title}</Checkbox>
        </List.Item>
      )}
    />
  </section>
);
