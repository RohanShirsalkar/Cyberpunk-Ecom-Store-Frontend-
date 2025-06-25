import { useState } from "react";
import { ShoppingCart, Search, Menu, X, Cpu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  removeUser,
  toggleAuthDialog,
} from "../store/auth/authSlice";
import { showErrorToast, showInfoToast } from "../store/app/appSlice";
import { getCartState, toggleCart } from "../store/cart/cartSlice";
import ButtonSpinner from "./spinners/ButtonSpinner";
import { userLogout } from "../api/auth/authService";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { totalItmes: totalCartItems, isLoading } = useSelector(getCartState);
  const { isLoggedIn } = useSelector(getAuthState);

  const dispatch = useDispatch();
  const { clearCart } = useCart();

  const handleAuth = () => {
    if (!isLoggedIn) {
      dispatch(toggleAuthDialog());
    } else {
      // Handle user logout
      userLogout()
        .then((res) => {
          dispatch(removeUser());
          dispatch(showInfoToast({ message: res.message, title: "LOGOUT" }));
          clearCart();
        })
        .catch((err) => {
          dispatch(showErrorToast({ message: err.message, title: "ERROR" }));
        });
    }
  };

  return (
    <header className="bg-black bg-opacity-80 backdrop-blur-md border-b border-cyan-400 shadow-lg shadow-cyan-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Cpu className="h-8 w-8 text-cyan-400" />
            <h1
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400"
              style={{
                fontFamily: "monospace",
                textShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
              }}
            >
              CYBER_MART
            </h1>
            <div className="text-xs text-green-400 font-mono">v2.1.7</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-mono font-semibold relative group transition-all duration-300 ${
                  isActive
                    ? "text-pink-400"
                    : "text-cyan-300 hover:text-pink-400"
                }`
              }
            >
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
            <NavLink
              to="/all-products"
              className={({ isActive }) =>
                `font-mono font-semibold relative group transition-all duration-300 ${
                  isActive
                    ? "text-pink-400"
                    : "text-cyan-300 hover:text-pink-400"
                }`
              }
            >
              PRODUCTS
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-mono font-semibold relative group transition-all duration-300 ${
                  isActive
                    ? "text-pink-400"
                    : "text-cyan-300 hover:text-pink-400"
                }`
              }
            >
              CONTACT
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </NavLink>
            <button
              onClick={handleAuth}
              className="text-cyan-300 hover:text-pink-400 font-mono font-semibold transition-all duration-300 hover:glow relative group"
            >
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="SEARCH DATABASE..."
                className="bg-black bg-opacity-50 text-cyan-100 placeholder-gray-500 font-mono px-4 py-2 rounded border border-cyan-400 focus:outline-none focus:border-pink-400 focus:shadow-lg focus:shadow-pink-400/20 transition-all duration-300"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-cyan-400" />
            </div>

            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-cyan-300 hover:text-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
            >
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <ShoppingCart className="h-6 w-6" />
              )}
              {totalCartItems > 0 && !isLoading && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-cyan-300 hover:text-pink-400"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md border-t border-cyan-400">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className="block px-3 py-2 text-cyan-300 hover:text-pink-400 font-mono font-semibold"
            >
              HOME
            </NavLink>
            <NavLink
              to="/products"
              className="block px-3 py-2 text-cyan-300 hover:text-pink-400 font-mono font-semibold"
            >
              PRODUCTS
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-3 py-2 text-cyan-300 hover:text-pink-400 font-mono font-semibold"
            >
              CONTACT
            </NavLink>
            <button
              onClick={handleAuth}
              className="block px-3 py-2 text-cyan-300 hover:text-pink-400 font-mono font-semibold"
            >
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
