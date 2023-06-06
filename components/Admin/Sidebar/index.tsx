"use client";

import React, { useEffect, useState } from "react";
import { sbListBottom, sbListTop } from "./sbList";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {};

const Sidebar = (props: Props) => {
  const listTop = sbListTop;
  const listBottom = sbListBottom;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data: session } = useSession();
  const handlClose = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {sidebarOpen ? (
        <aside className=" sticky left-0 z-40 flex h-screen w-64 flex-col rounded-md border-r-2">
          <div className="container flex flex-col">
            <ul className="flex flex-col divide-y-2">
              <Link href="/admin" className=" flex w-full pt-5 pb-5">
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full"
                />
              </Link>
              <li className="flex-col space-y-8 pt-10 pb-20">
                {listTop.map((item, index) => (
                  <Link key={index} href={item.href} className="flex space-x-3">
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      {...props}
                      className="transition-all  duration-300 ease-in-out hover:fill-gray"
                    >
                      <path d={item.iconPath} />
                    </svg>
                    <span className="inline-block font-bold transition-all duration-300 ease-in-out hover:text-gray">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </li>
              <li className="flex-col space-y-8 pt-20  ">
                {listBottom.map((item, index) => (
                  <Link key={index} href={item.href} className="flex space-x-3">
                    {item.name === "Profile" ? (
                      <div className="flex divide-x-2">
                        <Image
                          src={session?.user.image}
                          alt=""
                          width={24}
                          height={24}
                          className="rounded-full transition-all  duration-300 ease-in-out hover:border hover:border-gray "
                        />
                      </div>
                    ) : (
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        {...props}
                        className="transition-all duration-300 ease-in-out hover:fill-gray"
                      >
                        <path d={item.iconPath} />
                      </svg>
                    )}

                    <span className="inline-block font-bold transition-all duration-300 ease-in-out hover:text-gray">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </li>
            </ul>
          </div>
        </aside>
      ) : (
        <aside className=" sticky left-0 z-40 flex h-screen  flex-col rounded-md border-r-2">
          <div className="container flex flex-col">
            <ul className="flex flex-col divide-y-2">
              <li className="flex-col space-y-8 pt-20 pb-20">
                {listTop.map((item, index) => (
                  <Link key={index} href={item.href} className="flex space-x-3">
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      {...props}
                      className="transition-all  duration-300 ease-in-out hover:fill-gray"
                    >
                      <path d={item.iconPath} />
                    </svg>
                  </Link>
                ))}
              </li>
              <li className="flex-col space-y-8 pt-20  ">
                {listBottom.map((item, index) => (
                  <Link key={index} href={item.href} className="flex space-x-3">
                    {item.name === "Profile" ? (
                      <Image
                        src={session?.user.image}
                        alt=""
                        width={18}
                        height={18}
                        className="rounded-full transition-all  duration-300 ease-in-out hover:border hover:border-gray"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        {...props}
                        className="transition-all  duration-300 ease-in-out hover:fill-gray"
                      >
                        <path d={item.iconPath} />
                      </svg>
                    )}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
