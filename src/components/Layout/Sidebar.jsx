import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: '📊' },
    { path: '/blogs', name: 'All Blogs', icon: '📝' },
    { path: '/create-blog', name: 'Create Blog', icon: '➕' },
    { 
      path: '/public-blog', 
      name: 'View Public Site', 
      icon: '🌐', 
      external: true 
    },
  ]

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4 text-xl font-semibold border-b border-gray-700">
        Blog Manager
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.path}>
              {item.external ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded-md hover:bg-gray-700"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${
                    location.pathname === item.path ? 'bg-gray-700' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar