import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isConnectionsOpen, setIsConnectionsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-4 focus:outline-none"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 bg-white shadow-lg p-6`}
      >
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="mt-6">
        <Link to="/dashboard">
          <span className="block text-gray-700 py-2">
            Dashboard Home
          </span>
          </Link>

          <div>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-full text-left text-gray-700 py-2"
            >
              Profile Management
            </button>
            {isProfileOpen && (
              <div className="pl-4">
                <Link to="/skill-management">
                  <span className="block text-gray-500 py-1">
                    Skill Management
                  </span>
                </Link>
                <Link to="/profile">
                  <p className="block text-gray-500 py-1">
                    Personal Information
                  </p>
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setIsConnectionsOpen(!isConnectionsOpen)}
              className="w-full text-left text-gray-700 py-2"
            >
              Connections
            </button>
            {isConnectionsOpen && (
              <div className="pl-4">
                <a
                  href="#manage-connections"
                  className="block text-gray-500 py-1"
                >
                  Manage Connections
                </a>
                <a href="#messaging" className="block text-gray-500 py-1">
                  Messaging
                </a>
                <a
                  href="#interaction-history"
                  className="block text-gray-500 py-1"
                >
                  Interaction History
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
              className="w-full text-left text-gray-700 py-2"
            >
              Projects
            </button>
            {isProjectsOpen && (
              <div className="pl-4">
                <a href="#all-projects" className="block text-gray-500 py-1">
                  All Projects
                </a>
                <a href="#start-project" className="block text-gray-500 py-1">
                  Start a New Project
                </a>
                <a href="#join-project" className="block text-gray-500 py-1">
                  Join an Existing Project
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setIsLearningOpen(!isLearningOpen)}
              className="w-full text-left text-gray-700 py-2"
            >
              Learning Resources
            </button>
            {isLearningOpen && (
              <div className="pl-4">
                <a
                  href="#recommended-resources"
                  className="block text-gray-500 py-1"
                >
                  Recommended Resources
                </a>
                <a href="#tutorials" className="block text-gray-500 py-1">
                  Tutorials
                </a>
                <a href="#courses" className="block text-gray-500 py-1">
                  Courses
                </a>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setIsCommunityOpen(!isCommunityOpen)}
              className="w-full text-left text-gray-700 py-2"
            >
              Community & Events
            </button>
            {isCommunityOpen && (
              <div className="pl-4">
                <a href="#forum" className="block text-gray-500 py-1">
                  Forum
                </a>
                <a href="#upcoming-events" className="block text-gray-500 py-1">
                  Upcoming Events
                </a>
                <a href="#community-news" className="block text-gray-500 py-1">
                  Community News
                </a>
              </div>
            )}
          </div>

          <a href="#support-feedback" className="block text-gray-700 py-2">
            Support & Feedback
          </a>
        </nav>
      </aside>
    </div>
  );
}
