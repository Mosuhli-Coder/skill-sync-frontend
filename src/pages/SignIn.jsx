import{ useState } from 'react'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate()
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
      dispatch(signInStart());
      const res = await fetch(`${baseUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/dashboard')
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        {error && <p className="text-red-500">{error}</p>}
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  )
}
