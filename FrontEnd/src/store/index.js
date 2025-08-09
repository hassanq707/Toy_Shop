import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import ToyReducer from "./slices/ToySlice";
import tokenSlice from './slices/TokenSlice'
import userSlice from './slices/userSlice'


const store = configureStore({
  reducer: {
    auth : tokenSlice,
    user : userSlice,
    cart: cartReducer,
    toys: ToyReducer,
  },
});
export default store
