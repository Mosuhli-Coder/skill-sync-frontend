import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { MdForwardToInbox } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";

const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
    <div className="relative overflow-hidden bg-white pb-32">
      <header
        id="main-header"
        className="bg-transparent relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
            <div className="flex items-center px-2 lg:px-0">
              <div className="flex flex-shrink-0">
              <img
                src="/logo-color.png"
                alt="Logo"
                className="w-10 h-10 mr-2 rounded"
              />
              <Link to={currentUser ? "/dashboard" : "/"}>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                  <span className="text-slate-500">SkillSync</span>
                  <span className="text-slate-700">Africa</span>
                </h1>
              </Link>
              </div>
              <div className="hidden lg:ml-6 lg:block lg:space-x-4">
                <div className="flex">
                  <Link to={currentUser ? "/dashboard" : "/"}>
                    <p className="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white">
                      {currentUser ? "Dashboard" : "Home"}
                    </p>
                  </Link>

                  {/* <a href="#" className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">Applicants</a>

                  <a href="#" className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">Company</a> */}

                </div>
              </div>
            </div>
            
            <button
              id="menu-toggle"
              className="md:hidden focus:outline-none z-50"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <svg
                  id="close-icon"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  id="menu-icon"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              )}
            </button>
            <nav
              id="main-nav"
              className={`fixed inset-y-0 right-0 transform ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } md:relative md:translate-x-0 bg-white md:bg-transparent w-64 md:w-auto h-full md:h-auto overflow-y-auto md:overflow-visible transition-transform duration-300 ease-in-out md:transition-none`}
            >
              <ul className="pt-16 md:pt-0 px-4 md:px-0 md:flex space-y-2 md:space-y-0 md:space-x-4">
                
                
                {currentUser && (
                  <div className="relative flex items-center" ref={settingsRef}>
                    <li className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                      <IoNotificationsOutline className="text-gray-800 mx-4 cursor-pointer h-6 w-6" />
                    </li>

                    <li>
                      <img
                        className="rounded-full h-10 w-10 object-cover cursor-pointer"
                        src={currentUser.avatar}
                        alt="profile"
                        onClick={toggleSettings}
                      />
                      
                    </li>

                    {settingsOpen && (
                      <div
                        className="
                                  absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50
                                  "
                      >
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Settings
                          </Link>
                        </li>

                        <li>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </div>
                    )}
                  </div>
                )}

                {!currentUser && (
                  <div>
                    <li>
                  <Link to="/about">
                    <span className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  
                  <Link to="/contact">
                    <span className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                      Contact
                    </span>
                  </Link>
                </li>
                    <li>
                      <Link to="/sign-in">
                        <span className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                          Log In
                        </span>
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
