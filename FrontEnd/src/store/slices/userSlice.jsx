import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  discount : 0
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
    set_user_profile: (state,action) => {
        state.profile = action.payload
    },
    set_user_discount: (state,action) => {
        state.discount = action.payload
    },
    clear_user_discount: (state,action) => {
        state.discount = 0
    },
  },
});

export const { set_user_profile,set_user_discount,clear_user_discount} = userSlice.actions;
export default userSlice.reducer;
