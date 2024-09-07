import Error from "next/error";
import Layout from "../../layouts/layout";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
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
      // Handle success (e.g., redirect to login page)
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }
  };

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-black p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full sm:max-w-sm">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="name@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default SignUp;
