import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaPlus, FaList, FaClipboardList, FaBars, FaTimes, FaRocket, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clear_name, clear_admin_auth } from "../store/slices/TokenSlice";
import axios from "axios";
import { set_toys_data } from "../store/slices/ToySlice";

const AdminLayout = ({ url }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    dispatch(clear_name());
    dispatch(clear_admin_auth());
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchToysItems = async () => {
      try {
        const response = await axios.get(`${url}/api/toy/list`);
        if (response.data.success) {
          dispatch(set_toys_data(response.data.data));
        }
      } catch (err) {
        console.log(err)
      }
    };
    fetchToysItems();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-teal-50 via-teal-25 to-teal-100">
      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-teal-700 to-teal-800 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold">
            LC
          </div>
          <h1 className="text-xl font-bold">Little <span className="text-teal-200">Champs</span></h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Sidebar - Mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'fixed md:relative inset-y-0 left-0 z-50 md:z-auto' : 'hidden'} md:block w-72 bg-gradient-to-b from-teal-800 to-teal-900 text-white shadow-xl transition-all duration-300 h-screen`}
      >
        <div className="p-6 border-b border-teal-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-lg font-bold w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              LC
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">Little Champs</h1>
              <p className="text-teal-200 text-xs md:text-sm">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="relative p-4 md:p-6 space-y-2 md:space-y-3 overflow-y-auto h-[calc(100%-120px)]">
          <NavLink
            to="add-item"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center p-3 md:p-4 rounded-xl transition-all duration-300 group ${isActive
                ? "bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg"
                : "hover:bg-teal-700/50 hover:transform hover:translate-x-1"
              }`
            }
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center mr-3 ${({ isActive }) => isActive ? "bg-white/20" : "bg-teal-700/50 group-hover:bg-white/10"
              }`}>
              <FaPlus className="text-sm md:text-base" />
            </div>
            <div>
              <span className="font-semibold text-base md:text-lg">Add Toy</span>
              <p className="text-teal-200 text-xs md:text-sm">Create new product</p>
            </div>
          </NavLink>

          <NavLink
            to="all-items"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center p-3 md:p-4 rounded-xl transition-all duration-300 group ${isActive
                ? "bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg"
                : "hover:bg-teal-700/50 hover:transform hover:translate-x-1"
              }`
            }
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center mr-3 ${({ isActive }) => isActive ? "bg-white/20" : "bg-teal-700/50 group-hover:bg-white/10"
              }`}>
              <FaList className="text-sm md:text-base" />
            </div>
            <div>
              <span className="font-semibold text-base md:text-lg">All Toys</span>
              <p className="text-teal-200 text-xs md:text-sm">Manage inventory</p>
            </div>
          </NavLink>

          <NavLink
            to="orders"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center p-3 md:p-4 rounded-xl transition-all duration-300 group ${isActive
                ? "bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg"
                : "hover:bg-teal-700/50 hover:transform hover:translate-x-1"
              }`
            }
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center mr-3 ${({ isActive }) => isActive ? "bg-white/20" : "bg-teal-700/50 group-hover:bg-white/10"
              }`}>
              <FaClipboardList className="text-sm md:text-base" />
            </div>
            <div>
              <span className="font-semibold text-base md:text-lg">Orders</span>
              <p className="text-teal-200 text-xs md:text-sm">Track deliveries</p>
            </div>
          </NavLink>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[85%]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-md transition-all duration-200"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>

        </nav>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-teal-100 p-4 md:p-6 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <div className="hidden md:block">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-gray-600 text-sm md:text-base">Manage your toy store efficiently</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-3 py-1 md:px-4 md:py-2 rounded-full border border-teal-200">
                <div className="text-teal-800 font-medium text-sm md:text-base flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  {name} (Admin)
                </div>

              </div>

            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;