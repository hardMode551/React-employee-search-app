import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

interface State {
  users: User[]; 
  currentUser: User | null;
  loading: boolean;
  error: string | null; 
}

const initialState: State = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    
  },
});

export const { setUsers, setCurrentUser, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;
