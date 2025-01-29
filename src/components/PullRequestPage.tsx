"use client";

import React, { useEffect, useState, useMemo } from "react";

interface PullRequest {
  number: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  state: string;
  draft: boolean;
  labels: Array<{
    name: string;
    color: string;
  }>;
  assignees?: Array<{
    login: string;
  }>;
  comments?: number;
  pull_request?: {
    url: string;
  } | null;
}

interface Filters {
  search: string;
  state: "all" | "open" | "closed";
  author: string;
  label: string;
  assignee: string;
  sort: string;
}

interface ItemIconProps {
  item: {
    type?: "issue" | "pr" | undefined;
    state: string;
    number: number;
    title: string;
    user: {
      login: string;
    };
    pull_request?: {
      url: string;
    } | null;
    created_at: string;
    labels: Array<{
      name: string;
      color: string;
    }>;
  };
}

const ItemIcon = ({ item }: ItemIconProps) => {
  const iconColors = {
    open: "text-green-500",
    closed: "text-purple-500",
  };

  const icons = {
    issue: {
      open: (
        <>
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
        </>
      ),
      closed: (
        <>
          <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" />
        </>
      ),
    },
    pr: {
      open: (
        <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
      ),
      closed: (
        <>
          <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" />
        </>
      ),
    },
  };

  const type = item.type || "pr";
  const state = item.state as keyof typeof iconColors;

  return (
    <svg
      className={`h-4 w-4 ${iconColors[state]}`}
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      {icons[type][state]}
    </svg>
  );
};

export default function PullRequestPage() {
  const [items, setItems] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPRs, setSelectedPRs] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Filters>({
    search: "",
    state: "all",
    author: "",
    label: "",
    assignee: "",
    sort: "newest",
  });

  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.github.com/repos/celsozC/github-clone/issues?state=all&per_page=100",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch items: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
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

  const handleStateChange = (state: string) => {
    if (state === "all") {
      setFilters((prev) => ({ ...prev, search: "is:pr" }));
    } else if (state === "open") {
      setFilters((prev) => ({ ...prev, search: "is:pr is:open" }));
    } else if (state === "closed") {
      setFilters((prev) => ({ ...prev, search: "is:pr is:closed" }));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
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

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    setActiveDropdown(""); // Close dropdown after selection
  };

  const parseSearchQuery = (query: string) => {
    const terms = query.toLowerCase().split(" ");
    return {
      isOpen: terms.includes("is:open"),
      isClosed: terms.includes("is:closed"),
      isIssue: terms.includes("is:issue"),
      isPR: terms.includes("is:pr"),
      author: terms.find((t) => t.startsWith("author:"))?.split(":")[1] || "",
      assignee:
        terms.find((t) => t.startsWith("assignee:"))?.split(":")[1] || "",
      mentions:
        terms.find((t) => t.startsWith("mentions:"))?.split(":")[1] || "",
      searchText: terms.filter((t) => !t.includes(":")).join(" "),
    };
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchQuery = parseSearchQuery(filters.search);

      // Handle state filters
      if (searchQuery.isOpen && item.state !== "open") return false;
      if (searchQuery.isClosed && item.state !== "closed") return false;

      // Handle type filters
      const isPullRequest = item.pull_request !== undefined;
      if (searchQuery.isIssue && isPullRequest) return false;
      if (searchQuery.isPR && !isPullRequest) return false;

      // By default (no type filter), show only PRs
      if (!searchQuery.isIssue && !searchQuery.isPR && !isPullRequest)
        return false;

      // Handle user-related filters
      const currentUser = "me";
      if (searchQuery.author === currentUser && item.user.login !== currentUser)
        return false;
      if (
        searchQuery.assignee === currentUser &&
        !item.assignees?.some((a) => a.login === currentUser)
      )
        return false;
      if (searchQuery.mentions === currentUser) {
        return false;
      }

      // Handle text search (non-filter terms)
      if (searchQuery.searchText) {
        const searchLower = searchQuery.searchText.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.number.toString().includes(searchLower) ||
          item.user.login.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [items, filters]);

  const prCounts = useMemo(() => {
    const prsOnly = items.filter((item) => item.pull_request !== undefined);
    const openPRs = prsOnly.filter((pr) => pr.state === "open").length;
    const closedPRs = prsOnly.filter((pr) => pr.state === "closed").length;

    return {
      total: openPRs + closedPRs, // Total PRs (not including issues)
      open: openPRs,
      closed: closedPRs,
    };
  }, [items]);

  return (
    <div className="max-w-[69rem] pt-6 text-black mx-auto px-4 py-2">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col space-y-3">
        {/* Row 1: Labels/Milestones and New button */}
        <div className="flex justify-between items-center">
          <div className="flex">
            <a
              href="#"
              className="inline-flex items-center px-3 py-[6px] text-xs font-light rounded-l-md border text-white border-gray-600 bg-[#0a0f17] hover:bg-[#262c36]"
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
              className="inline-flex items-center px-3 py-[6px] text-xs font-light rounded-r-md border text-white border-gray-600 border-l-0 bg-[#0a0f17] hover:bg-[#262c36]"
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
          <button className="inline-flex items-center px-3 py-[6px] text-xs font-light rounded-md border border-transparent bg-[#29903b] text-white hover:bg-green-700">
            New
          </button>
        </div>

        {/* Row 2: Search with Filters */}
        <div className="relative flex w-full">
          <div className="relative">
            <button
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="inline-flex items-center px-3 py-[6px] text-xs font-light rounded-l-md border border-r-0 text-white border-gray-600 bg-[#262c36] hover:bg-[#404b5c]"
            >
              Filters
              <svg
                className="ml-1 h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-[#161b22] border border-gray-700 z-50">
                <div className="py-1">
                  <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                    Filter Issues
                  </div>
                  <button
                    onClick={() => {
                      handleFilterChange("search", "is:open");
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    Open issues and pull requests
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange("search", "is:closed");
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    Closed issues and pull requests
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange("search", "is:issue author:@me");
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    Your issues
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange("search", "is:pr author:@me");
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    Your pull requests
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange("search", "assignee:@me");
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    Everything assigned to you
                  </button>
                  <button
                    onClick={() => {
                      handleFilterChange("search", "mentions:@me");
                      setIsFilterDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    Everything mentioning you
                  </button>

                  <div className="border-t border-gray-700">
                    <a
                      href="https://docs.github.com/search-github/searching-on-github/searching-issues-and-pull-requests"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                    >
                      View advanced search syntax →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Type is:pr is:open is:issue is:closed to filter"
              value={filters.search}
              onChange={handleSearch}
              className="w-full px-3 py-[6px] pl-8 border border-gray-600 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-[#151b23] text-xs font-light text-white placeholder-gray-400"
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

        {/* Row 3: All/Open/Closed */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => handleStateChange("all")}
            className={`px-3 py-2 text-xs font-light ${
              !filters.search.includes("is:open") &&
              !filters.search.includes("is:closed")
                ? "border-b-2 border-orange-500 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <svg
              className="inline-block mr-1 h-4 w-4"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
            </svg>
            {prCounts.total} All
          </button>
          <button
            onClick={() => handleStateChange("open")}
            className={`px-3 py-2 text-xs font-light ${
              filters.search.includes("is:open")
                ? "border-b-2 border-orange-500 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <svg
              className="inline-block mr-1 h-4 w-4"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
            </svg>
            {prCounts.open} Open
          </button>
          <button
            onClick={() => handleStateChange("closed")}
            className={`px-3 py-2 text-xs font-light ${
              filters.search.includes("is:closed")
                ? "border-b-2 border-purple-500 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <svg
              className="inline-block mr-1 h-4 w-4"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            </svg>
            {prCounts.closed} Closed
          </button>
        </div>

        {/* Row 4: Filter options */}
        <div className="flex items-center justify-between px-2 py-2 text-xs text-gray-400">
          {/* Author Filter */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "author" ? "" : "author")
              }
              className="inline-flex items-center space-x-1 hover:text-gray-200"
            >
              <span>{filters.author || "Author"}</span>
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>
            {activeDropdown === "author" && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#161b22] border border-gray-700 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleFilterChange("author", "")}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    All authors
                  </button>
                  {Array.from(new Set(items.map((pr) => pr.user.login))).map(
                    (author) => (
                      <button
                        key={author}
                        onClick={() => handleFilterChange("author", author)}
                        className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                      >
                        {author}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Label Filter */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "label" ? "" : "label")
              }
              className="inline-flex items-center space-x-1 hover:text-gray-200"
            >
              <span>{filters.label || "Label"}</span>
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>
            {activeDropdown === "label" && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#161b22] border border-gray-700 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleFilterChange("label", "")}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    All labels
                  </button>
                  {Array.from(
                    new Set(
                      items.flatMap((pr) =>
                        pr.labels.map((label) => label.name)
                      )
                    )
                  ).map((label) => (
                    <button
                      key={label}
                      onClick={() => handleFilterChange("label", label)}
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Assignee Filter */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "assignee" ? "" : "assignee"
                )
              }
              className="inline-flex items-center space-x-1 hover:text-gray-200"
            >
              <span>{filters.assignee || "Assignee"}</span>
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>
            {activeDropdown === "assignee" && (
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#161b22] border border-gray-700 z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleFilterChange("assignee", "")}
                    className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                  >
                    All assignees
                  </button>
                  {Array.from(
                    new Set(
                      items.flatMap(
                        (pr) => pr.assignees?.map((a) => a.login) || []
                      )
                    )
                  ).map((assignee) => (
                    <button
                      key={assignee}
                      onClick={() => handleFilterChange("assignee", assignee)}
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                    >
                      {assignee}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "sort" ? "" : "sort")
              }
              className="inline-flex items-center space-x-1 hover:text-gray-200"
            >
              <span>Sort</span>
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
              </svg>
            </button>
            {activeDropdown === "sort" && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#161b22] border border-gray-700 z-50">
                <div className="py-1">
                  {[
                    { value: "newest", label: "Newest" },
                    { value: "oldest", label: "Oldest" },
                    { value: "most-commented", label: "Most commented" },
                    {
                      value: "least-commented",
                      label: "Least commented",
                    },
                    {
                      value: "recently-updated",
                      label: "Recently updated",
                    },
                    {
                      value: "least-recently-updated",
                      label: "Least recently updated",
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange("sort", option.value)}
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PR List for Mobile */}
        <div className="border border-gray-700 rounded-md">
          {filteredItems.map((item, index) => (
            <div
              key={`${item.number}-${index}`}
              className="flex items-start px-3 py-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-800"
            >
              <div className="flex-shrink-0 pt-1 mr-3">
                <ItemIcon item={item} />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium truncate">
                    <a
                      href={`https://github.com/celsozC/github-clone/pull/${item.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-50 hover:text-[#539bf5]"
                    >
                      {item.title}
                    </a>
                  </span>
                  <div className="flex items-center gap-2">
                    {item.labels.map((label, labelIndex) => (
                      <span
                        key={`${label.name}-${labelIndex}`}
                        style={{ backgroundColor: `#${label.color}` }}
                        className="px-2 py-0.5 text-xs rounded-full whitespace-nowrap"
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  #{item.number} {item.state === "open" ? "opened" : "closed"}{" "}
                  {formatDate(item.created_at)} by {item.user.login}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Original Code */}
      <div className="hidden md:block">
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
                <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-[#161b22] border border-gray-700 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                      Filter Issues
                    </div>

                    <button
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        handleFilterChange("search", "is:open");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      Open issues and pull requests
                    </button>

                    <button
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        handleFilterChange("search", "is:closed");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      Closed issues and pull requests
                    </button>

                    <button
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        handleFilterChange("search", "is:issue author:@me");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      Your issues
                    </button>

                    <button
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        handleFilterChange("search", "is:pr author:@me");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      Your pull requests
                    </button>

                    <button
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        handleFilterChange("search", "assignee:@me");
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      Everything assigned to you
                    </button>

                    <button
                      className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-gray-700"
                      onClick={() => {
                        handleFilterChange("search", "mentions:@me");
                        setIsFilterDropdownOpen(false);
                      }}
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
                placeholder="Type is:pr is:open is:issue is:closed to filter"
                value={filters.search}
                onChange={handleSearch}
                className="w-full px-3 py-[6px] pl-8 border border-gray-600 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-[#151b23] text-xs font-light text-white placeholder-gray-400"
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
                  <path d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.13.414l6.25 6.25a1.75 1.75 0 010 2.474l-6.25 6.25a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z" />
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
        <div className="border border-gray-700 rounded-t-md">
          <div className="bg-[#151b23] rounded-t-md text-white px-4 py-2 font-light border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Select All Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-3 w-3 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={
                      selectedPRs.size === items.length && items.length > 0
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPRs(
                          new Set(items.map((item) => item.number))
                        );
                      } else {
                        setSelectedPRs(new Set());
                      }
                    }}
                  />
                </div>

                {/* PR Status Buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleStateChange("all")}
                    className={`inline-flex items-center text-xs font-light ${
                      !filters.search.includes("is:open") &&
                      !filters.search.includes("is:closed")
                        ? "text-gray-50"
                        : "text-gray-600 hover:text-gray-100"
                    }`}
                  >
                    {prCounts.total} All
                  </button>

                  <button
                    onClick={() => handleStateChange("open")}
                    className={`inline-flex items-center space-x-1 text-xs font-light ${
                      filters.search.includes("is:open")
                        ? "text-gray-50"
                        : "text-gray-600 hover:text-gray-100"
                    }`}
                  >
                    <svg
                      className="h-3.5 w-3.5 text-green-500"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                    </svg>
                    <span>{prCounts.open} Open</span>
                  </button>

                  <button
                    onClick={() => handleStateChange("closed")}
                    className={`inline-flex items-center space-x-1 text-xs font-light ${
                      filters.search.includes("is:closed")
                        ? "text-gray-50"
                        : "text-gray-600 hover:text-gray-100"
                    }`}
                  >
                    <svg
                      className="h-3.5 w-3.5 text-purple-500"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    </svg>
                    <span>{prCounts.closed} Closed</span>
                  </button>
                </div>
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
        ) : filteredItems.length === 0 ? (
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
            <h3 className="mt-4 text-lg font-light text-gray-50">
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
          <div className="divide-y divide-gray-700 border border-gray-700 rounded-bl-md rounded-br-md">
            {filteredItems.map((item, index) => (
              <div
                key={`${item.number}-${index}`}
                className={`p-3 bg-[#151b23] ${
                  index === filteredItems.length - 1
                    ? "rounded-bl-md rounded-br-md"
                    : ""
                }`}
              >
                <div className="flex items-start">
                  {/* Checkbox */}
                  <div className="mr-3 mt-0.5">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-blue-600 rounded bg-[#2b2a33] border border-gray-600 focus:ring-blue-500"
                      checked={selectedPRs.has(item.number)}
                      onChange={(e) =>
                        handleSelectPR(item.number, e.target.checked)
                      }
                    />
                  </div>

                  {/* PR Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      {/* PR Status Icon */}
                      {item.state === "open" ? (
                        <svg
                          className="h-4 w-4 text-green-500"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 text-purple-500"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                        </svg>
                      )}

                      <h3 className="text-base font-normal">
                        <a
                          href={`https://github.com/celsozC/github-clone/pull/${item.number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-50 hover:text-[#539bf5]"
                        >
                          {item.title}
                        </a>
                      </h3>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      #{item.number}{" "}
                      {item.state === "open" ? "opened" : "closed"}{" "}
                      {formatDate(item.created_at)} by {item.user.login}
                    </div>
                  </div>

                  {/* Avatar */}
                  <div className="ml-3 flex-shrink-0">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={item.user.avatar_url}
                      alt={`${item.user.login}'s avatar`}
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
