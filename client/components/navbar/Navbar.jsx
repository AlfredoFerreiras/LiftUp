import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { logout } from "../../store";
import styles from "./Navbar.css"; // Adjust the import path to match your logout action creator

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    setIsOpen(false); // Close the mobile menu upon logging out
  };

  return (
    <nav
      className={`navbar  flex items-center justify-between shadow-md relative`}>
      <Link to="/" className={` text-xl font-semibold`}>
        Lift You Up
      </Link>
      <div
        className={`absolute top-full left-0 w-full lg:static lg:w-auto bg-white lg:bg-transparent lg:flex lg:items-center z-20 ${
          isOpen ? "block" : "hidden"
        }
        }`}>
        <div className="flex flex-col lg:flex-row items-center lg:gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/home"
                className={`block px-4 py-2 text-gray-700 hover:text-blue-600`}
                onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link
                to="/About"
                className={` block px-4 py-2 text-gray-700 hover:text-blue-600`}
                onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link
                to="/profile"
                className={` block px-4 py-2 text-gray-700 hover:text-blue-600`}
                onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className={` px-4 py-2 text-left text-gray-700 hover:text-blue-600 lg:mt-0`}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={` block px-4 py-2 text-gray-700 hover:text-blue-600`}
                onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link
                to="/signup"
                className={` block px-4 py-2 text-gray-700 hover:text-blue-600`}
                onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-gray-700 lg:hidden">
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
    </nav>
  );
};

export default Navbar;
