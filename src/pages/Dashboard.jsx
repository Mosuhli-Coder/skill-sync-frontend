import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchNotifications } from '../redux/actions';

export default function Dashboard() {
    const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const notifications = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchNotifications());
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="mt-6">
          <a href="#skills" className="block text-gray-700 py-2">
            My Skills
          </a>
          <a href="#learning" className="block text-gray-700 py-2">
            Learning
          </a>
          <a href="#teaching" className="block text-gray-700 py-2">
            Teaching
          </a>
          <a href="#schedule" className="block text-gray-700 py-2">
            Schedule
          </a>
          <a href="#settings" className="block text-gray-700 py-2">
            Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center pb-6">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-bold">Skill Matching</h2>
          <p className="mt-2">
            Suggestions for learning and teaching based on your profile
          </p>
          {/* Skill matching logic here */}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold">Upcoming Sessions</h2>
          <p className="mt-2">Calendar view of scheduled learning sessions</p>
          {/* Calendar integration here */}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <ul className="mt-2">
            {/* {notifications.map((notification, index) => (
              <li key={index} className="border-b py-2">
                {notification.message}
              </li>
            ))} */}
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold">Real-time Chat</h2>
          {/* Socket.IO chat integration here */}
        </section>
      </main>
    </div>
  );
}
