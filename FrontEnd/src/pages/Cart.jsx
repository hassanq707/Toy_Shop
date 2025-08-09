import { useSelector, useDispatch } from 'react-redux';
import { remove_from_cart } from '../store/slices/CartSlice';
import { toast } from 'react-toastify';
import Cart_Details from '../components/Cart_Details';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { clear_user_discount, set_user_discount } from '../store/slices/userSlice';

const Cart = ({ url }) => {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.items);
  const { token } = useSelector((data) => data.auth);
  const toy_list = useSelector((state) => state.toys.data);
  const itemsInCart = toy_list.filter((item) => cartCount[item._id] > 0);
  const [promo, setPromo] = useState("")
  const [promoResult, setPromoResult] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleRemoveItem = async (id) => {
    
  dispatch(remove_from_cart(id));
  setLoader(false)
  try {
    const response = await axios.post(
      `${url}/api/cart/remove`,
      { id },
      { headers: { token } }
    );

    const { success, message } = response.data;

    if (!success) {
      toast.error(message);
      // Rollback 
      dispatch({
        type: "cart/incrementItem",
        payload: id
      });
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong");

    // Rollback on network/server error
    dispatch({
      type: "cart/incrementItem",
      payload: id
    });
  }finally{
   setLoader(false)
  }
};

  useEffect(() => {
    const savedPromo = localStorage.getItem('appliedPromo');
    if (savedPromo) {
      const promoData = JSON.parse(savedPromo);
      const promoDate = new Date(promoData.date);
      const now = new Date();
      const diffInMs = now - promoDate;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 2) {
        localStorage.removeItem('appliedPromo');
        setPromoResult(null);
        dispatch(clear_user_discount());
      } else {
        setPromoResult(promoData);
        dispatch(set_user_discount(promoData.discount));
      }
    }
  }, []);



  const handlePromoCode = async () => {
    try {
      if (promoResult && promoResult.promo === promo) {
        toast.info("Promo code already applied.");
        return;
      }

      const response = await axios.post(
        `${url}/checkPromo`,
        { promo },
        { headers: { token } }
      );

      const { success, message, reason } = response.data;

      if (success) {
        toast.success(message);
        const promoData = {
          promo,
          discount: response.data.discount,
          date: new Date().toISOString()
        };
        setPromoResult(promoData);
        dispatch(set_user_discount(response.data.discount));
        localStorage.setItem('appliedPromo', JSON.stringify(promoData));
      } else {
        setPromoResult(null);
        if (reason === 'invalid') toast.error("Invalid Promo Code.");
        else if (reason === 'used') toast.error("Promo code already used.");
        else toast.error(message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-[90%] md:w-[85%] mx-auto my-8">
      {itemsInCart.length === 0 ? (
        <div className="h-[30vh] flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-xl sm:text-2xl text-center">
            Your cart is empty. Start Adding Premium Toy items!
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-auto border border-gray-300 rounded-lg mb-6">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead className="bg-teal-700">
                <tr className="text-white">
                  <th className="p-2 sm:p-3 border-b border-gray-300">Items</th>
                  <th className="p-2 sm:p-3 border-b border-gray-300">Title</th>
                  <th className="p-2 sm:p-3 border-b border-gray-300">Price</th>
                  <th className="p-2 sm:p-3 border-b border-gray-300">Quantity</th>
                  <th className="p-2 sm:p-3 border-b border-gray-300">Total</th>
                  <th className="p-2 sm:p-3 border-b border-gray-300">Remove</th>
                </tr>
              </thead>
              <tbody>
                {itemsInCart.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200">
                    <td className="p-2 sm:p-3">
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 sm:p-3 max-w-[140px] sm:max-w-[200px] truncate">
                      {item.name}
                    </td>
                    <td className="p-2 sm:p-3">{item.price}</td>
                    <td className="p-2 sm:p-3">{cartCount[item._id]}</td>
                    <td className="p-2 sm:p-3">{item.price * cartCount[item._id]}</td>
                    <td
                      onClick={() => handleRemoveItem(item._id)}
                      className="px-4 text-red-600 cursor-pointer text-2xl hover:underline"
                    >
                      &times;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-[65%]">
              <Cart_Details loader = {loader} message="Checkout" url="order" />
            </div>

            <div className="w-full lg:w-[35%] border border-gray-300 rounded-lg p-5 sm:p-6 bg-white shadow">
              <p className="mb-3 text-gray-700 text-sm sm:text-base">
                If you have a promo code, enter it here:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  onChange={(e) => setPromo(e.target.value)}
                  value={promo}
                  placeholder="Promo code"
                  className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none"
                />
                <button
                  onClick={handlePromoCode}
                  className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800"
                >
                  Apply
                </button>
              </div>

              {promoResult && (
                <div className='mt-4 flex items-center justify-between text-green-600 text-sm'>
                  <p >
                    Promo applied! Discount: {promoResult.discount}%
                  </p>
                  <p>
                    Promo : {promoResult.promo}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;




