// src/components/Blog/BlogCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      onDelete(blog.id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            blog.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {blog.status}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{blog.content.substring(0, 150)}...</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="mt-6 flex space-x-3">
          <Link
            to={`/edit-blog/${blog.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard