import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  token: null,
  name : null,
  isAdmin : false,
};

const tokenSlice = createSlice({
  name: "auth", 
  initialState: initial_state,
  reducers: {
    set_token: (state, action) => {
      state.token = action.payload;
    },
    clear_token: (state) => {
      state.token = null;
    },
    set_name : (state,action) => {
      state.name = action.payload;
    },
    clear_name: (state) => {
      state.name = null;
    },
    set_admin_auth : (state) => {
      state.isAdmin = true;
    },
    clear_admin_auth : (state) => {
      state.isAdmin = false;
    }
  },
});

export const { set_token, clear_token , set_name,clear_name,set_admin_auth,clear_admin_auth} = tokenSlice.actions;
export default tokenSlice.reducer;
