import axios from "axios";
import { toast } from "react-toastify";
import { incrementItem, decrementItem } from "../slices/CartSlice";

const updateCart = (itemId, action, token, url) => async (dispatch) => {
  
  if (action === "add") dispatch(incrementItem(itemId));
  if (action === "remove") dispatch(decrementItem(itemId));

  try {
    const response = await axios.post(
      `${url}/api/cart/addRemove`,
      { itemId, action },
      { headers: { token } }
    );

    const { success, message } = response.data;

    if (!success) {
      toast.error(message);

      //  Rollback if backend says error
      if (action === "add") dispatch(decrementItem(itemId));
      if (action === "remove") dispatch(incrementItem(itemId));
    }
  } catch (err) {
    console.error("Cart API Error", err);
    toast.error("Server error");

    // Rollback on API failure
    if (action === "add") dispatch(decrementItem(itemId));
    if (action === "remove") dispatch(incrementItem(itemId));
  }
};

export { updateCart };
