import React from "react";

type Props = {};

const EditProject = ({ handleEdit }) => {
  return (
    <div className=" fadeInUp fixed inset-0 flex items-center justify-center rounded-md bg-white shadow-one dark:bg-dark ">
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <button className="btn" onClick={handleEdit}>
          close
        </button>
      </div>
    </div>
  );
};

export default EditProject;
