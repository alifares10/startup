"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ViewProject from "@/components/Project/ViewProject";
import EditProject from "@/components/Project/EditProject";

type Props = {};

const MyProject = ({ params }) => {
  const router = useRouter();
  const [project, setProject] = useState([]);
  const searchParams = useSearchParams();
  const title = searchParams.get("name");
  const [Edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/project/${params?.id}`);
      const data = await res.json();
      setProject(data);
    };

    if (params?.id) fetchProject();
  }, [params?.id]);

  const handleDelete = async (project) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/project/${project._id.toString()}`, {
          method: "DELETE",
        });
        router.back();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };

  return (
    <>
      <Breadcrumb
        pageName={title}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      {/* <button className="btn mx-auto flex justify-center">asdasd</button> */}

      <div className="mx-auto mt-5 mb-5 flex w-full  justify-center px-4 ">
        <ViewProject
          project={project}
          handleDelete={() => handleDelete(project)}
          handleEdit={() => handleEdit()}
        />
      </div>
      {Edit && <EditProject handleEdit={handleEdit} />}
    </>
  );
};

export default MyProject;
