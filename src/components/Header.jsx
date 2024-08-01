import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { MdForwardToInbox } from "react-icons/md";

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
    // <header className="bg-white shadow elative z-10">
    //   <div className="container mx-auto px-6 py-4">
    //     <div className="flex justify-between items-center">
    //       <Link to={currentUser ? "/dashboard" : "/"}>
    //         <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
    //           <span className="text-slate-500">SkillSync</span>
    //           {currentUser && <span className="text-slate-700">Africa</span>}
    //         </h1>
    //       </Link>

    //       {currentUser && (
    //         <p className="text-2xl">
    //           Welcome, {currentUser.firstName} {currentUser.lastName}
    //         </p>
    //       )}

    //       <nav className="flex items-center">
    //         <Link to={currentUser ? "/dashboard" : "/"}>
    //           <span className="text-gray-800 mx-4">
    //             {currentUser ? "Dashboard" : "Home"}
    //           </span>
    //         </Link>

    //         <Link to="/about">
    //           <span className="text-gray-800 mx-4">About</span>
    //         </Link>
    //         <Link to="/contact">
    //           <span className="text-gray-800 mx-4">Contact</span>
    //         </Link>

    //         {currentUser && (
    //           <div className="relative flex items-center" ref={settingsRef}>
    //             {currentUser && <Notifications currentUser={currentUser} />}
    //             <MdForwardToInbox className="text-gray-800 mx-4 cursor-pointer" />
    //             <img
    //               className="rounded-full h-7 w-7 object-cover cursor-pointer"
    //               src={currentUser.avatar}
    //               alt="profile"
    //               onClick={toggleSettings}
    //             />

    //             {settingsOpen && (
    //               <div
    //                 className="
    //               absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50
    //               "
    //               >
    //                 <Link
    //                   to="/profile"
    //                   className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    //                 >
    //                   Profile
    //                 </Link>
    //                 <Link
    //                   to="/settings"
    //                   className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
    //                 >
    //                   Settings
    //                 </Link>
    //                 <button
    //                   onClick={handleSignOut}
    //                   className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
    //                 >
    //                   Logout
    //                 </button>
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </nav>

    //       {!currentUser && (
    //         <div>
    //           <Link to="/sign-up">
    //             <button className="bg-blue-500 text-white px-4 py-2 rounded">
    //               Sign Up
    //             </button>
    //           </Link>
    //           <Link to="/sign-in">
    //             <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
    //               Log In
    //             </button>
    //           </Link>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </header>
    <header
      id="main-header"
      className="bg-white  fixed w-full top-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Logo"
              className="w-10 h-10 mr-2 rounded"
            />
            <Link to={currentUser ? "/dashboard" : "/"}>
              <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                <span className="text-slate-500">SkillSync</span>
                <span className="text-slate-700">Africa</span>
              </h1>
            </Link>
            {currentUser && (
              <p className="text-2xl">
                Welcome, {currentUser.firstName} {currentUser.lastName}
              </p>
            )}
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
              <li>
                {/* <a
                  href="#"
                  className="block py-2 md:py-0 hover:text-gray-300 transition duration-200"
                >
                  Home
                </a> */}
                <Link to={currentUser ? "/dashboard" : "/"}>
                  <span className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                    {currentUser ? "Dashboard" : "Home"}
                  </span>
                </Link>
              </li>
              {/* <li className="relative group">
                <a
                  href="#"
                  className="block py-2 md:py-0 hover:text-gray-300 transition duration-200 flex items-center justify-between"
                >
                  Products
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </a>
                <ul className="hidden group-hover:block mt-2 space-y-2 bg-gray-700 md:bg-white text-white md:text-gray-800 rounded shadow-lg md:absolute md:left-0 w-full md:w-48">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200"
                    >
                      Electronics
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200"
                    >
                      Clothing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200"
                    >
                      Home & Garden
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-600 md:hover:bg-gray-100 transition duration-200"
                    >
                      Sports & Outdoors
                    </a>
                  </li>
                </ul>
              </li> */}
              <li>
                {/* <a
                  href="#"
                  className="block py-2 md:py-0 hover:text-gray-300 transition duration-200"
                >
                  About
                </a> */}
                <Link to="/about">
                  <span className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                    About
                  </span>
                </Link>
              </li>
              <li>
                {/* <a
                  href="#"
                  className="block py-2 md:py-0 hover:text-gray-300 transition duration-200"
                >
                  Contact
                </a> */}
                <Link to="/contact">
                  <span className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                    Contact
                  </span>
                </Link>
              </li>
              {currentUser && (
                <div className="relative flex items-center" ref={settingsRef}>
                  <li className="block py-2 md:py-0 hover:text-gray-300 transition duration-200">
                    <MdForwardToInbox className="text-gray-800 mx-4 cursor-pointer" />
                  </li>

                  <li>
                    <img
                      className="rounded-full h-7 w-7 object-cover cursor-pointer"
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
  );
}
