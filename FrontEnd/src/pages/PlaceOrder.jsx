import React, { useEffect, useState } from 'react';
import Cart_Details from '../components/Cart_Details';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios"
import { clear_user_discount, set_user_discount } from '../store/slices/userSlice';

const PlaceOrder = ({ url }) => {
  const { token } = useSelector(data => data.auth)
  const { items: cartItems } = useSelector(data => data.cart)
  const { data } = useSelector(data => data.toys)
  const { discount } = useSelector(data => data.user)
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    province: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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
        dispatch(clear_user_discount());
      } else {
        dispatch(set_user_discount(promoData.discount));
      }
    }
  }, []);


  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();

    for (let key in formData) {
      if (formData[key].trim() === "") {
        toast.error("Please fill out all fields.");
        return;
      }
    }

    const orderItems = data
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));

    let subtotal = orderItems.reduce((total, item) => (
      total += item.price * cartItems[item._id]
    ), 0);

    subtotal -= subtotal * (discount / 100);

    let orderData = {
      address: formData,
      items: orderItems,
      amount: subtotal + 200,
      discount: discount || 0, 
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      const { success, message, session_url } = response.data;

      if (success) {
        setFormData({ firstName: '', lastName: '', email: '', street: '', city: '', province: '', zipcode: '', country: '', phone: '' });
        window.location.replace(session_url);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }finally{
      setLoader(false)
    }
  };

  return (
    <div className="w-[85%] mx-auto my-10">
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="w-full lg:w-1/2 border border-gray-300 rounded-lg p-6 bg-white shadow">
          <h2 className="text-gray-800 text-2xl font-semibold mb-6">Delivery Information</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                type="text"
                required
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
            <input
              type="text"
              name="street"
              required
              placeholder="Street Address"
              value={formData.street}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
            <div className="flex gap-4">
              <input
                type="text"
                required
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <input
                type="text"
                name="province"
                required
                placeholder="Province"
                value={formData.province}
                onChange={handleInputChange}
                className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                name="zipcode"
                required
                placeholder="Zip Code"
                value={formData.zipcode}
                onChange={handleInputChange}
                className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none"
              />
              <input
                type="text"
                name="country"
                required
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-1/2 border border-gray-300 rounded-md p-2 focus:outline-none"
              />
            </div>
            <input
              type="text"
              name="phone"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </form>
        </div>

        <div className="w-full lg:w-1/2">
          <Cart_Details loader = {loader} message="Payment" url="" order={true} onSubmit={handleSubmit} />
        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;



