"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {};

const AddProject = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [project, setProject] = useState({
    id: 1,
    title: "",
    paragraph: "",
    image: "",
    author: "",
    tags: [""],
    publishDate: "",
  });

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/project/new", {
        method: "POST",
        body: JSON.stringify({
          author: project.author,
          title: project.title,
          paragraph: project.paragraph,
          publishDate: project.publishDate,
        }),
      });
      if (res.ok) {
        router.push("/projects");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {session?.user && (
        <section
          id="contact"
          className="overflow-hidden py-16 md:py-20 lg:py-28"
        >
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
                <div
                  className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                  data-wow-delay=".15s
          "
                >
                  <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                    Add Project
                  </h2>
                  <form>
                    <div className="-mx-4 flex flex-wrap">
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="name"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={(e) => (project.author = e.target.value)}
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
                            onChange={(e) => (project.title = e.target.value)}
                            type="text"
                            placeholder="Project Title"
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
                            onChange={(e) =>
                              (project.publishDate = e.target.value)
                            }
                            placeholder="Project Date"
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
                            onChange={(e) =>
                              (project.paragraph = e.target.value)
                            }
                            className="w-full resize-none rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                         shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          ></textarea>
                        </div>
                      </div>
                      <div className="w-full px-4">
                        <button
                          onClick={handleAddProject}
                          className="rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300
                         ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                        >
                          Add Project
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddProject;
