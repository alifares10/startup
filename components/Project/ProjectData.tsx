"use client";

import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import SingleProject from "@/components/Project/SingleProject";
import UploadFile from "@/components/Project/UploadFile";

const ProjectsList = ({ data }) => {
  return (
    <div className="mx-auto mt-5 flex w-full flex-col space-y-2 space-x-2 px-4 sm:flex-row sm:space-y-0 ">
      {data.map((p) => (
        <SingleProject key={p._id} project={p} />
      ))}
    </div>
  );
};

const ProjectData = () => {
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterProjects = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return projects.filter(
      (item) => regex.test(item.author) || regex.test(item.title)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterProjects(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

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
      <form className="relative flex  items-center justify-center  pt-4 ">
        <input
          type="text"
          placeholder="Search a Project name or user name "
          value={searchText}
          onChange={handleSearchChange}
          required
          className=" border-gray-200 font-satoshi peer block w-full rounded-md border bg-white py-2.5 pl-5 pr-12 text-sm font-medium shadow-lg focus:border-black focus:outline-none
                      focus:ring-0 "
        />
      </form>
      {searchText ? (
        <ProjectsList data={searchedResults} />
      ) : (
        <ProjectsList data={projects} />
      )}
    </section>
  );
};

export default ProjectData;
