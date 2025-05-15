import { createAsyncThunk } from '@reduxjs/toolkit'


export const serviceName = 'todo'

export const getDataAsync = createAsyncThunk(`${serviceName}/list-todo`, async (data: any) => {

})
