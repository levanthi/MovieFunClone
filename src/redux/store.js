import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './clientSlice';
import userSlice from './userSlice';

const store = configureStore({
   reducer: {
      client: clientSlice.reducer,
      user: userSlice.reducer,
   },
});

export default store;
