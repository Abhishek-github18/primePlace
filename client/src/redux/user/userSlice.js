import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.currentUser = null;
      state.error = action.payload;
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    updateProfileFails: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
    deleteUserFails: (state) => {
      state.loading = false;
    },
    signOutStart: (state)=>{
      state.loading = true;
    },
    signOutSuccess: (state)=>{
      state.currentUser = null;
      state.loading = false;
    },
    signOutFailure: (state)=>{
      state.loading = false;
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateProfileSuccess,
  updateProfileFails,
  deleteUserFails,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
  signOutSuccess,
  signOutFailure
} = userSlice.actions;
export default userSlice.reducer;
