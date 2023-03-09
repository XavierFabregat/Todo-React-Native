import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../Types';

const initialState: User = {
  id: '',
  username: '',
  avatarUrl: '',
  createdAt: '',
  updatedAt: '',
  todos: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
    updateUser(_, action: PayloadAction<User>) {
      return action.payload;
    },
    removeUser() {
      return initialState;
    }
  }
});

export const { setUser , updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;