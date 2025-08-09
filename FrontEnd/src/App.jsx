import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router';
import Footer from './components/Footer';
import LoginPopUp from './components/LoginPopUp';
import { useDispatch, useSelector } from 'react-redux';
import { set_toys_data } from './store/slices/ToySlice';
import { set_cart_items } from './store/slices/CartSlice'
import { toast } from 'react-toastify';
import { set_user_profile } from './store/slices/userSlice'
import axios from 'axios';


const App = ({ url }) => {
  const { token } = useSelector(state => state.auth);
  const [showLoginInPopUp, setShowLoginInPopUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${url}/api/toy/list`);
        const { success } = response.data;
        if (success) {
          dispatch(set_toys_data(response.data.data));
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, []);


  useEffect(() => {
    if (token) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(`${url}/api/cart/get`, {
            headers: { token }
          })
          if (response.data.success) {
            dispatch(set_cart_items(response.data.cartData))
          }
        } catch (err) {
          toast.err(err);
        }
      }
      fetchCartItems()
    }
  }, [token])


  useEffect(() => {
    if (token) {
      const fetchUserImage = async () => {
        try {
          const response = await axios.get(`${url}/api/user/getprofile`, {
            headers: { token },
          });
          const { success } = response.data;
          if (success) {
            dispatch(set_user_profile(response.data.image));
          } else {
            toast.error(response.data.message);
          }
        } catch (err) {
          toast.error("Error fetching profile");
          console.log(err);
        }
      };

      fetchUserImage();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      {showLoginInPopUp && <LoginPopUp onClose={() => setShowLoginInPopUp(false)} url={url} />}
      <Navbar setShowLoginInPopUp={setShowLoginInPopUp} url={url} />
      <div className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-12 w-12 rounded-full border-4 border-t-teal-700 border-r-transparent border-b-teal-700 border-l-transparent animate-spin"></div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <div id="contact-us">
        <Footer />
      </div>
    </div>
  );
};

export default App;
