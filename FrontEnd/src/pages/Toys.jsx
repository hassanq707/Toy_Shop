import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Filter, SlidersHorizontal, Grid, List, Star, ShoppingCart, Heart } from 'lucide-react';
import { updateCart } from '../store/actions/cartAction';
import { RiStarFill, RiStarLine, RiHeartLine, RiHeartFill, RiShoppingCart2Line, RiAddLine, RiSubtractLine } from 'react-icons/ri';

const ToysPage = ({ url }) => {
  const dispatch = useDispatch();
  const toy_list = useSelector((state) => state.toys.data);
  const cartCounts = useSelector((state) => state.cart.items);
  const { token } = useSelector((data) => data.auth);

  const toys = toy_list || [];

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(toys.map(toy => toy.category))];
    const categoryData = [
      { name: 'All', icon: '🪀', count: toys.length, color: 'from-teal-100 to-teal-200' }
    ];

    const categoryIcons = {
      'Educational': '📚',
      'Action Figures': '🦸',
      'Dolls': '🪆',
      'Remote Control': '🎮',
      'Building Blocks': '🧱',
      'Puzzles': '🧩',
      'Soft Toys': '🧸'
    };

    const colors = [
      'from-teal-200 to-teal-300',
      'from-teal-300 to-teal-400',
      'from-teal-400 to-teal-500',
      'from-teal-500 to-teal-600',
      'from-teal-600 to-teal-700',
      'from-teal-700 to-teal-800',
      'from-teal-800 to-teal-900'
    ];

    uniqueCategories.forEach((category, index) => {
      categoryData.push({
        name: category,
        icon: categoryIcons[category] || '🎯',
        count: toys.filter(toy => toy.category === category).length,
        color: colors[index % colors.length]
      });
    });

    return categoryData;
  }, [toys]);

  const [filteredToys, setFilteredToys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Get price range from toys
  const maxPrice = useMemo(() => {
    if (toys.length === 0) return 10000;
    return Math.max(...toys.map(toy => parseInt(toy.price) || 0));
  }, [toys]);

  useEffect(() => {
    if (toys.length > 0) {
      setPriceRange([0, maxPrice]);
      setFilteredToys(toys);
    }
  }, [maxPrice, toys]);

  // Filter and sort toys
  useEffect(() => {
    let filtered = toys.filter(toy => {
      const matchesSearch = toy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toy.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || toy.category === selectedCategory;
      const price = parseInt(toy.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort toys
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price) - parseInt(b.price);
        case 'price-high':
          return parseInt(b.price) - parseInt(a.price);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredToys(filtered);
  }, [toys, searchTerm, selectedCategory, priceRange, sortBy]);

  const toggleFavorite = (toyId) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(toyId)) {
      newFavorites.delete(toyId);
    } else {
      newFavorites.add(toyId);
    }
    setFavorites(newFavorites);
  };

  const inc = (id) => dispatch(updateCart(id, "add", token, url));
  const dec = (id) => dispatch(updateCart(id, "remove", token, url));

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange([0, maxPrice]);
    setSortBy('name');
  };

  const RatingStars = ({ rating = 4 }) => {
    const filledStars = Math.floor(rating);
    return (
      <div className="flex space-x-0.5">
        {[...Array(5)].map((_, i) =>
          i < filledStars ?
            <RiStarFill key={i} className="text-yellow-400 text-sm" /> :
            <RiStarLine key={i} className="text-yellow-400/50 text-sm" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">Premium</span> Toys Collection
              </h1>
              <p className="text-gray-600 mt-1">Discover amazing toys for children of all ages</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg border border-teal-200 hover:bg-teal-50 transition-colors"
              >
                {viewMode === 'grid' ?
                  <List className="w-5 h-5 text-teal-600" /> :
                  <Grid className="w-5 h-5 text-teal-600" />
                }
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-colors shadow-md"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-md border border-teal-100 p-6 h-fit`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-teal-600 hover:text-teal-800 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find toys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${selectedCategory === category.name ? 'bg-teal-100 text-teal-800' : 'hover:bg-teal-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="px-2">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Rs. {priceRange[0]}</span>
                  <span>Rs. {priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Sorted content*/}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing <span className="font-medium">{filteredToys.length}</span> results
              </p>
              <div className="lg:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-colors shadow-md"
                >
                  <Filter className="w-4 h-4" />
                  <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredToys.length === 0 ? (
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl p-12 text-center">
                <div className="inline-block bg-white/80 backdrop-blur-sm px-8 py-6 rounded-xl shadow-sm border border-teal-200">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No toys found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search term</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:from-teal-700 hover:to-teal-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  filteredToys.map((item) => (
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
                }
              </div>
            ) : (
              <div className="space-y-4">
                {filteredToys.map((toy) => (
                  <div key={toy._id} className="group flex flex-col sm:flex-row gap-4 bg-gradient-to-br from-teal-700 to-teal-800  rounded-xl shadow-md hover:shadow-xl transition-all duration-300  overflow-hidden">
                    {/* Image */}
                    <div className="sm:w-48 sm:h-48 relative overflow-hidden">
                      <img
                        src={toy.image.url}
                        alt={toy.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-5 flex flex-col text-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{toy.name}</h3>
                          <p className="text-sm mb-3">{toy.description}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(toy._id); }}
                          className="hover:text-red-500 transition-colors"
                        >
                          {favorites.has(toy._id) ? (
                            <RiHeartFill className="text-xl" />
                          ) : (
                            <RiHeartLine className="text-xl" />
                          )}
                        </button>
                      </div>

                      <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          {toy.originalPrice && (
                            <p className="text-gray-400 text-sm line-through">
                              Rs.{toy.originalPrice}
                            </p>
                          )}
                          <p className=" font-bold text-lg">
                            Rs.{toy.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <RatingStars rating={toy.rating || 4} />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); dec(toy._id); }}
                              className="w-8 h-8 bg-red-400  rounded-full flex items-center justify-center hover:bg-teal-200 "
                            >
                              <RiSubtractLine />
                            </button>
                            <span className=" text-sm w-4 text-center">
                              {cartCounts[toy._id] || 0}
                            </span>
                            <button
                              onClick={(e) => { e.stopPropagation(); inc(toy._id); }}
                              className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-teal-700 "
                            >
                              <RiAddLine />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToysPage;