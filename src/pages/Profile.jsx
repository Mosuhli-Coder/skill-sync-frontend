import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import UserDetailModal from "../components/UserDetailModal";
import Sidebar from "../components/Sidebar";

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
    // <div className="min-h-screen flex items-center justify-center">
    // <div className="min-h-screen bg-gray-100 flex">
    //   <Sidebar />
    //   <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
    //     <h1 className="text-2xl font-bold mb-4">Skills Form</h1>
    //     <form onSubmit={handleSubmitSkills} className="space-y-4">
    //       <div>
    //         <label
    //           htmlFor="skillsToLearn"
    //           className="block text-sm font-medium text-gray-700"
    //         >
    //           Skills to Learn
    //         </label>
    //         <select
    //           id="skillsToLearn"
    //           value={""}
    //           onChange={(e) => handleSkillChange(e, "learn")}
    //           className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //         >
    //           <option value="" disabled>
    //             Select a skill to Learn
    //           </option>
    //           {skills.map((skill) => (
    //             <option key={skill} value={skill}>
    //               {skill}
    //             </option>
    //           ))}
    //         </select>
    //         <div className="mt-2">{skillsToLearn.join(", ")}</div>
    //       </div>
    //       {skillsToTeach.map((skill, index) => (
    //         <div key={index} className="space-y-4 border-t pt-4 mt-4">
    //           <div>
    //             <label
    //               htmlFor={`skillsToTeach-${index}`}
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Skills to Teach
    //             </label>
    //             <select
    //               id={`skillsToTeach-${index}`}
    //               data-index={index}
    //               value={skill.name}
    //               onChange={(e) => handleSkillChange(e, "teach")}
    //               className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //             >
    //               <option value="" disabled>
    //                 Select a skill to teach
    //               </option>
    //               {skills.map((skill) => (
    //                 <option key={skill} value={skill}>
    //                   {skill}
    //                 </option>
    //               ))}
    //             </select>
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="yearsOfExperience"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Years of Experience
    //             </label>
    //             <input
    //               type="number"
    //               id="yearsOfExperience"
    //               value={skill.yearsOfExperience}
    //               onChange={(e) => handleSkillDetailsChange(e, index)}
    //               className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="level"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Level
    //             </label>
    //             <input
    //               type="text"
    //               id="level"
    //               value={skill.level}
    //               onChange={(e) => handleSkillDetailsChange(e, index)}
    //               className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="certifications"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Certifications (comma separated)
    //             </label>
    //             <input
    //               type="text"
    //               id="certifications"
    //               value={skill.certifications}
    //               onChange={(e) => handleSkillDetailsChange(e, index)}
    //               className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="description"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Description
    //             </label>
    //             <textarea
    //               id="description"
    //               value={skill.description}
    //               onChange={(e) => handleSkillDetailsChange(e, index)}
    //               className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="tools"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Tools (comma separated)
    //             </label>
    //             <input
    //               type="text"
    //               id="tools"
    //               value={skill.tools}
    //               onChange={(e) => handleSkillDetailsChange(e, index)}
    //               className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //             />
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="projects"
    //               className="block text-sm font-medium text-gray-700"
    //             >
    //               Projects (comma separated)
    //             </label>
    //             <input
    //               type="text"
    //               id="projects"
    //               value={skill.projects}
    //               onChange={(e) => handleSkillDetailsChange(e, index)}
    //               className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //             />
    //           </div>
    //         </div>
    //       ))}
    //       <button
    //         type="button"
    //         onClick={addAnotherSkill}
    //         className="w-full p-2 bg-gray-500 text-white rounded"
    //       >
    //         Add Another Skill
    //       </button>
    //       <button
    //         type="submit"
    //         className="w-full p-2 bg-blue-500 text-white rounded"
    //       >
    //         Submit
    //       </button>
    //     </form>
    //   </div>
    //   <div className=" min-h-screen bg-white p-10 items-center rounded shadow-md w-full max-w-md mt-8">
    //     <div className="flex flex-col items-center">
    //       <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
    //         <img
    //           src={currentUserData.avatar || "/path/to/default/profile-pic.png"}
    //           alt={`${currentUserData.firstName}'s profile`}
    //           className="w-full h-full object-cover"
    //         />
    //       </div>
    //       <h1 className="text-2xl font-bold mb-2">
    //         {currentUserData.firstName} {currentUserData.lastName}
    //       </h1>
    //       <p className="text-sm text-gray-600 mb-4">{currentUserData.email}</p>
    //       <button
    //         onClick={openModal}
    //         className="p-2 bg-blue-500 text-white rounded"
    //       >
    //         Update Profile
    //       </button>
    //     </div>

    //     {isModalOpen && (
    //       <UserDetailModal
    //         currentUserData={currentUserData}
    //         handleProfileChange={handleProfileChange}
    //         handleUpdateProfile={handleUpdateProfile}
    //         error={error}
    //         loading={loading}
    //         onClose={closeModal}
    //       />
    //     )}
    //   </div>
    // </div>
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="bg-white overflow-hidden shadow rounded-lg border">
    //     <div className="px-4 py-5 sm:px-6">
    //       <h3 className="text-lg leading-6 font-mediumtext-gray-900">
    //         User Profile
    //       </h3>
    //       <p className="mt-1 max-w-2x1 text-sm text-gray-500">
    //         This is some information about the user.
    //       </p>
    //     </div>
    //     <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
    //       {/* <button
    //       onClick={onClose}
    //       className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
    //     >
    //       <svg
    //         className="w-6 h-6"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="2"
    //           d="M6 18L18 6M6 6l12 12"
    //         />
    //       </svg>
    //     </button> */}
    //     <dl className="sm:divide-y sm:divide-gray-200">
    //       {error && <p className="text-red-500">{error}</p>}
    //       <form onSubmit={handleUpdateProfile} className="space-y-4">
    //         <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    //           <dt className="text-sm font-medium text-gray-500">
    //             Email
    //           </dt>
    //           <input
    //             type="email"
    //             value={currentUserData.email}
    //             id="email"
    //             onChange={handleProfileChange}
    //             className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
    //             required
    //             disabled
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">
    //             First Name
    //           </label>
    //           <input
    //             type="text"
    //             value={currentUserData.firstName}
    //             id="firstName"
    //             onChange={handleProfileChange}
    //             className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">
    //             Surname
    //           </label>
    //           <input
    //             type="text"
    //             value={currentUserData.lastName}
    //             id="lastName"
    //             onChange={handleProfileChange}
    //             className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //             required
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             id="password"
    //             onChange={handleProfileChange}
    //             className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">
    //             Confirm Password
    //           </label>
    //           <input
    //             type="password"
    //             id="confirmPassword"
    //             onChange={handleProfileChange}
    //             className="mt-1 block w-full p-2 border border-gray-300 rounded"
    //           />
    //         </div>

    //         <button
    //           type="submit"
    //           className="w-full p-2 bg-blue-500 text-white rounded"
    //         >
    //           {loading ? "Updating..." : "Update"}
    //         </button>
    //       </form>
    //       </dl>
    //     </div>
    //   </div>
    // </div>
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div>
            <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
              Profile
            </h1>
            <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
              Update Profile
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleUpdateProfile}>
              <div
                className="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')",
                }}
              >
                <div
                  className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')",
                  }}
                >
                  <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                    <input
                      type="file"
                      name="profile"
                      id="upload_profile"
                      hidden
                      required
                    />
                    <label htmlFor="upload_profile">
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <input
                    type="file"
                    name="profile"
                    id="upload_cover"
                    hidden
                    required
                  />
                  <div className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                    <label
                      htmlFor="upload_cover"
                      className="inline-flex items-center gap-1 cursor-pointer"
                    >
                      Cover
                      <svg
                        data-slot="icon"
                        className="w-6 h-5 text-blue-700"
                        fill="none"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
              <h2 className="text-center mt-1 font-semibold dark:text-gray-300">
                Upload Profile and Cover Image
              </h2>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 lg:mt-6">
                  <label htmlFor="" className="dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={currentUserData.email}
                    id="email"
                    onChange={handleProfileChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Last Name"
                    required
                    disabled
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label htmlFor="" className="mb-2 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={currentUserData.firstName}
                    id="firstName"
                    onChange={handleProfileChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-full mb-4 lg:mt-6">
                  <label htmlFor="" className="dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={currentUserData.lastName}
                    id="lastName"
                    onChange={handleProfileChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                  <select className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                    <option disabled value="">
                      Select Sex
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                  <input
                    type="date"
                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                <div className="w-full mb-4 mt-6">
                  <label htmlFor="" className="mb-2 dark:text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={handleProfileChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Password"
                  />
                </div>
                <div className="w-full mb-4 lg:mt-6">
                  <label htmlFor="" className="dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    onChange={handleProfileChange}
                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
