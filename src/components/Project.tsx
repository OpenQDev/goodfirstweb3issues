import { useState } from "react";

export default function Project() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="p-4 border border-gray-800 bg-[#161b22] hover:bg-[#191e25] rounded cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <h2 className="flex justify-between">
        OpenQDev/OpenQ-Fullstack
        {
          isOpen
            ? <span className="bg-gray-500 text-[#161b22] border border-transparent px-2 py-1 text-sm rounded">3 issues</span> 
            : <span className="bg-[#161b22] text-gray-500 border border-gray-800 px-2 py-1 text-sm rounded">3 issues</span>
        }
      </h2>
      <p className="mt-2 mb-1">Bash scripts for booting the full backend across local and test environments</p>
      <p className="flex justify-between text-gray-600">
        <span>Lang: JavaScript</span>
        <span>Stars: 0</span>
        <span>Last active: 3 days ago</span>
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
