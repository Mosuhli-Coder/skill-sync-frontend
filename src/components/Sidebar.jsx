import React from 'react'

export default function Sidebar() {
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
    </div>
  )
}
