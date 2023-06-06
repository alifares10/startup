"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {};

const Users = (props: Props) => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="container flex h-screen flex-col items-center gap-6 border pb-8 pt-6 md:py-10">
      <div className="mx-auto mt-5 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray shadow shadow-white sm:rounded-lg">
              <table className="divide-gray-200 min-w-full divide-y">
                <thead className="bg-black">
                  <tr>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray bg-white">
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              width={24}
                              height={24}
                              className="h-10 w-10 rounded-full"
                              src={session?.user.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray">{user.email}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className="inline-flex rounded-full bg-red px-2
                                    text-xs font-semibold leading-5 text-white"
                        >
                          {session?.user.email === user.email
                            ? "Active"
                            : "Not Active"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-gray hover:text-dark">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
