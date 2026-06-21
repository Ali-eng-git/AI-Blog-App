import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import Login from "../../../components/Auth/Login";
import SignUp from "../../../components/Auth/SignUp";

const AdminLogin = () => {
  const [currentPage, setCurrentPage] = useState("login");
  return (
    <>
      <div className="bg-white py-5 border-b border-gray-50">
        <div className="container mx-auto">
          <h3 className="text-lg pl-3">Apalo's Blog</h3>
        </div>
      </div>

      <div className="min-h-[calc(100vh-67px)] flex items-center justify-center">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/60">
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
