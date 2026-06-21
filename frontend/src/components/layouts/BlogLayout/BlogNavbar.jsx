import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

import { BLOG_NAVBAR_DATA } from "../../../utils/data";
import { UserContext } from "../../../context/userContent";

import SideMenu from "../SideMenu";
import ProfileInfoCard from "../../Cards/ProfileInfoCard";
import Login from "../../Auth/Login";
import SignUp from "../../Auth/SignUp";
import Modal from "../../Modal";
import AuthModel  from "../../Auth/AuthModel";

const BlogNavbar = ({ activeMenu }) => {
  const { user, openAuthForm, setOpenAuthForm, authPage, setAuthPage } =
  useContext(UserContext);

  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-white sticky top-0 z-50 border-b border-gray-200/60 shadow-sm">
        <div className="container mx-auto flex items-center justify-between gap-5 py-3 px-6">

          {/* LEFT */}
          <div className="flex gap-5 items-center">
            <button
              className="block lg:hidden text-black"
              onClick={() => setOpenSideMenu(!openSideMenu)}
            >
              {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>

            <Link to="/">
              <h3 className="text-lg font-semibold tracking-tight text-gray-800">
                Apalo's Blog
                <span className="text-sky-500">.</span>
              </h3>
            </Link>
          </div>

          {/* CENTER NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {BLOG_NAVBAR_DATA.map((item) => {
              if (item?.onlySideMenu) return null;

              return (
                <Link key={item.id} to={item.path}>
                  <li className="text-[15px] text-black font-medium list-none relative group cursor-pointer">
                    {item.label}

                    <span
                      className={`absolute inset-x-0 bottom-0 h-[2px] bg-sky-500 transition-transform duration-300 origin-left ${
                        activeMenu === item.path
                          ? "scale-x-100"
                          : "scale-x-0"
                      } group-hover:scale-x-100`}
                    />
                  </li>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            <button
              className="p-2 rounded-full hover:bg-sky-50 transition"
            >
              <LuSearch className="text-[22px]" />
            </button>

            {!user ? (
              <button
                className="flex items-center justify-center gap-3 bg-linear-to-r from-sky-500 to-cyan-400 text-xs md:text-sm font-semibold text-white px-4 md:px-6 py-2 rounded-full hover:shadow-lg hover:shadow-sky-200/40 transition"
                onClick={() => setOpenAuthForm(true)}
              >
                Login/SignUp
              </button>
            ) : (
              <div className="hidden md:block">
                <ProfileInfoCard />
              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          {openSideMenu && (
            <div className="absolute left-0 top-full w-full bg-white shadow-md border-t">
              <SideMenu
                activeMenu={activeMenu}
                isBlogMenu
                setOpenSideMenu={setOpenSideMenu}
              />
            </div>
          )}
        </div>
      </div>

      {/* AUTH MODAL (FIXED) */}
      <AuthModel
        openAuthForm={openAuthForm}
        setopenAuthForm={setOpenAuthForm}
        currentPage={authPage}
        setCurrentPage={setAuthPage}
      />
    </>
  );
};

export default BlogNavbar;