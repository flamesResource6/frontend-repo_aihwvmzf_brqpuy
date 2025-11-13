import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabaseClient'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/dashboard')
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome</h1>
        <p className="text-gray-600 mb-6 text-center">Sign up or log in to continue</p>
        <div className="space-y-3">
          <Link to="/signup" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Sign up</Link>
          <Link to="/login" className="block w-full text-center bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">Log in</Link>
          <Link to="/test" className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Backend Test</Link>
        </div>
      </div>
    </div>
  )
}

export default App
