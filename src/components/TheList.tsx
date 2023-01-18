import { useRepos } from '../context/ReposContext';
import RepoCard from "./RepoCard";

export default function TheList() {
  const repos = useRepos()

  return (
    <main className="p-4 space-y-4 grow">
      {repos?.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
    </main>
  );
}
