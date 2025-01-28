import React from "react";

export default function PullRequestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50">
              <svg
                className="h-4 w-4 mr-1.5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                <path
                  fillRule="evenodd"
                  d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                ></path>
              </svg>
              Filters
              <svg
                className="ml-1.5 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>
          </div>

          {/* Right side */}
          <button className="inline-flex items-center px-4 py-1.5 text-sm font-medium rounded-md border border-gray-300 bg-green-600 text-white hover:bg-green-700">
            New pull request
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search all pull requests"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Labels Bar */}
      <div className="border border-gray-300 rounded-md mb-4">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                8 Open
              </button>
              <button className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                12 Closed
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Author
                <svg
                  className="ml-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Label
                <svg
                  className="ml-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Projects
                <svg
                  className="ml-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Milestones
                <svg
                  className="ml-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Assignee
                <svg
                  className="ml-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Sort
                <svg
                  className="ml-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="p-16 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Welcome to Pull Requests
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Pull requests help you collaborate on code with other people.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              New pull request
            </button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="text-sm text-gray-600">
        <button className="inline-flex items-center hover:text-blue-600">
          <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zM6.92 6.085c.081-.16.19-.299.34-.398.145-.097.371-.187.74-.187.28 0 .553.087.738.225A.613.613 0 019 6.25c0 .177-.04.264-.077.318a.956.956 0 01-.277.245c-.076.051-.158.1-.258.161l-.007.004a7.728 7.728 0 00-.313.195 2.416 2.416 0 00-.692.661.75.75 0 001.248.832.956.956 0 01.276-.245 6.3 6.3 0 01.26-.16l.006-.004c.093-.057.204-.123.313-.195.222-.149.487-.355.692-.662.214-.32.329-.702.329-1.15 0-.76-.36-1.348-.863-1.725A2.76 2.76 0 008 4c-.631 0-1.155.16-1.572.438-.413.276-.68.638-.849.977a.75.75 0 101.342.67z" />
          </svg>
          ProTip! Find everything you{"'"}ve created by searching
          <span className="mx-1 font-mono bg-gray-100 rounded px-1">
            is:pr author:@me
          </span>
        </button>
      </div>
    </div>
  );
}
