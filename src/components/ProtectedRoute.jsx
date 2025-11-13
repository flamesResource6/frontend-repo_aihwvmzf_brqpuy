import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        navigate('/login')
      } else if (mounted) {
        setChecking(false)
      }
    }
    check()
  }, [navigate])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading…</div>
      </div>
    )
  }

  return children
}
