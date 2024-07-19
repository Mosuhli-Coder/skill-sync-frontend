import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice";

const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
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

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">SkillSync</span>
              <span className="text-slate-700">Africa</span>
            </h1>
          </Link>

          {currentUser ? (
            <p className="text-2xl">
              Welcome, {currentUser.firstName} {currentUser.lastName}
            </p>
          ) : (
            ""
          )}
          <nav>
            {/* <Link to="/">
              <a className="text-gray-800 mx-4">Home</a>
            </Link> */}
            <Link to="/dashboard">
              {currentUser ? (
                <a className="text-gray-800 mx-4">Dashboad</a>
              ) : (
                <a className="text-gray-800 mx-4">Home</a>
              )}
            </Link>

            <Link to="/about">
              <a className="text-gray-800 mx-4">About</a>
            </Link>
            <Link to="/contact">
              <a className="text-gray-800 mx-4">Contact</a>
            </Link>
          </nav>
          <div>
            {currentUser ? (
              <>
                <Link to="/profile">
                  {currentUser ? (
                    <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                      Profile
                    </button>
                  ) : (
                    <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                      Log In
                    </button>
                  )}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
