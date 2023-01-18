import { createContext, ReactNode, useContext } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Repo } from "../lib/db";

const ReposContext = createContext<Repo[]>([]);

export function useRepos() {
  return useContext(ReposContext);
}

export function ReposProvider({ children }: { children: ReactNode[]}) {
  const repos = useLiveQuery(
    () => db.repos.where('issuesCount').above(0).toArray()
  );

  return (
    <ReposContext.Provider value={repos || []}>
      {children}
    </ReposContext.Provider>
  )
}