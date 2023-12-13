import { createSlice } from "@reduxjs/toolkit";

const localUser = localStorage.getItem("user");
let user = null;
let auth = false;

if (localUser) {
  user = {
    role_id: localUser.role_id,
    latitude: localUser.latitude,
    longitude: localUser.longitude,
  };
  auth = true;
}

const initialAuthState = {
  isAuthenticated: auth,
  user: user,
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
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
