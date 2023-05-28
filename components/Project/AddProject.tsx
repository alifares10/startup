"use client";

import { error } from "console";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import uploadFileToS3 from "@/components/Project/UploadToS3";

type Props = {};

export function converToBase64(e, setImage64) {
  var reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = () => {
    setImage64(reader.result);
  };
  reader.onerror = (error) => {
    console.log("Error", error);
  };
}

const AddProject = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [image64, setImage64] = useState("");
  const [file, setFile] = useState(null);
  const [project, setProject] = useState({
    id: 1,
    title: "",
    paragraph: "",
    image: "",
    author: "",
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
          image: project.image,
        }),
      });
      if (res.ok) {
        router.push("/projects");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    converToBase64(e, setImage64);
    project.image = image64;
    console.log(image64);
  };

  const handleFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      // uploadFileToS3(file);
      // const res = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // if (res.ok) {
      //   router.push("/projects");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {session?.user && (
        <section
          id="contact"
          className="items-center justify-center overflow-hidden py-2 md:py-20 lg:py-28"
        >
          <div className="container items-center justify-center">
            <div className="-mx-4 flex flex-wrap items-center justify-center">
              <div className="w-full  px-4 lg:w-7/12 xl:w-8/12">
                <div
                  className="wow fadeInUp mb-12 items-center justify-center rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
                  data-wow-delay=".15s"
                >
                  <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                    Add Project
                  </h2>
                  <form onSubmit={handleAddProject}>
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
                            required
                            onChange={(e) => (project.author = e.target.value)}
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                         shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="title"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Project Title
                          </label>
                          <input
                            onChange={(e) => (project.title = e.target.value)}
                            type="text"
                            required
                            placeholder="Project Title"
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                         shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 md:w-1/2">
                        <div className="mb-8">
                          <label
                            htmlFor="date"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            Project Date
                          </label>
                          <input
                            type="date"
                            required
                            onChange={(e) =>
                              (project.publishDate = e.target.value)
                            }
                            placeholder="Project Date"
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                                   shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>
                      </div>
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
                            // onChange={(e) =>
                            //   (project.publishDate = e.target.value)
                            // }
                            onChange={handleFile}
                            accept="image/*"
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color
                                     shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                          <button className="felx btn" onClick={handleUpload}>
                            Upload Image
                          </button>
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
                      <div className="flex w-full justify-center px-4">
                        <button
                          type="submit"
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
