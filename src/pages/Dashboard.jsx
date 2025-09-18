import React from 'react'
import { Link } from 'react-router-dom' // Add this import
import { useBlogs } from '../context/BlogContext'

const Dashboard = () => {
  const { blogs } = useBlogs()
  
  const publishedBlogs = blogs.filter(blog => blog.status === 'published')
  const draftBlogs = blogs.filter(blog => blog.status === 'draft')

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      {/* Quick Actions Section - Add this */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <Link
            to="/create-blog"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create New Blog
          </Link>
          <a href="../" target="_blank"
             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            View Public Site</a
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600">Total Blogs</h2>
              <p className="text-2xl font-semibold">{blogs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600">Published</h2>
              <p className="text-2xl font-semibold">{publishedBlogs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-600">Drafts</h2>
              <p className="text-2xl font-semibold">{draftBlogs.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Recent Blogs</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {blogs.slice(0, 5).map(blog => (
            <div key={blog.id} className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-800">{blog.title}</h3>
              <p className="text-gray-600 mt-1">{blog.content.substring(0, 100)}...</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span>Status: </span>
                <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                  blog.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {blog.status}
                </span>
                <span className="ml-4">Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
