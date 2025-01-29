"use client";

import React, { useEffect, useState } from "react";

interface PullRequest {
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  state: string;
  draft: boolean;
  labels: Array<{
    name: string;
    color: string;
  }>;
  selected?: boolean;
}

interface Filters {
  state: "all" | "open" | "closed";
  author: string;
  label: string;
  search: string;
}

export default function PullRequestPage() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [filteredPRs, setFilteredPRs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPRs, setSelectedPRs] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Filters>({
    state: "all",
    author: "",
    label: "",
    search: "",
  });

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

  useEffect(() => {
    fetchPullRequests();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, pullRequests]);

  const fetchPullRequests = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/celsozC/github-clone/pulls?state=all&per_page=100",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          `Failed to fetch pull requests: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setPullRequests(data);
      setFilteredPRs(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...pullRequests];

    if (filters.state !== "all") {
      filtered = filtered.filter((pr) => pr.state === filters.state);
    }

    if (filters.author) {
      filtered = filtered.filter((pr) =>
        pr.user.login.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    if (filters.label) {
      filtered = filtered.filter((pr) =>
        pr.labels.some((label) =>
          label.name.toLowerCase().includes(filters.label.toLowerCase())
        )
      );
    }

    if (filters.search) {
      filtered = filtered.filter(
        (pr) =>
          pr.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          pr.number.toString().includes(filters.search)
      );
    }

    setFilteredPRs(filtered);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newSelected = new Set(filteredPRs.map((pr) => pr.number));
      setSelectedPRs(newSelected);
    } else {
      setSelectedPRs(new Set());
    }
  };

  const handleSelectPR = (prNumber: number, checked: boolean) => {
    const newSelected = new Set(selectedPRs);
    if (checked) {
      newSelected.add(prNumber);
    } else {
      newSelected.delete(prNumber);
    }
    setSelectedPRs(newSelected);
  };

  const handleStateChange = (state: "all" | "open" | "closed") => {
    setFilters((prev) => ({ ...prev, state }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: event.target.value }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil(
        (date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      ),
      "day"
    );
  };

  return (
    <div className="max-w-[69rem] pt-6 text-black mx-auto px-4 py-2">
      {/* Upper Navigation */}
      <div className="mb-4 flex items-center space-x-2">
        {/* Search with Filters */}
        <div className="relative flex-1 flex">
          {/* Filters Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="inline-flex items-center px-2 py-[6px] text-xs font-light rounded-l-md border border-r-0 text-white border-gray-600 bg-[#262c36] hover:bg-[#404b5c]"
            >
              Filters
              <svg
                className="h-4 w-4 ml-1"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>

            {/* Filters Dropdown */}
            {isFilterDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div className="px-3 py-1.5 text-xs font-light text-gray-900 bg-gray-50 border-b border-gray-200">
                    Filter Issues
                  </div>

                  <button
                    className="block w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 text-left"
                    onClick={() => setIsFilterDropdownOpen(false)}
                  >
                    Open issues and pull requests
                  </button>

                  <button
                    className="block w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 text-left"
                    onClick={() => setIsFilterDropdownOpen(false)}
                  >
                    Your issues
                  </button>

                  <button
                    className="block w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 text-left"
                    onClick={() => setIsFilterDropdownOpen(false)}
                  >
                    Your pull requests
                  </button>

                  <button
                    className="block w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 text-left"
                    onClick={() => setIsFilterDropdownOpen(false)}
                  >
                    Everything assigned to you
                  </button>

                  <button
                    className="block w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 text-left"
                    onClick={() => setIsFilterDropdownOpen(false)}
                  >
                    Everything mentioning you
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="is:pr is:open"
              value={filters.search}
              onChange={handleSearch}
              className="w-full px-3 py-[6px] pl-8 border border-gray-600 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-[#151b23] text-xs font-light"
            />
            <div className="absolute inset-y-0 left-2 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
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
          </div>
        </div>

        {/* Right side buttons group */}
        <div className="flex items-center space-x-2">
          {/* Labels and Milestones button group */}
          <div className="flex">
            <a
              href="#"
              className="inline-flex items-center px-4 py-[6px] text-xs font-light rounded-l-md border text-white border-gray-600 bg-[#0a0f17] hover:bg-[#262c36]"
            >
              <svg
                className="mr-1 h-3.5 w-3.5 text-gray-400"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.13.414l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              Labels
            </a>

            <a
              href="#"
              className="inline-flex items-center px-4 py-[6px] text-xs font-light rounded-r-md border text-white border-gray-600 border-l-0 bg-[#0a0f17] hover:bg-[#262c36]"
            >
              <svg
                className="mr-1 h-3.5 w-3.5 text-gray-400"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z" />
              </svg>
              Milestones
            </a>
          </div>

          <button className="inline-flex items-center px-3 py-[6px] text-xs font-light rounded-md border border-transparent bg-[#29903b] text-white hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-green-500">
            New pull request
          </button>
        </div>
      </div>

      {/* Pull Requests List */}
      <div className="border border-gray-700 rounded-md mb-4">
        <div className="bg-[#151b23] rounded-t-md text-white px-4 py-2 font-light border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Select All Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-3 w-3 text-blue-600 rounded bg-[#2b2a33] border border-gray-600 focus:ring-blue-500"
                  checked={
                    selectedPRs.size === filteredPRs.length &&
                    filteredPRs.length > 0
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </div>

              <button
                onClick={() => handleStateChange("all")}
                className={`inline-flex items-center text-xs font-light ${
                  filters.state === "all"
                    ? "text-gray-50"
                    : "text-gray-600 hover:text-gray-100"
                }`}
              >
                {pullRequests.length} All
              </button>
              <button
                onClick={() => handleStateChange("open")}
                className={`inline-flex items-center text-xs font-light ${
                  filters.state === "open"
                    ? "text-gray-50"
                    : "text-gray-600 hover:text-gray-100"
                }`}
              >
                <svg
                  className="mr-1 h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                </svg>
                {pullRequests.filter((pr) => pr.state === "open").length} Open
              </button>
              <button
                onClick={() => handleStateChange("closed")}
                className={`inline-flex items-center text-xs font-light ${
                  filters.state === "closed"
                    ? "text-gray-50"
                    : "text-gray-600 hover:text-gray-100"
                }`}
              >
                <svg
                  className="mr-1 h-3.5 w-3.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
                {pullRequests.filter((pr) => pr.state === "closed").length}{" "}
                Closed
              </button>
            </div>

            {/* Status Navigation with Dropdowns */}
            <div className="flex items-center space-x-2">
              {/* Author Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "author" ? "" : "author"
                    )
                  }
                  className="inline-flex items-center px-2 py-[6px] text-xs font-light text-gray-600 hover:text-gray-100"
                >
                  Author
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                  </svg>
                </button>
                {activeDropdown === "author" && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Created by you
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        @celsozC
                      </button>
                      <input
                        type="text"
                        placeholder="Filter users"
                        className="block w-full px-4 py-2 text-xs border-t border-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Label Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "label" ? "" : "label")
                  }
                  className="inline-flex items-center px-2 py-[6px] text-xs font-light text-gray-600 hover:text-gray-100"
                >
                  Label
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                  </svg>
                </button>
                {activeDropdown === "label" && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <input
                        type="text"
                        placeholder="Filter labels"
                        className="block w-full px-4 py-2 text-xs border-b border-gray-200 focus:outline-none"
                      />
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        bug
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        enhancement
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        documentation
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Projects Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "projects" ? "" : "projects"
                    )
                  }
                  className="inline-flex items-center px-2 py-[6px] text-xs font-light text-gray-600 hover:text-gray-100"
                >
                  Projects
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                  </svg>
                </button>
                {activeDropdown === "projects" && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Project 1
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Project 2
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Milestones Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "milestones" ? "" : "milestones"
                    )
                  }
                  className="inline-flex items-center px-2 py-[6px] text-xs font-light text-gray-600 hover:text-gray-100"
                >
                  Milestones
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                  </svg>
                </button>
                {activeDropdown === "milestones" && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        v1.0
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        v2.0
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Assignee Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "assignee" ? "" : "assignee"
                    )
                  }
                  className="inline-flex items-center px-2 py-[6px] text-xs font-light text-gray-600 hover:text-gray-100"
                >
                  Assignee
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                  </svg>
                </button>
                {activeDropdown === "assignee" && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Assigned to you
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        @celsozC
                      </button>
                      <input
                        type="text"
                        placeholder="Filter users"
                        className="block w-full px-4 py-2 text-xs border-t border-gray-200 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "sort" ? "" : "sort")
                  }
                  className="inline-flex items-center px-2 py-[6px] text-xs font-light text-gray-600 hover:text-gray-100"
                >
                  Sort
                  <svg
                    className="ml-1 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
                  </svg>
                </button>
                {activeDropdown === "sort" && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Newest
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Oldest
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Most commented
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Least commented
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Recently updated
                      </button>
                      <button className="block w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-100">
                        Least recently updated
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-4 text-center">
            <svg
              className="animate-spin h-5 w-5 mx-auto text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              Loading pull requests...
            </p>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-600">
            <p className="font-light">Error loading pull requests</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : filteredPRs.length === 0 ? (
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
            <h3 className="mt-4 text-lg font-light text-gray-900">
              Welcome to Pull Requests
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Pull requests help you collaborate on code with other people.
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-light rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                New pull request
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {filteredPRs.map((pr, index) => (
              <div
                key={pr.number}
                className={`p-3 bg-[#151b23] ${
                  index === filteredPRs.length - 1 ? "rounded-b-md" : ""
                }`}
              >
                <div className="flex items-start">
                  {/* Checkbox */}
                  <div className="mr-3 mt-0.5">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-blue-600 rounded bg-[#2b2a33] border border-gray-600 focus:ring-blue-500"
                      checked={selectedPRs.has(pr.number)}
                      onChange={(e) =>
                        handleSelectPR(pr.number, e.target.checked)
                      }
                    />
                  </div>

                  {/* PR Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-0.5">
                      {/* PR Status Icon */}
                      {pr.state === "open" ? (
                        <svg
                          className="mr-1.5 h-4 w-4 text-green-500"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                        </svg>
                      ) : (
                        <svg
                          className="mr-1.5 h-4 w-4 text-purple-500"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 104.95 0l-2.25-3.25-2.7 3.25zm6.2.05a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-1.95 7.296a2.25 2.25 0 104.95 0l-2.25-3.25-2.7 3.25zm-1.1-1.1v-.004a.75.75 0 110 .004v-.005zm-4.55 1.1a2.25 2.25 0 104.95 0l-2.25-3.25-2.7 3.25z"
                          />
                        </svg>
                      )}

                      <h3 className="text-xs font-thin text-white hover:text-blue-400">
                        <a
                          href={`https://github.com/celsozC/github-clone/pull/${pr.number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {pr.state === "open" ? "Open: " : "Merged: "}
                          {pr.title}
                        </a>
                      </h3>
                      {pr.labels.map((label) => (
                        <span
                          key={label.name}
                          className="ml-2 px-2 py-0.5 text-[11px] font-light rounded-full"
                          style={{
                            backgroundColor: `#${label.color}20`,
                            color: `#${label.color}`,
                          }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      #{pr.number} opened {formatDate(pr.created_at)} by{" "}
                      <a
                        href={`/${pr.user.login}`}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        {pr.user.login}
                      </a>
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="ml-3 flex-shrink-0">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={pr.user.avatar_url}
                      alt={`${pr.user.login}'s avatar`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
