import { Project } from "@/types/project";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { MouseEventHandler } from "react";

type Props = {};

const ViewProject = ({
  project,
  handleDelete,
  handleEdit,
}: {
  project: Project;
  handleDelete: MouseEventHandler;
  handleEdit: MouseEventHandler;
}) => {
  const { data: session } = useSession();
  const { title, image, paragraph, author, tags, publishDate } = project;
  return (
    <>
      <div
        className="wow fadeInUp relative w-[70%] overflow-hidden rounded-md bg-white bg-primary/[3%] shadow-one dark:bg-dark"
        data-wow-delay=".1s"
      >
        <div className="relative block h-[220px] w-full">
          <Image src={image} alt="image" fill />
        </div>

        <div className="p-6 text-center sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
          <h3 className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
            {title}
          </h3>
          <p className="mb-6 border-b-2 border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
            {paragraph}
          </p>
          <div className="mb-6 flex items-center justify-center border-b-2 border-body-color border-opacity-10 pb-6 dark:border-opacity-10">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5 ">
              <div className="mr-4 ">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image src={session?.user.image} alt="author" fill />
                </div>
              </div>
              <div className="w-full ">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white ">
                  By {author}
                </h4>
                {/* <p className="text-xs text-body-color">{author.designation}</p> */}
              </div>
            </div>
            <div className="inline-block ">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">{publishDate}</p>
            </div>
          </div>
          {session?.user && (
            <div className="flex items-center justify-center space-x-2">
              <button
                className="font-inter flex items-center justify-center rounded-full border border-black bg-black
                                 py-1.5 px-5 text-center text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={handleEdit}
              >
                Edit
              </button>

              <button
                className="font-inter flex items-center justify-center rounded-full border border-black bg-black
                                 py-1.5 px-5 text-center text-sm text-white transition-all hover:bg-red hover:text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProject;
