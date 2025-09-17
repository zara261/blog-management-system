// src/components/Layout/Header.jsx
import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">Blog Management System</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user?.name}</span>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header