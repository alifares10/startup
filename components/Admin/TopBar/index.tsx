"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Props = {};

const TopBar = (props: Props) => {
  const { data: session } = useSession();
  const [toggleProfDropDown, setToggleProfDropDown] = useState(false);
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <>
      <header
        className={` top-0  z-40 flex  w-full items-center border bg-transparent ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="flex w-full items-center justify-end px-4">
              {session?.user ? (
                <div className="flex items-center justify-end space-x-2 pr-16 ">
                  <div
                    className="flex cursor-pointer space-x-1 rounded-full bg-gray  hover:outline hover:transition-all hover:ease-in-out dark:bg-gray/25"
                    onClick={() => setToggleProfDropDown((prev) => !prev)}
                    // onClick={GetUserInfo}
                  >
                    <Image
                      src={session?.user.image}
                      alt="logo"
                      width={32}
                      height={32}
                      className="float-left flex  rounded-full shadow-lg transition-all  "
                    />
                    <div className=" font-nunito hidden pt-1 pr-2 font-bold text-white  dark:text-white md:flex ">
                      {session.user.name}
                    </div>
                  </div>

                  <div
                    className={`divide-gray-100 dark:bg-gray-700 dark:divide-gray-600 absolute top-full right-0 z-30 flex w-[250px] flex-col
                                     divide-y-2  rounded border-[.5px] border-body-color/50 bg-white  py-4 px-6 opacity-95 transition-[top]
                                     duration-300 dark:border-body-color/20 dark:bg-dark ${
                                       toggleProfDropDown ? "flex" : "hidden"
                                     } `}
                    onMouseLeave={() => setToggleProfDropDown((prev) => !prev)}
                  >
                    <div className=" block items-center justify-center space-y-2 px-0 py-3 text-sm text-gray dark:text-white">
                      <div className="flex space-x-1 truncate font-medium">
                        {session.user.name}
                      </div>
                      <div className="flex truncate font-medium">
                        {session.user.email}
                      </div>
                    </div>
                    <div className="block py-5">
                      <Link
                        href={"/profile"}
                        className="text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 block text-sm hover:opacity-70 dark:text-white dark:hover:text-white"
                      >
                        View Profile
                      </Link>
                    </div>
                    <div className="block py-5">
                      <Link
                        href={"/admin"}
                        className="text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 block text-sm hover:opacity-70 dark:text-white dark:hover:text-white"
                      >
                        Admin Panel
                      </Link>
                    </div>
                    <div className="block  py-5">
                      <button
                        className=" font-inter ml-0 mt-2 flex w-full justify-center rounded-full border border-black 
                                   bg-black py-1.5 px-3 text-sm text-white transition-all hover:bg-white hover:text-black"
                        type="button"
                        // onClick={() => {
                        //   setToggleProfDropDown(false);
                        //   signOut({ callbackUrl: "/" });
                        // }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end pr-16 lg:pr-0">
                  <Link
                    href="/signin"
                    className="ease-in-up  rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90
                hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default TopBar;
