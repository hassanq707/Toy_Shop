import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import axios from 'axios'

const MyOrders = ({ url }) => {
  const [orders, setOrders] = useState([])
  const [loader, setLoader] = useState(false)
  const { token } = useSelector(data => data.auth)

  const statusStyles = {
    "Packing Toy Box": {
      dot: "bg-orange-500",
      text: "bg-orange-50 text-orange-700"
    },
    "Out for Delivery": {
      dot: "bg-blue-500",
      text: "bg-blue-50 text-blue-700"
    },
    "Delivered": {
      dot: "bg-green-500",
      text: "bg-green-50 text-green-700"
    }
  }

  const fetchOrders = () => {
    setLoader(true);
    setTimeout(async () => {
      try {
        const res = await axios.get(`${url}/api/order/userorders`, {
          headers: { token }
        })
        if (res.data.success) {
          setOrders(res.data.orders)
        }
      } catch (err) {
        toast.error(err.message)
      }
      finally {
        setLoader(false);
      }
    }, 1000)
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto my-8">
      <div className='relative flex items-center justify-between mb-6'>
        <h1 className="text-2xl font-semibold text-gray-800 ">My Orders</h1>
        {orders.length > 0 ? (
          <button
            onClick={fetchOrders}
            className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors"
          >
            {
              !loader ? null : (
                <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center pointer-events-none">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )
            }
            Track Orders
          </button>
        ) : null}

      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 text-lg">You haven't placed any orders yet</p>
          <p className="text-gray-500 mt-2">Your orders will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.slice(0, 3).map((order, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="hidden md:flex items-center p-4 gap-6">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img
                    src={"/images/parcel.png"}
                    alt="parcel"
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div className="min-w-0">
                    <p className="text-gray-800 font-medium truncate">
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.name} ×{item.quantity}
                          {i !== order.items.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                    <p className="text-gray-500 text-sm">Order ID: {order._id.slice(-6)}</p>
                  </div>
                </div>

                <div className="text-gray-700 font-medium w-32 text-right">
                  Rs. {Math.floor(order.amount)}
                </div>

                <div className="flex items-center gap-2 w-40">
                  <div className={`w-2 h-2 rounded-full ${statusStyles[order.status]?.dot}`}></div>
                  <span className={`relative ${statusStyles[order.status]?.text} text-sm font-medium px-3 py-1 rounded-full`}>
                    {
                      !loader ? null : (
                        <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center pointer-events-none">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )
                    }
                    {order.status}
                  </span>
                </div>

              </div>

              {/* Mobile View */}
              <div className="md:hidden p-4">
                <div className="flex items-start gap-4 mb-3">
                  <img
                    src="/images/parcel.png"
                    alt="parcel"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-sm">
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.name} ×{item.quantity}
                          {i !== order.items.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Order ID: {order._id.slice(-6)}</p>
                  </div>
                  <div className="text-gray-700 font-medium">
                    Rs. {Math.floor(order.amount)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusStyles[order.status]?.dot}`}></div>
                    <span className={` relative ${statusStyles[order.status]?.text} text-xs font-medium px-2 py-1 rounded-full`}>
                      {
                        !loader ? null : (
                          <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center pointer-events-none">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )
                      }
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrders