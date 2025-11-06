import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../services/api/AuthService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.non_field_errors?.[0] || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-xl text-white">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🎬</div>
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/30 border border-red-600 rounded-md p-2 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <NavLink
            to="/register"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Create one
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
