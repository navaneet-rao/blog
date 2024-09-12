//
// Navbar.tsx 
// This component displays a navigation bar with links to the blog, dashboard, and login pages.
// It also contains a toggle switch to change the theme of the application.
// The theme is stored in the local storage and applied to the body of the document.
// The component uses the UserContext to access the current user. To see if a user is logged in. and display a welcome message.
// 

import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Navbar: React.FC = () => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>("light");

  const NavLinks = () => {
    return (
      <div className="flex flex-col md:flex-row md:space-x-4">
        <Link
          to="/newfeed"
          className="relative block py-2 text-text-1 before:absolute before:bottom-2 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:scale-110 hover:before:w-full"
        >
          Blog
        </Link>
        <Link
          to="/dashboard"
          className="relative block py-2 text-text-1 before:absolute before:bottom-2 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:scale-110 hover:before:w-full"
        >
          Dashboard
        </Link>
        {!user ? (
          <Link
            to="/login"
            className="relative block py-2 text-text-1 before:absolute before:bottom-2 before:h-[2px] before:w-0 before:bg-blue-500 before:transition-all before:duration-300 hover:scale-110 hover:before:w-full"
          >
            Login
          </Link>
        ) : (
          <div className="rounded-2xl bg-background-2 p-2 text-text-1">
            Welcome, {user.name}
          </div>
        )}
      </div>
    );
  };

  const ToggleSwitch = () => {
    return (
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={theme === "dark"}
          onChange={handleThemeChange}
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className="ml-3 text-lg font-medium text-text-1">
          {/* {theme === "dark" ? "Dark" : "Light"} Theme */}
          {theme === "dark" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            </>
          )}
        </span>
      </label>
    );
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Apply the theme to the body
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  };

  return (
    <nav className="fixed z-10 w-screen bg-background-nav p-6">
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/" className="text- text-text-1">
            Logo
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-text-1 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links for desktop */}
        <div className="hidden items-center space-x-6 md:flex">
          <NavLinks />
          <ToggleSwitch />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 h-screen space-y-4 md:hidden">
          <NavLinks />
          <ToggleSwitch />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
