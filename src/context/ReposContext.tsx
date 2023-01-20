import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Repo } from "../lib/db";

const ReposContext = createContext<Repo[] | undefined>([]);
const LanguageFilterContext = createContext<string[]>([]);
const SetLanguageFilterContext = createContext<React.Dispatch<React.SetStateAction<string[]>>>(() => {});

export function useRepos() {
  return useContext(ReposContext);
}

export function useLanguageFilter() {
  return useContext(LanguageFilterContext);
}

export function useSetLanguageFilter() {
  return useContext(SetLanguageFilterContext);
}

export function ReposProvider({ children }: { children: ReactNode[]}) {
  const repos = useLiveQuery(
    () => db.repos.where('issuesCount').above(0).toArray()
  );

  const [enabledLanguages, setEnabledLanguages] = useState<string[]>(JSON.parse(localStorage.getItem('enabledLanguages') || '[]'));

  useEffect(() => {
    localStorage.setItem('enabledLanguages', JSON.stringify(enabledLanguages));
  }, [enabledLanguages]);

  return (
    <ReposContext.Provider value={repos}>
      <LanguageFilterContext.Provider value={enabledLanguages}>
        <SetLanguageFilterContext.Provider value={setEnabledLanguages}>
          {children}
        </SetLanguageFilterContext.Provider>
      </LanguageFilterContext.Provider>
    </ReposContext.Provider>
  )
}