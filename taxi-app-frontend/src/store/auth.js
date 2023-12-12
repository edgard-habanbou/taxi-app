import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  isDriver: false,
  currentRequestId: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setIsDriver(state) {
      state.isDriver = true;
    },
    setIsPassenger(state) {
      state.isDriver = false;
    },
    setCurrentRequestId(state, action) {
      state.currentRequestId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
