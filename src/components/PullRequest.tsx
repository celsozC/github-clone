import React from "react";

export default function PullRequest() {
  return (
    <div className="bg-[#0d1117] mx-auto px-4 py-4">
      {/* PR Header */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <h1 className="text-2xl font-semibold flex items-center">
            Pull Request Title Here{" "}
            <span className="text-gray-500 ml-2">#1234</span>
          </h1>
        </div>
        <div className="flex items-center mt-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Open
          </span>
          <span className="ml-2 text-sm text-gray-600">
            username wants to merge 3 commits into{" "}
            <span className="font-medium">main</span> from{" "}
            <span className="font-medium">feature-branch</span>
          </span>
        </div>
      </div>

      {/* PR Stats */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://github.com/github.png"
              alt="Author avatar"
            />
            <span className="ml-2 text-sm font-medium">username</span>
            <span className="ml-2 text-sm text-gray-500">
              created 2 days ago
            </span>
          </div>
          <div className="flex items-center text-sm">
            <span className="flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.492 2.492 0 013.5 9h3.25a.75.75 0 010 1.5H3.5a1 1 0 100 2h5.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5v-9zm13.23 7.79a.75.75 0 001.06-1.06l-2.505-2.505a.75.75 0 00-1.06 0L9.22 9.229a.75.75 0 001.06 1.061l1.225-1.224v6.184a.75.75 0 001.5 0V9.066l1.224 1.224z"></path>
              </svg>
              3 commits
            </span>
            <span className="flex items-center ml-4">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.5.75a.75.75 0 00-1.5 0v5.19L4.391 3.33a.75.75 0 10-1.06 1.061L5.939 7H.75a.75.75 0 000 1.5h5.19l-2.61 2.609a.75.75 0 101.061 1.06L7 9.561v5.189a.75.75 0 001.5 0V9.56l2.609 2.61a.75.75 0 101.06-1.061L9.561 8.5h5.189a.75.75 0 000-1.5H9.56l2.61-2.609a.75.75 0 00-1.061-1.06L8.5 5.939V.75z"></path>
              </svg>
              2 changed files
            </span>
            <span className="flex items-center ml-4">
              <svg
                className="h-4 w-4 mr-1 text-green-600"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 14.25.75 7 2.5 5.25 8 10.75l5.5-5.5 1.75 1.75L8 14.25z"></path>
              </svg>
              <span className="text-green-600">+100</span>
              <span className="text-red-600 ml-1">-50</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <a
            href="#"
            className="border-b-2 border-orange-500 pb-3 px-1 text-sm font-medium"
          >
            Conversation
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent pb-3 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Commits (3)
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent pb-3 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Checks (2)
          </a>
          <a
            href="#"
            className="border-b-2 border-transparent pb-3 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          >
            Files changed (2)
          </a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {/* Left Column (Timeline) */}
        <div className="col-span-2">
          {/* Timeline Item */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex items-start space-x-3">
              <img
                className="h-8 w-8 rounded-full"
                src="https://github.com/github.png"
                alt="Comment author"
              />
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg px-4 py-2 mb-2">
                  <div className="border-b border-gray-200 pb-2 mb-2">
                    <span className="font-medium">username</span>
                    <span className="text-gray-500 text-sm ml-2">
                      commented 2 days ago
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    <p>This is a sample comment on the pull request.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-4">
          {/* Reviewers */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium mb-2">Reviewers</h3>
            <button className="w-full text-sm text-gray-600 hover:text-blue-600 text-left">
              Add reviewers
            </button>
          </div>

          {/* Assignees */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium mb-2">Assignees</h3>
            <button className="w-full text-sm text-gray-600 hover:text-blue-600 text-left">
              Add assignees
            </button>
          </div>

          {/* Labels */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium mb-2">Labels</h3>
            <button className="w-full text-sm text-gray-600 hover:text-blue-600 text-left">
              Add labels
            </button>
          </div>

          {/* Development */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium mb-2">Development</h3>
            <div className="text-sm text-gray-600">
              <div className="flex items-center mb-2">
                <svg
                  className="h-4 w-4 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 14.25.75 7 2.5 5.25 8 10.75l5.5-5.5 1.75 1.75L8 14.25z"></path>
                </svg>
                Ready to merge
              </div>
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                  <path
                    fillRule="evenodd"
                    d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                  ></path>
                </svg>
                All checks have passed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
