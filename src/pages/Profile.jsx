import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import UserDetailModal from "../components/UserDetailModal";

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

  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [skillsToTeach, setSkillsToTeach] = useState([
    {
      name: "",
      yearsOfExperience: "",
      level: "",
      certifications: "",
      description: "",
      tools: "",
      projects: "",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          avatar: data.avatar,
        };
        setCurrentUserData(fetchedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [currentUserData._id]);

  const handleSkillChange = (e, type) => {
    if (type === "learn") {
      setSkillsToLearn([...skillsToLearn, e.target.value]);
    } else {
      const index = parseInt(e.target.dataset.index);
      const updatedSkillsToTeach = [...skillsToTeach];
      updatedSkillsToTeach[index].name = e.target.value;
      setSkillsToTeach(updatedSkillsToTeach);
    }
  };

  const handleSkillDetailsChange = (e, index) => {
    const { id, value } = e.target;
    const updatedSkillsToTeach = [...skillsToTeach];
    updatedSkillsToTeach[index][id] = value;
    setSkillsToTeach(updatedSkillsToTeach);
  };
  const addAnotherSkill = () => {
    setSkillsToTeach([
      ...skillsToTeach,
      {
        name: "",
        yearsOfExperience: "",
        level: "",
        certifications: "",
        description: "",
        tools: "",
        projects: "",
      },
    ]);
  };
  const handleSubmitSkills = async (event) => {
    event.preventDefault();
    // Process the selected skills, e.g., send to an API
    const formattedSkillsToTeach = skillsToTeach.map((skill) => ({
      ...skill,
      certifications: skill.certifications
        .split(",")
        .map((cert) => cert.trim()),
      tools: skill.tools.split(",").map((tool) => tool.trim()),
      projects: skill.projects.split(",").map((project) => project.trim()),
    }));

    try {
      const res = await fetch(
        `${baseUrl}/api/skills/create/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            skillsToTeach: formattedSkillsToTeach,
            skillsToLearn: skillsToLearn,
          }),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        console.error(data.message);
        return;
      }
      console.log("Skills updated:", data);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };

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
      dispatch(updateUserStart());
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
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      navigate("/profile");
      console.log(data);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Skills Form</h1>
        <form onSubmit={handleSubmitSkills} className="space-y-4">
          <div>
            <label
              htmlFor="skillsToLearn"
              className="block text-sm font-medium text-gray-700"
            >
              Skills to Learn
            </label>
            <select
              id="skillsToLearn"
              value={""}
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
            <div className="mt-2">{skillsToLearn.join(", ")}</div>
          </div>
          {skillsToTeach.map((skill, index) => (
            <div key={index} className="space-y-4 border-t pt-4 mt-4">
              <div>
                <label
                  htmlFor={`skillsToTeach-${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills to Teach
                </label>
                <select
                  id={`skillsToTeach-${index}`}
                  data-index={index}
                  value={skill.name}
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
              </div>
              <div>
                <label
                  htmlFor="yearsOfExperience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  value={skill.yearsOfExperience}
                  onChange={(e) => handleSkillDetailsChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700"
                >
                  Level
                </label>
                <input
                  type="text"
                  id="level"
                  value={skill.level}
                  onChange={(e) => handleSkillDetailsChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="certifications"
                  className="block text-sm font-medium text-gray-700"
                >
                  Certifications (comma separated)
                </label>
                <input
                  type="text"
                  id="certifications"
                  value={skill.certifications}
                  onChange={(e) => handleSkillDetailsChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={skill.description}
                  onChange={(e) => handleSkillDetailsChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="tools"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tools (comma separated)
                </label>
                <input
                  type="text"
                  id="tools"
                  value={skill.tools}
                  onChange={(e) => handleSkillDetailsChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="projects"
                  className="block text-sm font-medium text-gray-700"
                >
                  Projects (comma separated)
                </label>
                <input
                  type="text"
                  id="projects"
                  value={skill.projects}
                  onChange={(e) => handleSkillDetailsChange(e, index)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addAnotherSkill}
            className="w-full p-2 bg-gray-500 text-white rounded"
          >
            Add Another Skill
          </button>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-white p-10 rounded shadow-md w-full max-w-md mt-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
            <img
              src={currentUserData.avatar || "/path/to/default/profile-pic.png"}
              alt={`${currentUserData.firstName}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {currentUserData.firstName} {currentUserData.lastName}
          </h1>
          <p className="text-sm text-gray-600 mb-4">{currentUserData.email}</p>
          <button
            onClick={openModal}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Update Profile
          </button>
        </div>

        {isModalOpen && (
          <UserDetailModal
            currentUserData={currentUserData}
            handleProfileChange={handleProfileChange}
            handleUpdateProfile={handleUpdateProfile}
            error={error}
            loading={loading}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}
