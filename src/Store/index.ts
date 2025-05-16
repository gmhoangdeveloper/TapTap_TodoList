
import { configureStore } from '@reduxjs/toolkit';

import { TODO_STORAGE_KEY } from '@Constants/Configs.Constants';
import todo from '@Store/Todo';
import storage from '@Utils/AsyncStorage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const persistMiddleware = (storeAPI: { getState: () => any; }) => (next: (arg0: any) => any) => async (action: any) => {
  const result = next(action);
  const state = storeAPI.getState();
  await storage.setItem(TODO_STORAGE_KEY, state.todo.data);
  return result;
};

export const store = configureStore({
  reducer: {
    todo,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: false
      }
    ).concat(persistMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
