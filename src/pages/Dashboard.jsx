import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import MatchedUserDetailModal from "../components/MatchedUserDetailModal";
import SendRequestModal from "../components/SendRequestModal";
import Sidebar from "../components/Sidebar";
import DashboardWelcomeSection from "../components/DashboardWelcomeSection";

const baseUrl = import.meta.env.VITE_SKILLSYNC_API_URL;

export default function Dashboard() {
  const [matches, setMatches] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestNote, setRequestNote] = useState("");
  const [selectedMatchedSkills, setSelectedMatchedSkills] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openDetailModal = (user, matchedSkills) => {
    setSelectedUser(user);
    setSelectedMatchedSkills(matchedSkills);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedUser(null);
    setSelectedMatchedSkills([]);
  };

  const openRequestModal = (user, matchedSkills) => {
    setSelectedUser(user);
    setSelectedMatchedSkills(matchedSkills);
    setIsRequestModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setSelectedUser(null);
    setSelectedMatchedSkills([]);
    setRequestNote("");
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/api/skills/matches/${currentUser._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.length > 0) {
          setMatches(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching skill matches:", error);
      }
    };

    fetchMatches();
  }, [currentUser._id]);

  const handleUserClick = (user, matchedSkills) => {
    setSelectedUser({ user, matchedSkills });
  };

  const handleSendRequest = async () => {
    try {
      const response = await fetch(`/api/requests/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId: selectedUser._id,
          note: requestNote,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Request sent successfully!");
        closeRequestModal();
      } else {
        alert("Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <DashboardWelcomeSection />

        <section className="mb-6">
          <h2 className="text-2xl font-bold">Skill Matching</h2>
          <p className="mt-2">
            Suggestions for learning and teaching based on your profile
          </p>
          <div className="flex justify-center items-center">
            <form onChange={""} className="max-w-[480px] w-full px-4">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
                  placeholder="search"
                ></input>
                <button type="submit">
                  <FaSearch className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current dark:text-teal-300" />
                </button>
              </div>
            </form>
          </div>
          <div className="mt-4 overflow-x-auto flex space-x-4">
            {matches.map((match) => (
              <div
                key={match.user._id}
                className="flex-shrink-0 w-40 p-4 border rounded-lg cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow"
                onClick={() =>
                  handleUserClick(match.user, [
                    ...match.matchedTeachSkills,
                    ...match.matchedLearnSkills,
                  ])
                }
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mb-2">
                    <img
                      src={
                        match.user.avatar || "/path/to/default/profile-pic.png"
                      }
                      alt={`${match.user.firstName}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openDetailModal(match.user, [
                        ...match.matchedTeachSkills,
                        ...match.matchedLearnSkills,
                      ]);
                    }}
                    className="mt-2 text-blue-500 cursor-pointer"
                  >
                    View Profile
                  </div>
                  <h6 className="text-lg font-semibold">
                    {match.user.lastName}
                  </h6>
                  <h4 className="mt-2 font-medium">Skills:</h4>
                  <ul className="list-disc list-inside text-sm">
                    {[...match.matchedTeachSkills, ...match.matchedLearnSkills]
                      .slice(0, 3)
                      .map((skill) => (
                        <li key={skill._id} className="mt-1">
                          {skill.name}
                        </li>
                      ))}
                  </ul>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      openRequestModal(match.user, [
                        ...match.matchedTeachSkills,
                        ...match.matchedLearnSkills,
                      ]);
                    }}
                    className="mt-2 text-blue-500 cursor-pointer"
                  >
                    Send Request
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show the request modal if it is open */}
          {isRequestModalOpen && (
            <SendRequestModal
              user={selectedUser}
              matchedSkills={selectedMatchedSkills}
              note={requestNote}
              setNote={setRequestNote}
              onSend={handleSendRequest}
              onClose={closeRequestModal}
            />
          )}

          {/* Show the detail modal if it is open */}
          {isDetailModalOpen && (
            <MatchedUserDetailModal
              user={selectedUser}
              matchedSkills={selectedMatchedSkills}
              onClose={closeDetailModal}
            />
          )}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
          <p className="mt-2">Calendar view of scheduled learning sessions</p>
          {/* Calendar integration here */}
        </section>
        {/* 
        <section className="mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <ul className="mt-2">
            {notifications.map((notification, index) => (
              <li key={index} className="border-b py-2">
                {notification.message}
              </li>
            ))}
          </ul>
        </section> */}

        {/* <section className="mb-6">
          <h2 className="text-2xl font-bold">Real-time Chat</h2>
          Socket.IO chat integration here
        </section> */}
      </main>
    </div>
  );
}
