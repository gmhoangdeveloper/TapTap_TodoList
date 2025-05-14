import { createAsyncThunk } from '@reduxjs/toolkit'

// services

export const serviceName = 'todo'

export const getDataAsync = createAsyncThunk(`${serviceName}/todo`, async (data: any) => {
  // const response = await registerAuth(data)
  const response = null
  if (response?.data) {
    return response?.data
  }

  return {
    data: null,
    detail: response?.response?.data?.details,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.rootCause
  }
})
