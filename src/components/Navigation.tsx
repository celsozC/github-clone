"use client";

import React, { useState } from "react";

export default function Navigation() {
  // You can replace these values with your actual GitHub info
  const githubInfo = {
    username: "celsozC",
    repository: "github-clone",
    profilePicture: "https://github.com/celsozC.png", // This will automatically fetch your GitHub profile picture
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);

  return (
    <nav className="bg-[#010409] text-white border-b border-gray-700">
      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section - with overflow handling */}
          <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar">
            {/* Hamburger */}
            <button
              className="p-1 border border-gray-700 rounded hover:bg-gray-800"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
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

            {/* Sidebar */}
            {isSidebarOpen && (
              <>
                {/* Overlay */}
                <div
                  className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${
                    isSidebarOpen
                      ? "bg-opacity-50"
                      : "bg-opacity-0 pointer-events-none"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar - always present but transformed out of view when closed */}
                <div
                  className={`fixed inset-y-0 -left-4 w-[320px] bg-[#010409] border-r border-gray-700 z-50 overflow-y-auto
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 border-b border-gray-700">
                    <svg
                      height="32"
                      viewBox="0 0 16 16"
                      width="32"
                      className="fill-white"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>

                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 hover:bg-gray-800 rounded-md"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Sidebar content */}
                  <div className="p-3">
                    <div className="space-y-1">
                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.156 1.835a.25.25 0 00-.312 0l-5.25 4.2a.25.25 0 00-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 01.75-.75h3.5a.75.75 0 01.75.75v5.25h2.75a.25.25 0 00.25-.25V6.23a.25.25 0 00-.094-.196l-5.25-4.2zM6.906.664a1.75 1.75 0 012.188 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0113.25 15h-3.5a.75.75 0 01-.75-.75V9H7v5.25a.75.75 0 01-.75.75h-3.5A1.75 1.75 0 011 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2z" />
                        </svg>
                        Home
                      </a>

                      <a
                        href="#"
                        className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
                      >
                        <svg
                          className="h-3.5 w-3.5 mr-1 translate-y-[1px] text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
                        </svg>
                        Issues
                      </a>

                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                        </svg>
                        Pull requests
                      </a>

                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8H1.5zM5 5H1.5V1.75a.25.25 0 01.25-.25H5V5zm1.5 1.5v8h7.75a.25.25 0 00.25-.25V6.5h-8zm8-1.5h-8V1.5h7.75a.25.25 0 01.25.25V5z" />
                        </svg>
                        Projects
                      </a>

                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0110.25 10H7.061l-2.574 2.573A1.458 1.458 0 012 11.543V10h-.25A1.75 1.75 0 010 8.25v-5.5C0 1.784.784 1 1.75 1zM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 01.75.75v2.19l2.72-2.72a.749.749 0 01.53-.22h3.5a.25.25 0 00.25-.25v-5.5a.25.25 0 00-.25-.25h-8.5a.25.25 0 00-.25.25zm13 2a.25.25 0 00-.25-.25h-.5a.75.75 0 010-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.458 1.458 0 01-2.487 1.03L9.22 12.28a.749.749 0 111.06-1.06l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25v-5.5z" />
                        </svg>
                        Discussions
                      </a>

                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0114.25 15H1.75A1.75 1.75 0 010 13.25V2.75zm1.75-.25a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V2.75a.25.25 0 00-.25-.25H1.75zM7.25 8a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L5.44 8 3.72 6.28a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm1.5 1.5a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
                        </svg>
                        Codespaces
                      </a>

                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
                          <path d="M8 6.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM5 8a3 3 0 116 0 3 3 0 01-6 0z" />
                        </svg>
                        Explore
                      </a>

                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z" />
                        </svg>
                        Marketplace
                      </a>

                      <div className="my-3 border-b border-gray-700" />

                      <div className="px-2 text-[11px] text-gray-400 font-light mb-1">
                        Repositories
                      </div>

                      <a
                        href="#"
                        className="flex items-center px-2 py-1 text-[13px] text-white hover:bg-gray-800 rounded-md"
                      >
                        <img
                          src={githubInfo.profilePicture}
                          alt={`${githubInfo.username}'s profile`}
                          className="h-4 w-4 rounded-full mr-2"
                        />
                        {githubInfo.username}/{githubInfo.repository}
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* GitHub Logo */}
            <svg
              height="32"
              viewBox="0 0 16 16"
              width="32"
              className="fill-white"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>

            {/* Username/Repository - Hide on mobile */}
            <div className="hidden sm:flex items-center space-x-1">
              <span className="hover:text-blue-400 text-sm cursor-pointer">
                {githubInfo.username}
              </span>
              <span className="text-gray-500">/</span>
              <span className="hover:text-blue-400 text-sm cursor-pointer">
                {githubInfo.repository}
              </span>
            </div>
          </div>

          {/* Right section - with overflow handling */}
          <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar">
            {/* Search Bar - Hide on mobile */}
            <div className="hidden md:block relative">
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

            {/* Mobile search icon */}
            <button className="md:hidden text-gray-400 hover:text-gray-300">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Other icons - Hide less important ones on mobile */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Add Repository Icon */}
              <button className="p-1 border border-gray-700 rounded-md hover:bg-gray-800">
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z" />
                  </svg>
                  <svg
                    className="h-3 w-3 text-gray-400 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z" />
                  </svg>
                </div>
              </button>

              {/* Issues Icon */}
              <button className="p-1 border border-gray-700 rounded-md hover:bg-gray-800">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z" />
                </svg>
              </button>
            </div>

            {/* Always show these important icons */}
            <div className="flex items-center space-x-4">
              {/* Pull Requests Icon */}
              <button className="p-1 border border-gray-700 rounded-md hover:bg-gray-800">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
                </svg>
              </button>

              {/* Inbox Icon */}
              <button className="p-1 border border-gray-700 rounded-md hover:bg-gray-800">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 1.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 0 0 8 16ZM3 5a5 5 0 0 1 10 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.519 1.519 0 0 1 13.482 13H2.518a1.516 1.516 0 0 1-1.263-2.36l1.703-2.554A.255.255 0 0 0 3 7.947Zm5-3.5A3.5 3.5 0 0 0 4.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.017.017 0 0 0-.003.01l.001.006c0 .002.002.004.004.006l.006.004.007.001h10.964l.007-.001.006-.004.004-.006.001-.007a.017.017 0 0 0-.003-.01l-1.703-2.554a1.745 1.745 0 0 1-.294-.97V5A3.5 3.5 0 0 0 8 1.5Z" />
                </svg>
              </button>
            </div>

            {/* Profile Picture */}
            <img
              className="h-8 w-8 rounded-full"
              src={githubInfo.profilePicture}
              alt={`${githubInfo.username}'s profile`}
            />
          </div>
        </div>
      </div>

      {/* Secondary navigation with overflow handling */}
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Navigation container with conditional spacing */}
        <div className="flex md:space-x-4 overflow-x-auto hide-scrollbar">
          {/* Mobile view with space-between */}
          <div className="flex justify-between w-full md:w-auto md:justify-start">
            {/* Left group with main nav items */}
            <div className="flex space-x-4">
              {/* Code nav item */}
              <a
                href="#"
                className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
              >
                <svg
                  className="h-3.5 w-3.5 mr-1 translate-y-[0.5px] text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z" />
                </svg>
                Code
              </a>

              {/* Issues nav item */}
              <a
                href="#"
                className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
              >
                <svg
                  className="h-3.5 w-3.5 mr-1 translate-y-[1px] text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
                </svg>
                Issues
              </a>

              {/* Settings nav item */}
              <a
                href="#"
                className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
              >
                <svg
                  className="h-3.5 w-3.5 mr-1 translate-y-[1px] text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.429 1.525a6.593 6.593 0 011.142 0c.036.003.108.036.146.146l.289 1.105c.147.56.55.967.997 1.189.174.086.341.183.501.29.417.278.97.423 1.53.27l1.102-.303c.11-.03.175.016.195.046.219.31.41.641.573.989.014.031.022.11-.059.19l-.815.806c-.411.406-.562.957-.53 1.456a4.588 4.588 0 010 .582c-.032.499.119 1.05.53 1.456l.815.806c.08.08.073.159.059.19a6.494 6.494 0 01-.573.99c-.02.029-.086.074-.195.045l-1.103-.303c-.559-.153-1.112-.008-1.529.27-.16.107-.327.204-.5.29-.449.222-.851.628-.998 1.189l-.289 1.105c-.029-.11-.101-.143-.137-.146a6.613 6.613 0 01-1.142 0c-.036-.003-.108-.037-.137-.146l-.289-1.105c-.147-.56-.55-.967-.997-1.189a4.502 4.502 0 01-.501-.29c-.417-.278-.97-.423-1.53-.27l-1.102.303c-.11.03-.175-.016-.195-.046a6.492 6.492 0 01-.573-.989c-.014-.031-.022-.11.059-.19l.815-.806c.411-.406.562-.957.53-1.456a4.587 4.587 0 010-.582c.032-.499-.119-1.05-.53-1.456l-.815-.806c-.08-.08-.073-.159-.059-.19a6.44 6.44 0 01.573-.99c.02-.029.086-.075.195-.045l1.103.303c.559.153 1.112.008 1.529-.27.16-.107.327-.204.5-.29.449-.222.851-.628.998-1.189l.289-1.105c.029-.11.101-.143.137-.146zM8 0c-.236 0-.47.01-.701.03-.743.065-1.29.615-1.458 1.261l-.29 1.106c-.017.066-.078.158-.211.224a5.994 5.994 0 00-.668.386c-.123.082-.233.09-.3.071L3.27 2.776c-.644-.177-1.392.02-1.82.63a7.977 7.977 0 00-.704 1.217c-.315.675-.111 1.422.363 1.891l.815.806c.05.048.098.147.088.294a6.084 6.084 0 000 .772c.01.147-.038.246-.088.294l-.815.806c-.474.469-.678 1.216-.363 1.891.2.428.436.835.704 1.218.428.609 1.176.806 1.82.63l1.103-.303c.066-.019.176-.011.299.071.213.143.436.272.668.386.133.066.194.158.212.224l.289 1.106c.169.646.715 1.196 1.458 1.26a8.094 8.094 0 001.402 0c.743-.064 1.29-.614 1.458-1.26l.29-1.106c.017-.066.078-.158.211-.224a5.98 5.98 0 00.668-.386c.123-.082.233-.09.3-.071l1.102.302c.644.177 1.392-.02 1.82-.63.268-.382.505-.789.704-1.217.315-.675.111-1.422-.364-1.891l-.814-.806c-.05-.048-.098-.147-.088-.294a6.1 6.1 0 000-.772c-.01-.147.039-.246.088-.294l.814-.806c.475-.469.679-1.216.364-1.891a7.992 7.992 0 00-.704-1.218c-.428-.609-1.176-.806-1.82-.63l-1.103.303c-.066.019-.176.011-.299-.071a5.991 5.991 0 00-.668-.386c-.133-.066-.194-.158-.212-.224L10.16 1.29C9.99.645 9.444.095 8.701.031A8.094 8.094 0 008 0zm1.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM11 8a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </a>
            </div>

            {/* More dropdown - Only separated in mobile */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={() => setIsSecondaryMenuOpen(!isSecondaryMenuOpen)}
                className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent"
              >
                <span>More</span>
                <svg
                  className={`ml-1 h-3.5 w-3.5 transform transition-transform ${
                    isSecondaryMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427z" />
                </svg>
              </button>

              {/* Mobile dropdown menu */}
              {isSecondaryMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-[#010409] border border-gray-700 rounded-md py-1 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Pull requests
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Actions
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Wiki
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Security
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Insights
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Desktop nav items */}
          <div className="hidden md:flex space-x-4">
            <a
              href="#"
              className="flex items-center px-2 py-2 text-xs font-light text-white border-b-2 border-orange-500"
            >
              Pull requests
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
            >
              Actions
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
            >
              Projects
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
            >
              Wiki
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
            >
              Security
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
            >
              Insights
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-xs font-light hover:text-gray-300 border-b-2 border-transparent hover:border-gray-300"
            >
              Settings
            </a>
          </div>
        </div>

        {/* Dropdown menu for overflow items */}
        <div
          className={`absolute left-0 right-0 bg-[#010409] border border-gray-700 rounded-md mt-1 py-1 z-50 ${
            isSecondaryMenuOpen ? "block" : "hidden"
          }`}
        >
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Code
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Issues
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Pull requests
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Actions
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Projects
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Wiki
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Security
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Insights
          </a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-800">
            Settings
          </a>
        </div>
      </div>

      {/* Add styles for hiding scrollbar while maintaining functionality */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}
