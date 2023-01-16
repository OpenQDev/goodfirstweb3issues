import TheHeader from "./components/TheHeader";
import TheSidebar from "./components/TheSidebar";
import TheList from "./components/TheList";
import { db } from "./lib/db";
import { useAppDispatch } from "./store/hooks";
import { deleteRepo, setRepo } from "./store/repos";
import { deleteIssue, setIssue } from "./store/issues";

export default function App() {
  const dispatch = useAppDispatch();

  // get live updates on repository list from gun and keep store in sync
  db.get('repos').map().on((repo, repoId) => {
    const issueIds = repo?.issueIds.split(',').filter((id: string) => id !== '')
    if (issueIds && issueIds.length > 0) {
      dispatch(setRepo(repo))
    } else {
      dispatch(deleteRepo(repoId))
    }
  })

  // get live updates on issue list from gun and keep store in sync
  db.get('issues').map().on((issue, issueId) => {
    if (issue) {
      dispatch(setIssue(issue))
    } else {
      dispatch(deleteIssue(issueId))
    }
  })

  return (
    <>
      <TheHeader />
      <section className="flex flex-col lg:flex-row lg:divide-x divide-gray-800 max-w-screen-md lg:max-w-screen-lg mx-auto">
        <TheSidebar />
        <TheList />
      </section>
    </>
  );
}
