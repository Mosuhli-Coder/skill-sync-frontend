import React, { useState } from "react";

import UserDetailModal from "../components/UserDetailModal";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;
export default function SkillManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      navigate("/skill-management");
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <section className="py-10 my-auto dark:bg-gray-900">
          <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
            {/* <Sidebar/> */}
            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                Skills
              </h1>
              <h2 className="text-grey text-sm mb-4 dark:text-gray-400">
                Update Your Skills
              </h2>
              <form onSubmit={handleSubmitSkills}>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 lg:mt-6">
                    <label
                      htmlFor="skillsToLearn"
                      className="block text-sm font-medium dark:text-gray-300"
                    >
                      Skills to Learn
                    </label>
                    <select
                      id="skillsToLearn"
                      value={""}
                      onChange={(e) => handleSkillChange(e, "learn")}
                      className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
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
                </div>
                {skillsToTeach.map((skill, index) => (
                  <div key={index} className="space-y-4 border-t pt-4 mt-4">
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                      <div className="w-full mb-4 lg:mt-6">
                        <label
                          htmlFor={`skillsToTeach-${index}`}
                          className="block text-sm font-medium dark:text-gray-300"
                        >
                          Skills to Teach
                        </label>
                        <select
                          id={`skillsToTeach-${index}`}
                          data-index={index}
                          value={skill.name}
                          onChange={(e) => handleSkillChange(e, "teach")}
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        >
                          <option value="" disabled>
                            Select a skill to Teach
                          </option>
                          {skills.map((skill) => (
                            <option key={skill} value={skill}>
                              {skill}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full mb-4 lg:mt-6">
                        <label
                          htmlFor="yearsOfExperience"
                          className="block text-sm font-medium dark:text-gray-300"
                        >
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          id="yearsOfExperience"
                          value={skill.yearsOfExperience}
                          onChange={(e) => handleSkillDetailsChange(e, index)}
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                      <div className="w-full mb-4 lg:mt-6">
                        <label
                          htmlFor="level"
                          className="block text-sm font-medium dark:text-gray-300"
                        >
                          Level
                        </label>
                        <input
                          type="text"
                          id="level"
                          value={skill.level}
                          onChange={(e) => handleSkillDetailsChange(e, index)}
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          required
                        />
                      </div>
                      <div className="w-full mb-4 lg:mt-6">
                        <label
                          htmlFor="certifications"
                          className="block text-sm font-medium dark:text-gray-300"
                        >
                          Certifications (comma separated)
                        </label>
                        <input
                          type="text"
                          id="certifications"
                          value={skill.certifications}
                          onChange={(e) => handleSkillDetailsChange(e, index)}
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        />
                      </div>
                    </div>
                    <div className="w-full mb-4 lg:mt-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium dark:text-gray-300"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={skill.description}
                        onChange={(e) => handleSkillDetailsChange(e, index)}
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                        required
                      />
                    </div>
                    <div className="w-full mb-4 lg:mt-6">
                      <label
                        htmlFor="tools"
                        className="block text-sm font-medium dark:text-gray-300"
                      >
                        Tools (comma separated)
                      </label>
                      <input
                        type="text"
                        id="tools"
                        value={skill.tools}
                        onChange={(e) => handleSkillDetailsChange(e, index)}
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                    <div className="w-full mb-4 lg:mt-6">
                      <label
                        htmlFor="projects"
                        className="block text-sm font-medium dark:text-gray-300"
                      >
                        Projects (comma separated)
                      </label>
                      <input
                        type="text"
                        id="projects"
                        value={skill.projects}
                        onChange={(e) => handleSkillDetailsChange(e, index)}
                        className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAnotherSkill}
                  className="w-full p-2 bg-gray-500 text-white rounded-lg mt-4"
                >
                  Add Another Skill
                </button>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded-lg mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
