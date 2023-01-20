import { useLanguageFilter, useRepos } from '../context/ReposContext';
import RepoCard from "./RepoCard";

export default function TheList() {
  const repos = useRepos()
  const enabledLanguages = useLanguageFilter()

  const filteredRepos = repos?.filter((repo) => {
    if (enabledLanguages.length === 0) {
      return true
    }
    return enabledLanguages.includes(repo.language)
  }) || []

  return (
    <main className="p-4 space-y-4 grow">
      {filteredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
    </main>
  );
}
