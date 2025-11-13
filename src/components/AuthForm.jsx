import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthForm({ mode = 'login', onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        onSuccess?.('signup')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        onSuccess?.('login')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded">
        {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
      </button>
    </form>
  )
}
