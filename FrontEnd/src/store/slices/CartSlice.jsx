import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    set_cart_items : (state,action)=>{
      state.items = action.payload
    }, 
    incrementItem: (state, action) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    decrementItem: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id] -= 1;
        if (state.items[id] <= 0) {
          delete state.items[id];
        }
      }
    },
    remove_from_cart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },
    delete_cart_data : (state,action) => {
      state.items = {}
    }   
  },
});

export const { incrementItem, decrementItem , remove_from_cart,set_cart_items , delete_cart_data} = cartSlice.actions;
export default cartSlice.reducer;
