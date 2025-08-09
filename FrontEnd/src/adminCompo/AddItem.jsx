import React, { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

const AddItem = ({ url }) => {
  const categories = [
    "All",
    "Educational",
    "Action Figures",
    "Dolls",
    "Remote Control",
    "Building Blocks",
    "Puzzles",
    "Soft Toys"
  ];

  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Action Figures',
    price: '',
  });

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChangeFunc = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmitFunc = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/toy/add`, formData);
      const { success, message } = response.data;
      if (success) {
        setData({
          name: '',
          description: '',
          category: 'Action Figures',
          price: '',
        });
        setImage(false);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-xl md:text-2xl">🧸</span>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Add New Toy</h1>
            <p className="text-teal-100 text-sm md:text-md">Create a new product for your store</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-teal-100 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-8 py-6 border-b border-teal-200">
          <h2 className="text-xl font-semibold text-teal-800 flex items-center gap-2">
            <span className="text-lg">📝</span>
            Product Information
          </h2>
        </div>

        <form className="p-4 md:p-8 space-y-8" onSubmit={handleSubmitFunc}>

          <section className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Product Image
            </label>
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <label
                htmlFor="image"
                className="group relative flex items-center justify-center w-40 h-40 bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600 rounded-2xl border-2 border-dashed border-teal-300 cursor-pointer hover:from-teal-100 hover:to-teal-200 hover:border-teal-400 transition-all duration-300 overflow-hidden"
              >
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-medium">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Upload Image</span>
                    <span className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</span>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {image && (
                <div className="flex-1 space-y-2">
                  <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                    <h3 className="font-semibold text-teal-800 mb-2">Selected File:</h3>
                    <p className="text-gray-700 font-medium">{image.name}</p>
                    <p className="text-gray-500 text-sm">Size: {Math.round(image.size / 1024)} KB</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              Toy Name
            </label>
            <input
              type="text"
              value={data.name}
              name="name"
              onChange={handleChangeFunc}
              placeholder="Enter toy name (e.g., Super Hero Action Figure)"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 transition-all duration-300 text-gray-700"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              Description
            </label>
            <textarea
              rows={4}
              value={data.description}
              name="description"
              onChange={handleChangeFunc}
              placeholder="Describe the toy's features, age group, and benefits..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 transition-all duration-300 text-gray-700 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                onChange={handleChangeFunc}
                value={data.category}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 transition-all duration-300 text-gray-700 bg-white"
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-700">
                Price (Rs.)
              </label>
              <input
                type="number"
                value={data.price}
                name="price"
                required
                onChange={handleChangeFunc}
                placeholder="0"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 transition-all duration-300 text-gray-700"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  Adding Toy...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Add Toy to Store
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;