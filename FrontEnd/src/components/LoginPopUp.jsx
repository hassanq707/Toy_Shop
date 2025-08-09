import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { set_token, set_name, set_admin_auth } from "../store/slices/TokenSlice";
import { FaTimes, FaUser, FaEnvelope, FaLock, FaCheck } from "react-icons/fa";

const LoginPopUp = ({ onClose, url }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setIsSignup((prev) => !prev);
    setAgree(false);
    setSignupData({ name: "", email: "", password: "" });
    setLoginData({ email: "", password: "" });
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    if (isSignup) {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = isSignup ? signupData : loginData;
    const endpoint = isSignup ? "/api/user/register" : "/api/user/login";
    try {
      const response = await axios.post(`${url}${endpoint}`, payload);

      if (response.data.role === "admin") {
        localStorage.setItem("role", "admin");
        localStorage.setItem("name", response.data.name);
        dispatch(set_name(response.data.name));
        dispatch(set_admin_auth());
        navigate('/admin');
        onClose();
        return;
      }

      const { success } = response.data;
      if (success) {
        const message = isSignup ? "Successfully Signed Up" : "Successfully Logged In";
        dispatch(set_token(response.data.token));
        dispatch(set_name(response.data.name));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        setSignupData({ name: "", email: "", password: "" });
        setLoginData({ email: "", password: "" });
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-teal-50 to-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-teal-100 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-teal-700 transition-colors duration-200 p-1"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="p-5 sm:p-6">
          <div className="text-center mb-4 sm:mb-5">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-teal-800 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
              <span className="text-white text-lg font-bold">LC</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {isSignup ? "Join our community" : "Login to continue"}
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleData}
                  placeholder="Full Name"
                  className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all duration-300 pl-10"
                  required
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={isSignup ? signupData.email : loginData.email}
                onChange={handleData}
                placeholder="Email Address"
                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all duration-300 pl-10"
              />
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>

            <div className="relative">
              <input
                type="password"
                required
                name="password"
                value={isSignup ? signupData.password : loginData.password}
                onChange={handleData}
                placeholder="Password"
                className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 transition-all duration-300 pl-10"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>

            {isSignup && (
              <>
                <p className="text-xs text-gray-500 px-1">
                  Password: min 7 chars, 1 uppercase, 1 number & 1 symbol
                </p>
                <div className="flex items-start gap-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agree}
                      onChange={() => setAgree(!agree)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className={`flex items-center justify-center h-4 w-4 rounded border ${agree ? 'bg-teal-600 border-teal-600' : 'bg-white border-gray-300'}`}>
                      {agree && <FaCheck className="text-white text-xs" />}
                    </div>
                  </div>
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    I agree to terms & privacy policy
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSignup && !agree}
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-all duration-300 ${isSignup && !agree ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"}`}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={handleToggle}
                className="text-teal-600 font-medium hover:underline focus:outline-none"
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;