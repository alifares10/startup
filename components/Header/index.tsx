"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [toggleProfDropDown, setToggleProfDropDown] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

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

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  //Get current user info from db
  useEffect(() => {
    const fetchUserInfo = async () => {
      const res = await fetch("/api/user");
      const user = await res.json();
      setUserInfo(user);
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
          sticky
            ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
            : "absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/logo-2.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full dark:hidden"
                />
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white py-4 px-6 duration-300
                               dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                                 navbarOpen
                                   ? "visibility top-full opacity-100"
                                   : "invisible top-[120%] opacity-0"
                               }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={menuItem.id} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base text-dark group-hover:opacity-70 dark:text-white lg:mr-0 lg:inline-flex lg:py-6 lg:px-0`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {session?.user ? (
                <div className="flex items-center justify-end space-x-2 pr-16 ">
                  <div className="flex ">
                    <ThemeToggler />
                  </div>
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
                                           toggleProfDropDown
                                             ? "flex"
                                             : "hidden"
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
                        onClick={() => {
                          setToggleProfDropDown(false);
                          signOut({ callbackUrl: "/" });
                        }}
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
                  {/* <Link
                    href="/signup"
                    className="ease-in-up hidden rounded-md bg-primary py-3 px-8 text-base font-bold text-white transition duration-300 hover:bg-opacity-90
                                 hover:shadow-signUp md:block md:px-9 lg:px-6 xl:px-9"
                  >
                    Sign Up
                  </Link> */}
                  <div>
                    <ThemeToggler />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
