import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from "../redux/user/userSlice";

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
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      // const res = await fetch("/api/auth/sign-in", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // const data = await res.json();
      // if (data.success === false) {
      //   dispatch(signUpFailure(data.message));
      //   return;
      // }
      // dispatch(signUpSuccess(data));
      navigate("/dashboard");
      console.log(formData);
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded"
            id="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Surname</label>
          <input
            type="text"
            placeholder="Surname"
            className="w-full p-2 border border-gray-300 rounded"
            id="surname"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="email"
            className="w-full p-2 border border-gray-300 rounded"
            id="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="password"
            className="w-full p-2 border border-gray-300 rounded"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="password"
            className="w-full p-2 border border-gray-300 rounded"
            id="confirmpassword"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
