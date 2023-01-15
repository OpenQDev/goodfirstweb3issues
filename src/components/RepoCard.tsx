import { useState } from "react";
import { db } from "../lib/db";
import IssueCard from "./IssueCard";

export default function RepoCard(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [issues, setIssues] = useState({} as Record<string, any>);

  db.get('repos').get(`${props.repo.owner}/${props.repo.name}`).get('issues').map().once((issue, issueNumber: any) => {
    setIssues((prevIssues: Record<string, any>) => {
      if (issue) {
        return {...prevIssues, [issueNumber]: issue};
      }

      delete prevIssues[issueNumber];
      return prevIssues;
    });
  });

  return (
    <div
      className={['p-4 border border-gray-800 hover:bg-[#191e25] rounded cursor-pointer', isOpen ? 'bg-[#191e25]' : 'bg-[#161b22]'].join(' ')}
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="flex justify-between">
        {props.repo.owner}/{props.repo.name}
        {
          isOpen
            ? <span className="bg-gray-500 text-[#161b22] border border-transparent px-2 py-1 text-sm rounded">{Object.keys(issues).length} issues</span> 
            : <span className="bg-[#161b22] text-gray-500 border border-gray-800 px-2 py-1 text-sm rounded">{Object.keys(issues).length} issues</span>
        }
      </h2>
      <p className="mt-2 mb-1">{props.repo.description}</p>
      <p className="flex space-x-3 text-gray-600">
        <span>Lang: {props.repo.language}</span>
        <span>Stars: {props.repo.stars}</span>
        <span className="grow text-right">Last active: {props.repo.lastActive}</span>
      </p>
      <div className={isOpen ? "mt-4 space-y-3" : "hidden"}>
        {
          Object.keys(issues).map((issueNumber: any) => {
            return <IssueCard key={issueNumber} issue={issues[issueNumber]} />
          })
        }
      </div>
    </div>
  );
}
