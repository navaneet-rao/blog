import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>("light");

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
    <nav className="bg-background-nav p-4 my-2 container self-center absolute rounded-lg">
      <div className="mx-auto flex justify-between items-center rounded-lg">
        {/* Logo */}
        <div className=" text-xl font-bold">
          <a href="/Home" className="text-text-1">
            Logo
          </a>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden ">
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
        <div className="hidden md:flex space-x-4">
          <a href="/Home" className="      text-text-1">
            Home
          </a>
          <a href="/login" className="      text-text-1">
            Login
          </a>
          <a href="/signup" className="      text-text-1">
            Signup
          </a>
          {/* Toggle Switch */}
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            <span className="ms-3 text-sm font-medium text-text-1">
              {theme === "dark" ? "Dark" : "Light"} Theme
            </span>
          </label>
        </div>
      </div>

      {/* Navigation Links for mobile (expand below logo) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <a href="/Home" className="block       text-text-1">
            Home
          </a>
          <a href="/login" className="block       text-text-1">
            Login
          </a>
          <a href="/signup" className="block       text-text-1">
            Signup
          </a>

          {/* Toggle Switch */}
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            <span className="ms-3 text-sm font-medium text-text-1">
              {theme === "dark" ? "Dark" : "Light"} Theme
            </span>
          </label>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
