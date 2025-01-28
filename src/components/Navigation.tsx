import React from "react";

export default function Navigation() {
  return (
    <nav className="bg-[#010409] text-white">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {/* Hamburger */}
            <button className="p-1 border border-gray-700 rounded hover:bg-gray-800">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* GitHub Logo */}
            <svg
              height="32"
              viewBox="0 0 16 16"
              width="32"
              className="fill-white"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>

            {/* Username/Repository */}
            <div className="flex items-center space-x-1">
              <span className="hover:text-blue-400 text-sm cursor-pointer">
                username
              </span>
              <span className="text-gray-500">/</span>
              <span className="hover:text-blue-400 text-sm cursor-pointer">
                repository-name
              </span>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Type / to search"
                className="w-72 px-3 py-1 pl-8 bg-transparent rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <svg
                className="h-4 w-4 absolute left-2 top-1.5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* GitHub Copilot */}
            <button className="hover:text-gray-300">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13v8l6-4-6-4z" />
              </svg>
            </button>

            {/* Add Repo Icon */}
            <button className="hover:text-gray-300">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {/* Issues Icon */}
            <button className="hover:text-gray-300">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            {/* Pull Requests Icon */}
            <button className="hover:text-gray-300">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            {/* Inbox Icon */}
            <button className="hover:text-gray-300">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Profile Picture */}
            <img
              className="h-8 w-8 rounded-full"
              src="https://github.com/github.png"
              alt="Profile"
            />
          </div>
        </div>
      </div>

      {/* Secondary navigation - updated styles */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-4 overflow-x-auto">
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M10.3 6.74a.75.75 0 01-.04 1.06l-2.908 2.7 2.908 2.7a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 011.06.04zm3.44 1.06a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.908-2.7-2.908-2.7z"
                clipRule="evenodd"
              />
            </svg>
            Code
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z"
                clipRule="evenodd"
              />
            </svg>
            Issues
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium text-white border-b-2 border-orange-500"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M10.3 6.74a.75.75 0 01-.04 1.06l-2.908 2.7 2.908 2.7a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 011.06.04zm3.44 1.06a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.908-2.7-2.908-2.7z"
                clipRule="evenodd"
              />
            </svg>
            Pull requests
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2a1 1 0 011 1v3a1 1 0 11-2 0V3a1 1 0 011-1zm0 15a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm8.66-10a1 1 0 01-.366 1.366l-2.598 1.5a1 1 0 11-1-1.732l2.598-1.5A1 1 0 0120.66 7zM7.67 14.5a1 1 0 01-.366 1.366l-2.598 1.5a1 1 0 11-1-1.732l2.598-1.5a1 1 0 011.366.366zM20.66 17a1 1 0 01-1.366.366l-2.598-1.5a1 1 0 011-1.732l2.598 1.5A1 1 0 0120.66 17zM7.67 9.5a1 1 0 01-1.366-.366l-2.598-1.5a1 1 0 111-1.732l2.598 1.5A1 1 0 017.67 9.5z"
                clipRule="evenodd"
              />
            </svg>
            Actions
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M3.75 3.75c0-1.036.84-1.875 1.875-1.875h12.75c1.035 0 1.875.84 1.875 1.875v17.25c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.75z"
                clipRule="evenodd"
              />
            </svg>
            Projects
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V8a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Wiki
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            Security
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H8a1 1 0 110-2h3V8a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Insights
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-xs font-medium hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </a>
        </div>
      </div>
    </nav>
  );
}
