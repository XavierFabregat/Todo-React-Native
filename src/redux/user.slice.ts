import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../Types';

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
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;