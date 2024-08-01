import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/user/userSlice";

const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      console.log(formData);
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include credentials
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        return;
      }
      dispatch(signUpSuccess(data));
      navigate("/dashboard");
      console.log(data);
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };
  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white p-6 rounded shadow-md w-full max-w-md"
    //   >
    //     <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
    //     {error && <p className="text-red-500">{error}</p>}
    //     <div className="mb-4">
    //       <label className="block mb-1">First Name</label>
    //       <input
    //         type="text"
    //         placeholder="Name"
    //         className="w-full p-2 border border-gray-300 rounded"
    //         id="firstName"
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-1">Surname</label>
    //       <input
    //         type="text"
    //         placeholder="Surname"
    //         className="w-full p-2 border border-gray-300 rounded"
    //         id="lastName"
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-1">Email</label>
    //       <input
    //         type="email"
    //         placeholder="email"
    //         className="w-full p-2 border border-gray-300 rounded"
    //         id="email"
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-1">Password</label>
    //       <input
    //         type="password"
    //         placeholder="password"
    //         className="w-full p-2 border border-gray-300 rounded"
    //         id="password"
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block mb-1">Confirm Password</label>
    //       <input
    //         type="password"
    //         placeholder="password"
    //         className="w-full p-2 border border-gray-300 rounded"
    //         id="confirmPassword"
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full p-2 bg-blue-500 text-white rounded"
    //     >
    //       {loading ? "Signing Up..." : "Sign Up"}
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Already have an account?
          <Link to="/sign-in">
            <p className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </p>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your first name here"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Surname here"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm your password"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center"></div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Loading..." : "Sign Un"}
              </button>
            </div>
          </form>
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-100 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                    alt=""
                  />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                    alt=""
                  />
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/506498/google.svg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
