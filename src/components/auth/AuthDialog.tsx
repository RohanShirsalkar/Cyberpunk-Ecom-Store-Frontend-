import { X } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, toggleAuthDialog } from "../../store/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { userLogin, userSignup } from "../../api/auth/authService";
import { isAxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "../../store/app/appSlice";
import useCart from "../../hooks/useCart";

interface Form {
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  username: string;
}

const AuthDialog = () => {
  const [errors, setErrors] = useState<String[]>([]);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<Form>({
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
    username: "",
  });
  const dispatch = useDispatch();
  const { getCart } = useCart();

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
      username: "",
    });
  };

  const loginUserRequest = useMutation({
    mutationFn: userLogin,
    onSuccess: (res) => {
      dispatch(setUser({ id: res.userId }));
      getCart();
      dispatch(toggleAuthDialog());
      dispatch(
        showSuccessToast({ title: "Success", message: "User logged in" })
      );
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setErrors([...errors, err.response?.data.error]);
        dispatch(
          showErrorToast({ title: "Error", message: "User not logged in" })
        );
      }
    },
  });

  const signupUserRequest = useMutation({
    mutationFn: userSignup,
    onSuccess: () => {
      setIsLogin(true);
      dispatch(
        showSuccessToast({
          title: "REGISTERED",
          message: "User registered successfuly",
        })
      );
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        setErrors([...errors, err.response?.data.error]);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setErrors([]);
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setErrors([...errors, "Email and Password is required"]);
        return;
      }
      loginUserRequest.mutate({
        email: formData.email,
        password: formData.password,
      });
    } else {
      if (
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phone ||
        !formData.username
      ) {
        setErrors([...errors, "All fields are required"]);
        return;
      }
      signupUserRequest.mutate({
        email: formData.email,
        name: formData.username,
        password: formData.password,
        phone: formData.phone,
      });
    }
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    setErrors([]);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
      {/* Main dialog container */}
      <div className="bg-black bg-opacity-90 rounded-lg max-w-md w-full max-h-screen overflow-y-auto shadow-2xl shadow-cyan-400/20">
        <div className="relative bg-black border border-cyan-500 rounded-lg p-8 shadow-2xl">
          {/* Close button */}
          <button
            onClick={() => dispatch(toggleAuthDialog())}
            className="text-cyan-300 hover:text-pink-400 transition-colors absolute right-4 top-4"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Header with glitch effect */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-cyan-500 mb-2 relative">
              <span className="relative inline-block">
                {isLogin ? "LOGIN" : "REGISTER"}
                <span className="absolute inset-0 text-red-500 animate-ping opacity-50">
                  {isLogin ? "LOGIN" : "REGISTER"}
                </span>
              </span>
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"></div>
            <p className="text-green-400 text-sm mt-2 font-mono">
              {isLogin
                ? "> ACCESSING NEURAL NETWORK..."
                : "> INITIALIZING NEW USER..."}
            </p>
          </div>

          {/* Error Box */}
          {errors.length > 0 && (
            <div className="mt-8 mb-4 p-4 border border-red-500 bg-black/50 backdrop-blur ">
              <p className="text-pink-400 font-mono text-sm tracking-widest mb-2">
                ERRORS:
              </p>
              <ul className="text-pink-400 font-mono text-sm tracking-widest">
                {errors.map((err, index) => (
                  <li key={index}>
                    {index + 1}.{err}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-cyan-500 rounded px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500 font-mono"
                  placeholder="Enter neural ID..."
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-black border border-cyan-500 rounded px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500 font-mono"
                placeholder="user@cyberspace.net"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-cyan-500 rounded px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500 font-mono"
                  placeholder="+91 98XXXXXXXX"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-black border border-cyan-500 rounded px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500 font-mono"
                placeholder="Enter access code..."
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-cyan-500 rounded px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500 font-mono"
                  placeholder="Verify access code..."
                />
              </div>
            )}

            {/* Submit button with animation */}
            {isLogin ? (
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold py-4 rounded hover:from-cyan-400 hover:to-purple-400 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider relative overflow-hidden"
              >
                <span className="relative z-10">
                  {!loginUserRequest.isPending ? (
                    "JACK IN"
                  ) : (
                    <div className="inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <div
                          className="absolute top-1 left-1 w-4 h-4 border-2 border-pink-400 border-b-transparent rounded-full animate-spin"
                          style={{
                            animationDuration: "0.8s",
                            animationDirection: "reverse",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </span>
                <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold py-4 rounded hover:from-cyan-400 hover:to-purple-400 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wider relative overflow-hidden"
              >
                <span className="relative z-10">
                  {!signupUserRequest.isPending ? (
                    "INITIALIZE"
                  ) : (
                    <div className="inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <div
                          className="absolute top-1 left-1 w-4 h-4 border-2 border-pink-400 border-b-transparent rounded-full animate-spin"
                          style={{
                            animationDuration: "0.8s",
                            animationDirection: "reverse",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </span>
                <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            )}
          </div>

          {/* Toggle between login/signup */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 font-mono text-sm mb-2">
              {isLogin ? "Don't have neural access?" : "Already in the system?"}
            </p>
            <button
              onClick={handleSwitchMode}
              className="text-cyan-500 hover:text-purple-500 font-mono uppercase tracking-wider text-sm transition-colors border-b border-cyan-500 hover:border-purple-500"
            >
              {isLogin ? "Create New Identity" : "Access Existing Profile"}
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-4 left-4 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"></div>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-4 bg-black border border-green-500 rounded p-2 font-mono text-xs text-green-400">
          <div className="flex justify-between">
            <span>STATUS: ONLINE</span>
            <span>SEC LEVEL: HIGH</span>
            <span className="animate-pulse">◉ CONNECTED</span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthDialog;
