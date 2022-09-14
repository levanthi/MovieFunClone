import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
   name: 'client',
   initialState: {
      overlay: false,
      trailer: '',
   },
   reducers: {
      toggleOverlay: (state) => {
         state.overlay = !state.overlay;
      },
      setTrailer: (state, action) => {
         state.trailer = action.payload;
      },
   },
});

export default clientSlice;
