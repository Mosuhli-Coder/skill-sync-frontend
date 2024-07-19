import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;

const skills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "Java",
  "C++",
  "Ruby",
  "SQL",
];

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({});
  const [currentUserData, setCurrentUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // other fields...
  });
  const { loading, error } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.user);

  const [selectedSkillsToTeach, setSelectedSkillsToTeach] = useState([]);
  const [selectedSkillsToLearn, setSelectedSkillsToLearn] = useState([]);

  // Simulate fetching user data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/user/user-info/${currentUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials
          }
        );

        const data = await res.json();
        const fetchedUser = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        };
        setCurrentUserData(fetchedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [baseUrl, currentUserData._id]);
  const handleSkillChange = (event, type) => {
    const value = event.target.value;
    if (type === "teach") {
      setSelectedSkillsToTeach((prev) =>
        prev.includes(value)
          ? prev.filter((skill) => skill !== value)
          : [...prev, value]
      );
    } else {
      setSelectedSkillsToLearn((prev) =>
        prev.includes(value)
          ? prev.filter((skill) => skill !== value)
          : [...prev, value]
      );
    }
  };

  const handleSubmitSkills = (event) => {
    event.preventDefault();
    // Process the selected skills, e.g., send to an API
    console.log("Skills to Teach:", selectedSkillsToTeach);
    console.log("Skills to Learn:", selectedSkillsToLearn);
  };

  // const handleProfileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.id]: e.target.value,
  //   });
  // };
  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setCurrentUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // Handle the form submission for updating profile
    try {
      dispatch(signUpStart());
      console.log(currentUserData);
      const res = await fetch(`${baseUrl}/api/user/update/${currentUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials
        body: JSON.stringify(currentUserData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        return;
      }
      dispatch(signUpSuccess(data));
      navigate("/profile");
      console.log(data);
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Skills Form</h1>
        <form onSubmit={handleSubmitSkills} className="space-y-4">
          <div>
            <label
              htmlFor="skillsToTeach"
              className="block text-sm font-medium text-gray-700"
            >
              Skills to Teach
            </label>
            <select
              id="skillsToTeach"
              // multiple
              value={selectedSkillsToTeach}
              onChange={(e) => handleSkillChange(e, "teach")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select a skill to teach
              </option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <div className="mt-2">{selectedSkillsToTeach.join(", ")}</div>
          </div>

          <div>
            <label
              htmlFor="skillsToLearn"
              className="block text-sm font-medium text-gray-700"
            >
              Skills to Learn
            </label>
            <select
              id="skillsToLearn"
              // multiple
              value={selectedSkillsToLearn}
              onChange={(e) => handleSkillChange(e, "learn")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Select a skill to Learn
              </option>
              {skills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <div className="mt-2">{selectedSkillsToLearn.join(", ")}</div>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mt-8">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={currentUserData.email}
              id="email"
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={currentUserData.firstName}
              id="firstName"
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Surname
            </label>
            <input
              type="text"
              value={currentUserData.lastName}
              id="lastName"
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={handleProfileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
