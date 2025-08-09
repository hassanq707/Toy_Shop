import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import axios from 'axios'
import { clear_user_discount } from '../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { delete_cart_data } from '../store/slices/CartSlice'

const Verify = ({url}) => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId })
      const { success: succ, message } = response.data;
      if (succ) {
        localStorage.removeItem('appliedPromo');
        dispatch(delete_cart_data());
        dispatch(clear_user_discount());
        navigate('/myorders')
      } else {
        navigate('/')
        toast.error(message)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong.")
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-800 border-t-transparent"></div>
    </div>
  )
}

export default Verify
