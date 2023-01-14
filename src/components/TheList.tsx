import { useEffect, useState } from "react";
import { db } from "../lib/db";
import { Project } from "../react-app-env";
import ProjectCard from "./ProjectCard";

export default function TheList() {
  const [projects, setProjects] = useState({} as Record<string, Project>);

  useEffect(() => {
    db.get('projects').map().once((project: Project, projectKey: any) => {
      setProjects((prevProjects: Record<string, Project>) => {
        return {...prevProjects, [projectKey]: project};
      });
    });
  }, []);

  return (
    <main className="p-4 space-y-4 grow">
      {
        Object.keys(projects).map((projectKey: any) => {
          return <ProjectCard key={projectKey} project={projects[projectKey]} />
        })
      }
    </main>
  );
}
