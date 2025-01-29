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
  const [filters, setFilters] = useState<Filters>({
    state: "open",
    author: "",
    label: "",
    search: "",
  });

  useEffect(() => {
    fetchPullRequests();
  }, []);

  // Apply filters whenever filters or pullRequests change
  useEffect(() => {
    applyFilters();
  }, [filters, pullRequests]);

  const fetchPullRequests = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/celsozC/github-clone/pulls?state=all",
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
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...pullRequests];

    // Filter by state
    if (filters.state !== "all") {
      filtered = filtered.filter((pr) => pr.state === filters.state);
    }

    // Filter by author
    if (filters.author) {
      filtered = filtered.filter((pr) =>
        pr.user.login.toLowerCase().includes(filters.author.toLowerCase())
      );
    }

    // Filter by label
    if (filters.label) {
      filtered = filtered.filter((pr) =>
        pr.labels.some((label) =>
          label.name.toLowerCase().includes(filters.label.toLowerCase())
        )
      );
    }

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(
        (pr) =>
          pr.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          pr.number.toString().includes(filters.search)
      );
    }

    setFilteredPRs(filtered);
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

  console.log("Component State:", {
    loading,
    error,
    pullRequestsCount: pullRequests.length,
  });

  return (
    <div className="max-w-7xl text-black mx-auto px-4 py-4">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md border border-sm text-white border-gray-300 bg-[#262c36] hover:bg-[#3d444d]">
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
              value={filters.search}
              onChange={handleSearch}
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
              <button
                onClick={() => handleStateChange("open")}
                className={`inline-flex items-center text-sm font-medium ${
                  filters.state === "open"
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {pullRequests.filter((pr) => pr.state === "open").length} Open
              </button>
              <button
                onClick={() => handleStateChange("closed")}
                className={`inline-flex items-center text-sm font-medium ${
                  filters.state === "closed"
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {pullRequests.filter((pr) => pr.state === "closed").length}{" "}
                Closed
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

        {/* Pull Requests List with Debug Info */}
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
            <p className="font-medium">Error loading pull requests</p>
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
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredPRs.map((pr) => (
              <div key={pr.number} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <h3 className="text-base font-medium text-gray-900 hover:text-blue-600">
                        <a
                          className="text-white hover:text-gray-900"
                          href={`/pulls/${pr.number}`}
                        >
                          {pr.title}
                        </a>
                      </h3>
                      {pr.labels.map((label) => (
                        <span
                          key={label.name}
                          className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `#${label.color}20`,
                            color: `#${label.color}`,
                          }}
                        >
                          {label.name}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      #{pr.number} opened {formatDate(pr.created_at)} by{" "}
                      <a
                        href={`/${pr.user.login}`}
                        className="text-gray-900 hover:text-blue-600"
                      >
                        {pr.user.login}
                      </a>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full"
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
