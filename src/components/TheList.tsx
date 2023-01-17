import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';
import RepoCard from "./RepoCard";

export default function TheList() {
  const repos = useLiveQuery(
    () => db.repos.where('issuesCount').above(0).toArray()
  );

  return (
    <main className="p-4 space-y-4 grow">
      {repos?.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
    </main>
  );
}
