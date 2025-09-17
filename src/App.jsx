import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { BlogProvider } from './context/BlogContext'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import PublicBlog from './pages/PublicBlog'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

// Admin layout wrapper - only for authenticated users
function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

// Public layout - for non-authenticated pages
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}

function AppContent() {
  const { user } = useAuth()
  
  return (
    <Routes>
      {/* Public Routes (No authentication required) */}
      <Route path="/public-blog" element={
        <PublicLayout>
          <PublicBlog />
        </PublicLayout>
      } />
      
      {/* Auth Routes (No authentication required) */}
      <Route path="/login" element={
        <PublicLayout>
          <Login />
        </PublicLayout>
      } />
      <Route path="/register" element={
        <PublicLayout>
          <Register />
        </PublicLayout>
      } />
      
      {/* Admin Routes (Authentication required) */}
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/blogs" element={
        <ProtectedRoute>
          <AdminLayout>
            <Blogs />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/create-blog" element={
        <ProtectedRoute>
          <AdminLayout>
            <CreateBlog />
          </AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/edit-blog/:id" element={
        <ProtectedRoute>
          <AdminLayout>
            <EditBlog />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <AppContent />
        </BlogProvider>
      </AuthProvider>
    </Router>
  )
}

export default App