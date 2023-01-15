import { useEffect, useState } from "react";
import { db, updateRepo } from "../lib/db";
import RepoCard from "./RepoCard";

export default function TheList() {
  const [repos, setRepos] = useState({} as Record<string, any>);

  useEffect(() => {
    db.get('repos').map().on((repo, repoKey: any) => {
      if (repo) {
        if (repo.lastMirrored < Date.now() - 1000 * 60) {
          updateRepo(repoKey);
        } else {
          setRepos((prevRepos: Record<string, any>) => {
            return {...prevRepos, [repoKey]: repo};
          });
        }
      } else {
        setRepos((prevRepos: Record<string, any>) => {
          delete prevRepos[repoKey];
          return prevRepos;
        });
      }
    });
  }, []);

  return (
    <main className="p-4 space-y-4 grow">
      {
        Object.keys(repos).map((repoKey: any) => {
          return <RepoCard key={repoKey} repo={repos[repoKey]} />
        })
      }
    </main>
  );
}
