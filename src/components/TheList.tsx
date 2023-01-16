import { useAppSelector } from '../store/hooks'
import { Repo } from '../store/repos';
import RepoCard from "./RepoCard";

export default function TheList() {
  const repos = useAppSelector((state) => state.repos)
  const reposList = Object.values(repos).map((repo: Repo) => <RepoCard key={repo.id} repo={repo} />)

  return (
    <main className="p-4 space-y-4 grow">
      {reposList}
    </main>
  );
}
