//
// SignUP.tsx 
// contains the sign up form for new users to create an account.
// It sends a POST request to the server to create a new user.
// It also contains a link to the login page.
// The SignUp component is accessible to all users.
//

import Layout from "../../layouts/layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://192.168.29.252:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await response.json();
      console.log(data.message);
      navigate("/login");
    } catch (err) {
      // Type the error as Error
      const error = err as Error;
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  return (
    <Layout>
      <main className="flex h-screen flex-col items-center justify-center bg-background-2 p-4">
        <div className="w-full max-w-md scale-95 rounded-lg bg-background-card p-8 shadow-lg sm:max-w-sm">
          <h1 className="mb-6 text-center text-3xl font-semibold text-text-1">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Your Name"
                required
              />
            </div>

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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-text-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
                className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-text-inv-1 shadow-md transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>

            <div className="text-center text-sm text-text-1">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default SignUp;
