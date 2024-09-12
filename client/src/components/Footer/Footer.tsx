//
// Footer.tsx
// Is is a simple footer component that displays a link to my GitHub account.
//

function Footer() {
  return (
    <footer className="bg-background-1 py-6 text-text-1">
      <div className="container mx-auto text-center">
        <p className="mb-4 text-sm">
          &copy; {new Date().getFullYear()} Your Website Name. All rights
          reserved.
        </p>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/navaneet-rao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.725-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.137 3.003.404 2.292-1.552 3.299-1.23 3.299-1.23.653 1.653.241 2.874.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.814 1.102.814 2.22 0 1.604-.014 2.898-.014 3.293 0 .32.218.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
