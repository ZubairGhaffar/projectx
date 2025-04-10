import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  status: 'idle',
  error: null,
  selectedCompany: 'All',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://dummyjson.com/c/9bf7-4fb5-4067-8496');
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedCompany(state, action) {
      state.selectedCompany = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCompany } = usersSlice.actions;

export const selectFilteredUsers = (state) => {
  if (state.users.selectedCompany === 'All') {
    return state.users.users;
  }
  return state.users.users.filter(
    (user) => user.company.name === state.users.selectedCompany
  );
};

export const selectCompanyNames = (state) => {
  const companies = state.users.users.map((user) => user.company.name);
  return ['All', ...new Set(companies)];
};

export default usersSlice.reducer;
