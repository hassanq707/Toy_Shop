import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const statusArr = [
    "Packing Toy Box",
    "Out for Delivery",
    "Delivered"
  ];

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/listorders`);
      if (res.data.success) {
        setOrders(res.data.orders.filter(elem => elem.payment === true));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (e, orderId) => {
    try {
      const res = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value
      });
      if (res.data.success) {
        await fetchOrders();
        toast.success('Order status updated successfully!');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Packing Toy Box":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Out for Delivery":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Packing Toy Box":
        return "📦";
      case "Out for Delivery":
        return "🚚";
      case "Delivered":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">


      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center">
              <span className="text-xl md:text-2xl">📋</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Order Management</h1>
              <p className="text-teal-100 text-sm">Track and manage toy deliveries</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg md:rounded-xl px-3 py-1 md:px-4 md:py-2 self-end sm:self-center">
            <span className="text-lg font-bold">{orders.length}</span>
            <p className="text-teal-100 text-xs md:text-sm">Total Orders</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
              <p className="text-gray-500 text-lg">Loading orders...</p>
            </div>
          </div>
        ) : (
          orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-teal-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >

              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 border-b border-teal-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <img
                        src="/images/parcel.png"
                        alt="parcel"
                        className="w-10 h-10 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p className="text-gray-600">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    <div className="text-center sm:text-right">
                      <p className="text-2xl font-bold text-teal-600">Rs. {order.amount}</p>
                      <p className="text-gray-500 text-sm">{order.items.length} items</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getStatusIcon(order.status)}</span>
                      <select
                        onChange={(e) => handleStatusChange(e, order._id)}
                        value={order.status}
                        className={`px-4 py-2 rounded-xl border-2 font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-100 ${getStatusColor(order.status)}`}
                      >
                        {statusArr.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-lg">🧸</span>
                  Ordered Toys
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="bg-teal-50 rounded-xl p-3 border border-teal-200">
                      <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                      <p className="text-teal-600 font-semibold text-sm">Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-lg">📍</span>
                    Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Name:</span>
                      <p className="text-gray-900">{order.address.firstName} {order.address.lastName}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">City:</span>
                      <p className="text-gray-900">{order.address.city}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Province:</span>
                      <p className="text-gray-900">{order.address.province}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Country:</span>
                      <p className="text-gray-900">{order.address.country}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Phone:</span>
                      <p className="text-gray-900">{order.address.phone}</p>
                    </div>
                    {order.address.email && (
                      <div>
                        <span className="font-medium text-gray-600">Email:</span>
                        <p className="text-gray-900">{order.address.email}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {orders.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-12 text-center">
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📋</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600">Orders will appear here once customers start purchasing toys.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;