import { useState } from "react";

export default function ProjectCard(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="p-4 border border-gray-800 bg-[#161b22] hover:bg-[#191e25] rounded cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="flex justify-between">
        {props.project.owner}/{props.project.name }
        {
          isOpen
            ? <span className="bg-gray-500 text-[#161b22] border border-transparent px-2 py-1 text-sm rounded">3 issues</span> 
            : <span className="bg-[#161b22] text-gray-500 border border-gray-800 px-2 py-1 text-sm rounded">3 issues</span>
        }
      </h2>
      <p className="mt-2 mb-1">{props.project.description}</p>
      <p className="flex space-x-3 text-gray-600">
        <span>Lang: {props.project.language}</span>
        <span>Stars: {props.project.stars}</span>
        <span className="grow text-right">Last active: 3 days ago</span>
      </p>
      <div className={isOpen ? "mt-4" : "hidden"}>
        <div>Issue 1</div>
        <div>Issue 2</div>
        <div>Issue 3</div>
        <div>Issue 4</div>
      </div>
    </div>
  );
}
