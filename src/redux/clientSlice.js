import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
   name: 'client',
   initialState: {
      overlay: false,
      trailer: '',
      toastMessage: [],
      loading: false,
   },
   reducers: {
      startLoading: (state) => {
         state.loading = true;
         return state;
      },
      endLoading: (state) => {
         state.loading = false;
         return state;
      },
      toggleOverlay: (state) => {
         state.overlay = !state.overlay;
         return state;
      },
      setTrailer: (state, action) => {
         state.trailer = action.payload;
         return state;
      },
      addToastMessage: (state, action) => {
         if (!state.toastMessage) {
            state.toastMessage = [];
         }
         state.toastMessage.push(action.payload);
         return state;
      },
      clearToastMessage: (state) => {
         state.toastMessage = [];
         return state;
      },
      removeToastMessage: (state, action) => {
         state.toastMessage = state.toastMessage.filter((toast) => {
            return toast.id !== action.payload;
         });
         return state;
      },
   },
});

export default clientSlice;
