import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return navigate('/login')
      setEmail(session.user.email)
    }
    load()
  }, [navigate])

  const signOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p className="text-gray-700 mb-6">You are logged in as <span className="font-semibold">{email}</span></p>
        <button onClick={signOut} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Sign out</button>
      </div>
    </div>
  )
}
