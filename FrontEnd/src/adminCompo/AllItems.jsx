import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const AllItems = ({ url }) => {
  const products = useSelector(data => data.toys.data);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(products);
  }, [products]);

  const handleRemoveItem = async (id, public_id) => {
    if (!window.confirm('Are you sure you want to delete this toy?')) {
      return;
    }

    setList(list.filter((item) => item._id !== id));
    try {
      const response = await axios.post(`${url}/api/toy/remove`, { id, public_id });
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete item.");
      // Restoring the item if deletion failed
      setList(products);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl md:rounded-2xl p-4 md:p-6 text-white shadow-lg mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg md:rounded-xl flex items-center justify-center">
              <span className="text-xl md:text-2xl">🧸</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">All Toys</h1>
              <p className="text-teal-100 text-sm">Manage your toy inventory</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg md:rounded-xl px-3 py-1 md:px-4 md:py-2 self-end sm:self-center">
            <span className="text-lg font-bold">{list.length}</span>
            <p className="text-teal-100 text-xs md:text-sm">Total Items</p>
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 text-lg">Loading toys...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
          
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-6 py-4 border-b border-teal-200">
            <h2 className="text-xl font-semibold text-teal-800 flex items-center gap-2">
              <span className="text-lg">📦</span>
              Inventory Management
            </h2>
          </div>

          {/* Mobile View */}
          <div className="block sm:hidden">
            <div className="divide-y divide-gray-200">
              {list.map((item) => (
                <div key={item._id} className="p-4 hover:bg-teal-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-teal-600 font-medium">Rs. {item.price}</p>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      
                      <div className="flex gap-2 mt-3">
                        <Link
                          to="/admin/updateitem"
                          state={item}
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item._id, item.image.public_id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((item, index) => (
                  <tr key={item._id} className={`hover:bg-teal-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image.url}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl shadow-md"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 truncate max-w-xs">{item.name}</h3>
                          <p className="text-gray-500 text-sm truncate max-w-xs">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-teal-600">Rs. {item.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to="/admin/updateitem"
                          state={item}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item._id, item.image.public_id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllItems;