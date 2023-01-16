import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Issue } from "../store/issues";
import { Repo } from "../store/repos";
import IssueCard from "./IssueCard";

export default function RepoCard(props: { repo: Repo }) {
  const [isOpen, setIsOpen] = useState(false)
  const issueIds = props.repo.issueIds.split(',').filter((id: string) => id !== '')
  const issues = useAppSelector((state) => Object.values(state.issues).filter((issue) => issueIds.includes(issue.id)))
  const issueList = issues.map((issue: Issue) => <IssueCard key={issue.id} issue={issue} />)

  return (
    <div
      className={['p-4 border border-gray-800 hover:bg-[#191e25] rounded cursor-pointer', isOpen ? 'bg-[#191e25]' : 'bg-[#161b22]'].join(' ')}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="flex justify-between">
        {props.repo.owner}/{props.repo.name}
        {
          isOpen
            ? <span className="bg-gray-500 text-[#161b22] border border-transparent px-2 py-1 text-sm rounded">{issueList.length} issues</span> 
            : <span className="bg-[#161b22] text-gray-500 border border-gray-800 px-2 py-1 text-sm rounded">{issueList.length} issues</span>
        }
      </h2>
      <p className="mt-2 mb-1">{props.repo.description}</p>
      <p className="flex space-x-3 text-gray-600">
        <span>Lang: {props.repo.language}</span>
        <span>Stars: {props.repo.stars}</span>
        <span className="grow text-right">Last active: {props.repo.lastMirrored}</span>
      </p>
      <div className={isOpen ? "mt-4 space-y-3" : "hidden"}>
        {issueList}
      </div>
    </div>
  );
}
