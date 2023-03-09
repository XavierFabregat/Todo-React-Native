import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../Types';

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState : initialState,
  reducers: {
    setTodos(_, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const index = state.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      console.log('deleteTodo', action.payload);
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodoComplete(state, action: PayloadAction<string>) {
      const index = state.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state[index].completed = !state[index].completed;
      }
    }
  }
});

export const { setTodos, addTodo, updateTodo, deleteTodo, toggleTodoComplete } = todoSlice.actions;
export default todoSlice.reducer;