// src/components/WelcomeSection.js
import React from 'react';
import { useSelector } from 'react-redux';

const WelcomeSection = () => {
    const { currentUser } = useSelector((state) => state.user); // Assuming user name is stored in Redux state
//   const connections = useSelector((state) => state.user.connections.length); // Assuming connections is an array
//   const ongoingProjects = useSelector((state) => state.projects.ongoing.length); // Assuming ongoing projects is an array
//   const newMessages = useSelector((state) => state.messages.new.length); // Assuming new messages is an array

  return (
    <div className="bg-white shadow rounded-lg p-10">
      <h1 className="text-2xl font-semibold mb-4">Good morning, {currentUser?.firstName}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          {/* <h2 className="text-xl font-bold">{connections}</h2> */}
          <p className="text-sm text-gray-600">Connections</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          {/* <h2 className="text-xl font-bold">{ongoingProjects}</h2> */}
          <p className="text-sm text-gray-600">Ongoing Projects</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          {/* <h2 className="text-xl font-bold">{newMessages}</h2> */}
          <p className="text-sm text-gray-600">New Messages</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
