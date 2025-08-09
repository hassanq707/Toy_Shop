import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";
import { updateCart } from "../store/actions/cartAction";

const RatingStars = ({ rating = 4 }) => {
  const filledStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <div className="flex space-x-0.5">
      {[...Array(totalStars)].map((_, i) => (
        <i
          key={i}
          className={`ri-star-${i < filledStars ? "fill" : "line"} text-yellow-400 text-md`}
        ></i>
      ))}
    </div>
  );
};

const Home = ({ url }) => {
  const dispatch = useDispatch();
  const cartCounts = useSelector((state) => state.cart.items);
  const toy_list = useSelector(state => state.toys.data);
  const { token } = useSelector((data) => data.auth);
  const [category, setCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      category === "All"
        ? toy_list
        : toy_list.filter((i) => i.category === category)
    );
  }, [category, toy_list]);

  const inc = (id) => dispatch(updateCart(id, "add", token, url));
  const dec = (id) => dispatch(updateCart(id, "remove", token, url));

  return (
    <>
      <Header />
      <Menu category={category} setCategory={setCategory} />

      <div className="w-[90%] mx-auto">
        <div className="py-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredData.length === 0 ? (
              <div className="col-span-full w-full text-center py-16">
                <div className="inline-block bg-teal-50 text-teal-700 px-6 py-4 rounded-xl shadow-md text-xl font-semibold">
                  😕 No toys available in this category.
                </div>
              </div>
            ) : (
              filteredData.map((item) => (
                <div
                  key={item._id}
                  className="relative rounded-xl overflow-hidden bg-white border border-gray-100 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >

                  <div className="relative w-full h-72 sm:h-56 md:h-60 overflow-hidden">
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                 
                    {/* Cart Controls */}
                    <div className={`absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl flex items-center gap-2 p-1 transition-all duration-500 ${cartCounts[item._id] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dec(item._id);
                        }}
                        className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl flex items-center justify-center hover:from-red-600 hover:to-red-700  shadow-md active:scale-95"
                      >
                        <i className="ri-subtract-line text-sm"></i>
                      </button>
                      <span className="text-gray-800 font-semibold text-sm px-2">
                        {cartCounts[item._id] || 0}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          inc(item._id);
                        }}
                        className="w-8 h-8 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl flex items-center justify-center hover:from-teal-700 hover:to-teal-800  shadow-md active:scale-95"
                      >
                        <i className="ri-add-line text-sm"></i>
                      </button>
                    </div>

                    {/* Add Button */}
                    <div
                      className={`absolute bottom-4 right-4 transition-all duration-500 ${cartCounts[item._id] ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        inc(item._id);
                      }}
                    >
                      <button
                        className="w-12 h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
                      >
                        <i className="ri-shopping-cart-2-line text-lg"></i>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 relative z-10 bg-gradient-to-br from-teal-700 to-teal-800 text-white">
                    <div className="mb-2">
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-teal-100 transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-teal-100 text-sm mb-3 line-clamp-2 leading-relaxed opacity-90">
                      {item.description}
                    </p>

                    <div className="flex items-end justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-bold text-xl">
                            Rs.{item.price}
                          </p>
                        </div>
                      </div>
                      <div className="text-right pb-1">
                        <RatingStars rating={item.rating || 4} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Testimonials />
    </>
  );
};

export default Home;


