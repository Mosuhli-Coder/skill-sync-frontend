import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

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
          <nav>
            <Link to="/">
              <a className="text-gray-800 mx-4">Home</a>
            </Link>

            <Link to="/about">
              <a className="text-gray-800 mx-4">About</a>
            </Link>
            <Link to="/contact">
              <a className="text-gray-800 mx-4">
                Contact
              </a>
            </Link>
          </nav>
          <div>
          {currentUser ? (
              <>
              <p className="text-3xl font-bold">Welcome, {currentUser.lastName}</p>
                <Link to="/profile">
                  <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                    Profile
                  </button>
                </Link>
                <button
                  // onClick={handleLogout}
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
