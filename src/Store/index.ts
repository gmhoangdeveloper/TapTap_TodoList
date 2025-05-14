// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import todo from '@Store/Todo'


export const store = configureStore({
  reducer: {
    todo,
    // role,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
