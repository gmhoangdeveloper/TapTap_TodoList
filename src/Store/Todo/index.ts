import { createSlice } from '@reduxjs/toolkit';

import { serviceName } from './actions';
import { ITodo } from '@Models/Todo/model';

type TInitialState = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  data: ITodo[]
}

const initialState: TInitialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  data: []
};

export const todoSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.data = [];
    },
    addTodo: (state, action) => {
      state.data = [...state.data, action?.payload];
    },
    removeItemTodo: (state, action) => {
      const todo = state.data.filter((item) => item.id !== action?.payload);
      state.data = todo;
    },
    updateItemTodo: (state, action) => {
      const todo = [...state.data].map((item) => item.id === action.payload?.id ? action?.payload : item);
      state.data = todo;
    },
    setTodo: (state, action) => {
      state.data = action?.payload;
    }
  },
  extraReducers: builder => { }
});

export default todoSlice.reducer;
export const { resetInitialState, addTodo, setTodo, removeItemTodo, updateItemTodo } = todoSlice.actions;
