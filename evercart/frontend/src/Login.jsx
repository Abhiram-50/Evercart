import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "/api/auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      alert(`Login successful! Welcome, ${username}`);
      window.location.href = "/";
    } catch (error) {
      const message = error.response?.data || "Login failed!";
      alert(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username,
        password,
      });

      alert(`🎉 ${response.data} Please log in now.`);
      resetForm();
      setIsLogin(true);
    } catch (error) {
      const message =
        error.response?.data || "Registration failed. Try again!";
      alert(`⚠️ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-24 bg-white dark:bg-[#121212]">
      <div className="w-[400px] h-[350px] bg-[#999e98]
        rounded-[50px] flex flex-col justify-center">

        {isLogin ? (
          /* ---------------- LOGIN ---------------- */
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-evenly h-full p-4"
          >
            <h1 className="text-2xl font-bold">Login</h1>

            <div className="flex items-center gap-3">
              <h4 className="font-medium">Username</h4>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-[30px] rounded-xl px-3 outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <h4 className="font-medium">Password</h4>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[30px] rounded-xl px-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-[100px] h-[30px] rounded-xl
                bg-white hover:bg-primary hover:text-white
                transition disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            <p className="text-sm">
              Don’t have an account?{" "}
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(false);
                  resetForm();
                }}
                className="text-blue-700 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        ) : (
          /* ---------------- SIGN UP ---------------- */
          <form
            onSubmit={handleSignUp}
            className="flex flex-col items-center justify-evenly h-full p-4"
          >
            <h1 className="text-2xl font-bold">Sign Up</h1>

            <div className="flex items-center gap-3">
              <h4 className="font-medium">Username</h4>
              <input
                type="text"
                placeholder="Create username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-[30px] rounded-xl px-3 outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <h4 className="font-medium">Password</h4>
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-[30px] rounded-xl px-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-[100px] h-[30px] rounded-xl
                bg-white hover:bg-primary hover:text-white
                transition disabled:opacity-60"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="text-sm">
              Already have an account?{" "}
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(true);
                  resetForm();
                }}
                className="text-blue-700 hover:underline"
              >
                Log In
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
