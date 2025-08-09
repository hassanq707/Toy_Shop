import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    data: []
}

const ToySlice = createSlice({
  name: "toys",
  initialState: initial_state,
  reducers: {
    set_toys_data: (state, action) => {
      state.data = action.payload;
    },
    update_toy_item: (state, action) => {
      const updatedItem = action.payload;
      state.data = state.data.map(item => 
        item._id === updatedItem._id ? updatedItem : item
      );
    }
  },
});

export const { set_toys_data, update_toy_item } = ToySlice.actions; 
export default ToySlice.reducer;