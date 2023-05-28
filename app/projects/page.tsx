"use client";

import ProjectData from "@/components/Project/ProjectData";
import Breadcrumb from "@/components/Common/Breadcrumb";
import AddProject from "@/components/Project/AddProject";
import { useState } from "react";
import { useSession } from "next-auth/react";
import uploadFileToS3 from "@/components/Project/UploadToS3";
import { set } from "mongoose";
import router from "next/router";

type Props = {};

const Projects = (props: Props) => {
  const { data: session } = useSession();
  const [showAddProj, setShowAddProj] = useState(false);
  const [btn, setBtn] = useState(false);
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // console.log(file);
    try {
      // uploadFileToS3(file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.ok) {
        router.push("/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Breadcrumb
        pageName="Projects"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <section className="items-center justify-center pt-[100px] pb-[100px]">
        <div className="container  bg-primary/[3%] ">
          <div className=" -mx-4 mb-5 flex flex-wrap justify-center pb-3">
            {/* {projectData.map((project) => (
              <div
                key={project.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleProject project={project} />
              </div>
            ))} */}
            <ProjectData />
          </div>
          {session?.user && (
            <button
              className="btn  mx-auto mb-5 flex items-center justify-center hover:border hover:border-white "
              onClick={() => {
                setShowAddProj((prev) => !prev);
                setBtn((prev) => !prev);
              }}
            >
              {btn ? "Cancel" : "Add New Project"}
            </button>
          )}
          <div className="w-full px-4 md:w-1/2">
            <div className="mb-8">
              <label
                htmlFor="image"
                className="mb-3 block text-sm font-medium text-dark dark:text-white"
              >
                Image Upload
              </label>
              <input
                type="file"
                name="imageUpload"
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                                     shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
              />
              <button className="felx btn" onClick={handleUpload}>
                Upload Image
              </button>
            </div>
          </div>
          {showAddProj && (
            <div className="  flex flex-col items-center justify-center border-t-2">
              <AddProject />
            </div>
          )}

          <div
            className="wow fadeInUp -mx-4 flex flex-wrap"
            data-wow-delay=".15s"
          >
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%]
                     px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Prev
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%]
                     px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%]
                     px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%]
                     px-4 text-sm text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    3
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    className="flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-body-color
                   bg-opacity-[15%] px-4 text-sm text-body-color"
                  >
                    ...
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm
                     text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    12
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md bg-body-color bg-opacity-[15%] px-4 text-sm
                     text-body-color transition hover:bg-primary hover:bg-opacity-100 hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
