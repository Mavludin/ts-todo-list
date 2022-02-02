import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { RootState } from '../../app/store';

export interface ITodo {
  id: number;
  title: string;
}

interface TodosState {
  todos: Array<ITodo>;
}

const initialState: TodosState = {
  todos: [
    {
      id: 1,
      title: 'Покрасить забор',
    },
    {
      id: 2,
      title: 'Сделать домашку',
    },
    {
      id: 3,
      title: 'Покормить кота',
    },
    {
      id: 4,
      title: 'Сходить в зал',
    },
  ],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteSingleTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos = [...state.todos].filter(
        (todo) => todo.id !== action.payload.id,
      );
    },
    deleteMultipleTodos: (state, action: PayloadAction<CheckboxValueType[]>) => {
      state.todos = [...state.todos].filter(
        (item) => item.id !== action.payload.find((num) => num === item.id),
      );
    },
  },
});

export const { addTodo, deleteSingleTodo, deleteMultipleTodos } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export const todosReducer = todosSlice.reducer;
