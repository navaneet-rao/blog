//
// login.tsx
// This file contains the Login page component.
// It allows users to log in to the application.
// It displays a form with email and password fields.
// It also contains a link to the registration page.
// The Login component is accessible to all users.
//

import Layout from "../../layouts/layout";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const { login } = useContext(UserContext);
   
  // Handle form submission, send a POST request to the server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.29.252:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token); // Call the login method
      } else {
        throw new Error(data.error || "Something went wrong");
      }
      
      // Just to verify the response
      // console.log(data.message);
      // console.log("User:", data.user);
      // console.log("Token:", data.token);

      navigate("/dashboard");
    } catch (err) {
      const error = err as Error;
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <Layout>
      <main className="flex h-screen flex-col items-center justify-center bg-background-2 p-4">
        <div className="w-full max-w-md rounded-lg bg-background-card p-8 shadow-lg sm:max-w-sm">
          <h1 className="mb-6 text-center text-3xl font-semibold text-text-1">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="name@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-center text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-text-inv-1 shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Login
              </button>
            </div>

            <div>
              <p className="text-center text-sm text-text-1">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Login;
