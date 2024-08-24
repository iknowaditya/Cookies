import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider"; // Assuming you have an AuthContext
import logo1 from "../assets/logo.svg";

const Header = () => {
  const { auth } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center py-6 px-8 bg-gray-100">
      <div className="w-32">
        <img src={logo1} alt="Logo" />
      </div>
      <h1>Welcome, {auth.user ? auth.user.name : "Guest"}</h1>
    </header>
  );
};

export default Header;
