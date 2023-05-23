"use client";

import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import SingleProject from "@/components/Project/SingleProject";

const ProjectsList = ({ data }) => {
  return (
    <div className="mx-auto mt-5 flex w-full flex-col space-y-2 space-x-2 px-4 sm:flex-row sm:space-y-0">
      {data.map((p) => (
        <SingleProject key={p._id} project={p} />
      ))}
    </div>
  );
};

const ProjectData = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/project");
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section>
      <ProjectsList data={projects} />
    </section>
  );
};

export default ProjectData;
