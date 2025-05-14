// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import {
  serviceName
} from './actions'

// Type

type TInitialState = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string
  data: null
}

const initialState: TInitialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  data: null
}

export const todoSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
      state.data = null
    }
  },
  extraReducers: builder => { }
})

export default todoSlice.reducer
export const { resetInitialState } = todoSlice.actions
