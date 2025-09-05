"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/AuthLayout";

export default function SignInPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  );
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
      setLoading(true);
      const result = await login(formData.email, formData.password);
      if (result.success) {
        setLoading(false);
        router.push("/");
      }
      console.log(result, "result");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
      toast.error(error || "Failed to login");
    }
  };

  const handleGoogleClick = () => {
    toast("Google login coming soon!");
  };

  return (
    <div className="bg-body-image min-h-screen flex items-center justify-center px-2 sm:px-3 lg:px-4">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <div className="glass-effect rounded-xl shadow-custom p-2 animate-fade-in">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-800" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`text-gray-800 bg-gray-300 placeholder-gray-500 block w-full pl-10 pr-3 py-3 border rounded-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-500"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-800" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`text-gray-800 bg-gray-300 placeholder-gray-500 block w-full pl-10 pr-12 py-3 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6 text-gray-800 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-6 w-6 text-gray-800 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="text-xl animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 rounded-sm">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleClick}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Continue with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p
              className="text-sm text-gray-400 cursor-pointer"
              onClick={() => router.push("/sign-up")}
            >
              Don&apos;t have an account?{" "}
              <span className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
