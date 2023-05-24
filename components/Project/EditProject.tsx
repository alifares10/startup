"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const EditProject = ({ handleEdit, project }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");
  const [newProject, setNewProject] = useState({
    author: project.author,
    title: project.title,
    publishDate: project.publishDate,
    paragraph: project.paragraph,
  });

  const updateProj = async (e) => {
    e.preventDefault();
    if (!project._id) {
      alert("Project id not found");
    }
    try {
      const res = await fetch(`/api/project/${project._id.toString()}`, {
        method: "PATCH",
        body: JSON.stringify({
          author: newProject.author,
          title: newProject.title,
          publishDate: newProject.publishDate,
          paragraph: newProject.paragraph,
        }),
      });
      if (res.ok) {
        router.push("/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="contact"
      className="fadeInUp fixed inset-y-0 inset-x-10 z-30 mx-auto flex h-fit items-center justify-center  py-16 md:py-20 lg:py-28 "
    >
      <div className="container items-center justify-center py-12">
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          <div className="mt-4 w-full  px-4  lg:w-7/12 xl:w-8/12 ">
            <div
              className="wow fadeInUp mb-0 rounded-md border border-x-4 border-y-4 bg-neutral-100 py-3 px-8  dark:bg-dark   sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
          "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Edit Project
              </h2>
              <form>
                <div className="-mx-4 flex flex-wrap ">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        defaultValue={project.author}
                        type="text"
                        placeholder="Enter your name"
                        required
                        onChange={(e) => (newProject.author = e.target.value)}
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                         shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        // htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Project Title
                      </label>
                      <input
                        defaultValue={project.title}
                        onChange={(e) => (newProject.title = e.target.value)}
                        type="text"
                        placeholder="Project Title"
                        required
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                         shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        // htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Project Date
                      </label>
                      <input
                        type="text"
                        defaultValue={project.publishDate}
                        onChange={(e) =>
                          (newProject.publishDate = e.target.value)
                        }
                        placeholder="Project Date"
                        required
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                         shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        required
                        defaultValue={project.paragraph}
                        onChange={(e) =>
                          (newProject.paragraph = e.target.value)
                        }
                        className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                         shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center space-x-3 px-4">
                    <button
                      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300
                         ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                      onClick={updateProj}
                    >
                      Confirm
                    </button>
                    <button
                      className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300
                         ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                      onClick={handleEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProject;
