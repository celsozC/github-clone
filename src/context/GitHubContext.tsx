import React, { createContext, useContext, ReactNode } from "react";

interface GitHubContextType {
  username: string;
  repository: string;
  avatarUrl: string;
}

const GitHubContext = createContext<GitHubContextType>({
  username: "celsozC",
  repository: "github-clone",
  avatarUrl: "https://github.com/celsozC.png",
});

export const useGitHub = () => useContext(GitHubContext);

export const GitHubProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GitHubContext.Provider
      value={{
        username: "celsozC",
        repository: "github-clone",
        avatarUrl: "https://github.com/celsozC.png",
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};
