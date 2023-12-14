import { createSlice } from "@reduxjs/toolkit";

const localUser = localStorage.getItem("user");
const requestId = localStorage.getItem("requestId");
let user = null,
  role_id = null,
  latitude = null,
  longitude = null,
  request_id = null;
let auth = false;

if (localUser) {
  role_id = localUser.role_id;
  latitude = localUser.latitude;
  longitude = localUser.longitude;

  auth = true;
}
if (requestId) {
  request_id = requestId;
}

const initialAuthState = {
  isAuthenticated: auth,
  user,
  role_id,
  latitude,
  longitude,
  request_id,
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
    setRole(state, action) {
      state.role_id = action.payload;
    },
    setRequestId(state, action) {
      state.request_id = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
