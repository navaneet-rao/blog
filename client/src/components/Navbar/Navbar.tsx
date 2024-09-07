import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-black p-4 my-2 container self-center absolute rounded-lg">
      <div className="mx-auto flex justify-between items-center rounded-lg">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <a href="/Home" className="text-white">
            Logo
          </a>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden ">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
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
          <a href="/Home" className="text-white">
            Home
          </a>
          <a href="/login" className="text-white">
            Login
          </a>
          <a href="/signup" className="text-white">
            Signup
          </a>
        </div>
      </div>

      {/* Navigation Links for mobile (expand below logo) */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <a href="/Home" className="block text-white">
            Home
          </a>
          <a href="/login" className="block text-white">
            Login
          </a>
          <a href="/signup" className="block text-white">
            Signup
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
