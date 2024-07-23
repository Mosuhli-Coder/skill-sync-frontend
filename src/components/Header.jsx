import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import { MdForwardToInbox } from "react-icons/md";

const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${baseUrl}/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(signOutUserFailure(error.message));
    }
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };
  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setSettingsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow elative z-10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to={currentUser ? "/dashboard" : "/"}>
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">SkillSync</span>
              {currentUser && <span className="text-slate-700">Africa</span>}
            </h1>
          </Link>

          {currentUser && (
            <p className="text-2xl">
              Welcome, {currentUser.firstName} {currentUser.lastName}
            </p>
          )}

          <nav className="flex items-center">
            <Link to={currentUser ? "/dashboard" : "/"}>
              <span className="text-gray-800 mx-4">
                {currentUser ? "Dashboard" : "Home"}
              </span>
            </Link>

            <Link to="/about">
              <span className="text-gray-800 mx-4">About</span>
            </Link>
            <Link to="/contact">
              <span className="text-gray-800 mx-4">Contact</span>
            </Link>

            {currentUser && (
              <div className="relative flex items-center" ref={settingsRef}>
                <FaBell className="text-gray-800 mx-4 cursor-pointer" />
                <MdForwardToInbox className="text-gray-800 mx-4 cursor-pointer" />
                <img
                  className="rounded-full h-7 w-7 object-cover cursor-pointer"
                  src={currentUser.avatar}
                  alt="profile"
                  onClick={toggleSettings}
                />

                {settingsOpen && (
                  <div
                    className="
                  absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50
                  "
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {!currentUser && (
            <div>
              <Link to="/sign-up">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Sign Up
                </button>
              </Link>
              <Link to="/sign-in">
                <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                  Log In
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
