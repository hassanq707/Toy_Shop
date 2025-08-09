import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { clear_token, set_token, set_name, clear_name } from "../store/slices/TokenSlice";
import { delete_cart_data } from "../store/slices/CartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { set_user_profile } from "../store/slices/userSlice";

const Navbar = ({ setShowLoginInPopUp, url }) => {
  const cartCount = useSelector(data => data.cart.items);
  const { token, name } = useSelector(data => data.auth);
  const profile = useSelector(data => data.user.profile);
  const cartItemCount = Object.keys(cartCount).length;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkStyle = (isActive) =>
    `relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[3px] font-semibold transition-all duration-300 ${
      isActive
        ? "after:w-full after:bg-teal-600 text-teal-700"
        : "after:w-0 after:bg-transparent text-gray-700 hover:text-teal-700 hover:after:bg-teal-600 hover:after:w-full"
    }`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      dispatch(set_token(token));
      dispatch(set_name(name));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [searchOpen]);

  const handleLogout = () => {
    navigate('/');
    dispatch(clear_token());
    dispatch(clear_name());
    dispatch(delete_cart_data());
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setDropdownOpen(false);
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const res = await axios.post(`${url}/api/user/profile`, formData, {
        headers: { token },
      });
      toast.success(res.data.message);
      dispatch(set_user_profile(res.data.image));
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-lg border-b border-teal-100' : 'shadow-md'
      }`}>
        <div className="w-[95%] lg:w-[90%] mx-auto flex items-center justify-between py-3 sm:py-3">
          
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4 ">
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-teal-50 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`ri-${mobileMenuOpen ? 'close-line' : 'menu-line'} text-xl text-gray-700 hover:text-teal-700`}></i>
            </button>

            <Link to="/" className="group">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white text-xl font-bold">LC</span>
                </div>
                <h1 className="text-xl hidden sm:block sm:text-2xl md:text-3xl text-gray-800 font-bold">
                  Little <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-700">Champs</span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex gap-8 text-[16px] md:text-[18px]">
            <NavLink to="/" className={({ isActive }) => linkStyle(isActive)}>
              Home
            </NavLink>
            <NavLink 
              to="/toys" 
              className={({ isActive }) => linkStyle(isActive)}
            >
              Toys
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => linkStyle(isActive)}
            >
              Contact us
            </NavLink>
          </nav>

          {/* Search, Cart & Profile */}
          <div className="flex md:-ml-20 items-center sm:gap-2 lg:gap-4">
            <button 
              className="p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal-50 transition-colors duration-300"
              onClick={() => setSearchOpen(true)}
            >
              <i className="ri-search-line text-xl text-gray-700 hover:text-teal-700"></i>
            </button>
            
            <Link to="/cart" className="relative group">
              <div className="relative p-2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-teal-50 transition-colors duration-300">
                <i className="ri-shopping-bag-line text-xl sm:text-2xl text-gray-700 group-hover:text-teal-700 transition-colors duration-300"></i>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </div>
            </Link>

            {token ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 cursor-pointer group p-2 rounded-full hover:bg-teal-50 transition-colors duration-300"
                >
                  <div className="relative">
                    <img
                      src={profile || "/images/default.png"}
                      alt="user"
                      className="w-9 sm:w-10 md:w-11 h-9 sm:h-10 md:h-11 object-cover rounded-full border-2 border-teal-200 group-hover:border-teal-400 transition-colors duration-300 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-sm md:text-base text-gray-700 font-medium">{name}</span>
                    <i className={`ri-arrow-down-s-line text-gray-500 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                  </div>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-teal-100 z-50 overflow-hidden backdrop-blur-md">
                    
                    <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 border-b border-teal-200">
                      <div className="flex items-center gap-3">
                        <img
                          src={profile || "/images/default.png"}
                          alt="user"
                          className="w-12 h-12 object-cover rounded-full border-2 border-teal-300"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">{name}</h4>
                          <p className="text-sm text-teal-600">Premium Member</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/myorders"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-teal-50 text-gray-700 text-sm font-medium transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-200">
                          <i className="ri-file-list-3-line text-lg text-teal-600"></i>
                        </div>
                        <span>My Orders</span>
                        <i className="ri-arrow-right-s-line text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
                      </Link>

                      <label
                        htmlFor="profile-upload"
                        className="flex items-center gap-4 px-5 py-3 hover:bg-teal-50 text-gray-700 text-sm font-medium cursor-pointer transition-colors duration-200 group"
                      >
                        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-200">
                          <i className="ri-image-add-line text-lg text-teal-600"></i>
                        </div>
                        <span>{profile ? "Change Profile" : "Upload Profile"}</span>
                        <i className="ri-arrow-right-s-line text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
                      </label>
                      <input
                        type="file"
                        id="profile-upload"
                        accept="image/*"
                        hidden
                        onChange={handleProfileUpload}
                      />

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-4 w-full text-left px-5 py-3 hover:bg-red-50 text-gray-700 text-sm font-medium transition-colors duration-200 group"
                        >
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                            <i className="ri-logout-box-r-line text-lg text-red-600"></i>
                          </div>
                          <span>Logout</span>
                          <i className="ri-arrow-right-s-line text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginInPopUp(true)}
                className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Items */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 flex flex-col gap-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-teal-50'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/toys" 
                className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-teal-50'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Toys
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-700 hover:bg-teal-50'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
              </NavLink>
              
              {!token && (
                <button
                  onClick={() => {
                    setShowLoginInPopUp(true);
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">

          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          ></div>
          
          <div 
            ref={searchRef}
            className="relative bg-white shadow-2xl w-full max-w-3xl mx-auto mt-20 rounded-xl overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-teal-800">Search Products</h3>
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <i className="ri-close-line text-xl text-gray-500"></i>
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full px-5 py-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-md lg:text-lg transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-700 transition-colors duration-300"
                >
                  <i className="ri-search-line text-2xl"></i>
                </button>
              </div>
            </form>
            
            {/* Search Suggestions */}
            <div className="px-4 pb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    setSearchQuery("Educational Toys");
                    document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 rounded-full text-sm transition-colors duration-200"
                >
                  Educational Toys
                </button>
                <button 
                  onClick={() => {
                    setSearchQuery("Dolls");
                    document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 rounded-full text-sm transition-colors duration-200"
                >
                  Dolls
                </button>
                <button 
                  onClick={() => {
                    setSearchQuery("Building Blocks");
                    document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true }));
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 rounded-full text-sm transition-colors duration-200"
                >
                  Building Blocks
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;